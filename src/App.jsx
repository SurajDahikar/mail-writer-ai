import { useState } from "react";
import Sidebar from "./components/Sidebar";
import SettingsPanel from "./components/SettingsPanel";
import EmailOutput from "./components/EmailOutput";
import SavedEmails from "./components/SavedEmails";
import EmailModal from "./components/EmailModal";

function App() {
  const [tone, setTone] = useState("Formal");
  const [language, setLanguage] = useState("English");
  const [emailType, setEmailType] = useState("Introduction");
  const [prompt, setPrompt] = useState("");
  const [selectedEmailContent, setSelectedEmailContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("write");

  const handleViewEmail = (content) => {
    setSelectedEmailContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmailContent("");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
      <div className="flex-1 flex flex-col p-6 space-y-6">
        <header className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-gray-700">Mail Writer AI</h1>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-medium rounded">Login</button>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded">Sign Up</button>
          </div>
        </header>

        {activeSection === "write" && (
          <>
            <SettingsPanel
              tone={tone}
              setTone={setTone}
              language={language}
              setLanguage={setLanguage}
              emailType={emailType}
              setEmailType={setEmailType}
            />

            <EmailOutput
              tone={tone}
              language={language}
              emailType={emailType}
              prompt={prompt}
              setPrompt={setPrompt}
            />
          </>
        )}

        {activeSection === "saved" && <SavedEmails onView={handleViewEmail} />}

        {activeSection === "settings" && (
          <SettingsPanel
            tone={tone}
            setTone={setTone}
            language={language}
            setLanguage={setLanguage}
            emailType={emailType}
            setEmailType={setEmailType}
          />
        )}

        <EmailModal
          isOpen={isModalOpen}
          content={selectedEmailContent}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}

export default App;
