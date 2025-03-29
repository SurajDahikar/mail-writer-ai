import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    addDoc,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import axios from "axios";

let analytics;

// ✅ Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// ✅ Initialize Firebase app, auth, and Firestore
const app = initializeApp(firebaseConfig);
console.log("🔥 Firebase App Initialized:", app.name);

const auth = getAuth(app);
console.log("🔑 Firebase Auth Initialized");

const db = getFirestore(app);
console.log("🗃️ Firestore Initialized");

// ✅ Initialize Analytics only on the client side
if (typeof window !== "undefined") {
    import("firebase/analytics")
        .then(({ getAnalytics }) => {
            analytics = getAnalytics(app);
            console.log("📊 Firebase Analytics initialized");
        })
        .catch((error) => {
            console.error("❌ Failed to initialize Firebase Analytics:", error);
        });
}

// ✅ Generate a unique referral code based on user UID
const generateReferralCode = (uid) => {
    return `MWAI-${uid.substring(0, 6)}`.toUpperCase();
};

// ✅ Handle Daily Credit Refill
const handleDailyCredits = async (userDocRef) => {
    try {
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            const lastLogin = userData.lastLogin || 0;
            const currentDay = new Date().toDateString();

            if (new Date(lastLogin).toDateString() !== currentDay) {
                await updateDoc(userDocRef, {
                    credits: 10,
                    lastLogin: Date.now(),
                });
                console.log("🔁 Daily credits refilled!");
            } else {
                console.log("✅ Daily credits already refilled today.");
            }
        }
    } catch (error) {
        console.error("❌ Error handling daily credits:", error);
    }
};

// ✅ Handle Google Sign-In and User Creation
const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("✅ User logged in:", user.displayName);

        const userDocRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (!userSnapshot.exists()) {
            await setDoc(userDocRef, {
                email: user.email,
                credits: 10,
                referralCode: generateReferralCode(user.uid),
                referrals: 0,
                role: "free",
                isPremium: false,
                lastLogin: Date.now(),
            });
            console.log("📝 New user created with initial credits and referral code");
        } else {
            await handleDailyCredits(userDocRef);
            console.log("🔁 Existing user data updated");
        }

        return user;
    } catch (error) {
        console.error("❌ Login failed:", error);
        throw error; // Re-throw the error to be caught in the component
    }
};

// ✅ Save Generated Email
const saveGeneratedEmail = async (uid, subject, content) => {
    try {
        const emailData = {
            subject,
            content,
            timestamp: Date.now(),
        };
        await addDoc(collection(db, "users", uid, "emails"), emailData);
        console.log("✉️ Email saved successfully!");
    } catch (error) {
        console.error("❌ Failed to save email:", error);
        throw error; // Re-throw the error
    }
};

// ✅ Fetch Saved Emails
const fetchSavedEmails = async (uid) => {
    try {
        const emailsRef = collection(db, "users", uid, "emails");
        const emailQuery = query(emailsRef);
        const querySnapshot = await getDocs(emailQuery);
        const emails = [];
        querySnapshot.forEach((doc) => {
            emails.push({ id: doc.id, ...doc.data() });
        });
        console.log("📧 Fetched saved emails:", emails.length);
        return emails;
    } catch (error) {
        console.error("❌ Failed to fetch emails:", error);
        throw error; // Re-throw the error
    }
};

// ✅ Check Premium Status
const checkPremiumStatus = async (uid) => {
    try {
        const userDocRef = doc(db, "users", uid);
        const userSnapshot = await getDoc(userDocRef);
        return userSnapshot.exists() && userSnapshot.data().isPremium;
    } catch (error) {
        console.error("❌ Error checking premium status:", error);
        throw error; // Re-throw the error
    }
};

// ✅ Upgrade User Role to Premium
const upgradeToPremium = async (uid, amount, paymentMethod) => {
    try {
        const response = await axios.post("/api/upgrade", {
            userId: uid,
            amount,
            paymentMethod,
        });

        if (response.data.orderId) {
            await updateDoc(doc(db, "users", uid), {
                role: "premium",
                isPremium: true,
            });
            console.log("🚀 User upgraded to premium!");
            return true;
        } else {
            console.error("❌ Payment failed. No order ID returned.");
            throw new Error("Payment failed. No order ID returned."); // Throw error
        }
    } catch (error) {
        console.error("❌ Upgrade failed:", error);
        throw error; // Re-throw the error
    }
};

// ✅ Apply Referral Code
const applyReferralCode = async (referralCode) => {
    try {
        const referralQuery = query(collection(db, "users"), where("referralCode", "==", referralCode));
        const querySnapshot = await getDocs(referralQuery);

        if (!querySnapshot.empty) {
            const referrerDoc = querySnapshot.docs[0];
            await updateDoc(referrerDoc.ref, {
                credits: (referrerDoc.data().credits || 0) + 5,
                referrals: (referrerDoc.data().referrals || 0) + 1,
            });
            console.log("✅ Referral applied successfully!");
            return true;
        } else {
            console.warn("⚠️ Referral code not found.");
            return false;
        }
    } catch (error) {
        console.error("❌ Failed to apply referral code:", error);
        throw error; // Re-throw error
    }
};

// ✅ Logout Function
const logout = async () => {
    try {
        await signOut(auth);
        console.log("🚪 User logged out successfully");
    } catch (error) {
        console.error("❌ Logout failed:", error);
        throw error; // Re-throw error
    }
};

// ✅ Exporting functions and variables
export {
    auth,
    db,
    analytics,
    login,
    logout,
    saveGeneratedEmail,
    fetchSavedEmails,
    upgradeToPremium,
    applyReferralCode,
    checkPremiumStatus,
};