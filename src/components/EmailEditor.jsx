import { useState } from "react";

const EmailEditor = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  return (
    <section className="p-8 max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">✍️ Compose Email</h3>

      <div className="space-y-5">
        <input
          type="text"
          placeholder="Enter email subject..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />

        <textarea
          rows="10"
          placeholder="Type your email content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
        />

        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition">
          ✨ Generate with AI
        </button>
      </div>
    </section>
  );
};

export default EmailEditor;
