// src/components/EmailOutput.jsx
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

const EmailOutput = () => {
  const [tone, setTone] = useState("formal");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [savedEmails, setSavedEmails] = useState([]);
  const [editingEmailId, setEditingEmailId] = useState(null);
  const [editedPrompt, setEditedPrompt] = useState("");
  const [editedOutput, setEditedOutput] = useState("");

  // ✅ Preload tone from localStorage when component mounts
  useEffect(() => {
    const settings = localStorage.getItem("mailWriterSettings");
    if (settings) {
      const parsedSettings = JSON.parse(settings);
      if (parsedSettings.tone) setTone(parsedSettings.tone);
    }

    const saved = localStorage.getItem("savedEmails");
    if (saved) {
      setSavedEmails(JSON.parse(saved));
    }
  }, []);

  const handleGenerate = () => {
    const generatedText = `Here’s a ${tone} email for the prompt: "${prompt}"\n\nLorem ipsum dolor sit amet...`;
    setOutput(generatedText);
  };

  const handleClear = () => {
    setPrompt("");
    setOutput("");
  };

  const handleSave = () => {
    const newEmail = {
      id: Date.now(),
      tone,
      prompt,
      content: output,
    };
    const updatedEmails = [newEmail, ...savedEmails];
    setSavedEmails(updatedEmails);
    localStorage.setItem("savedEmails", JSON.stringify(updatedEmails));
  };

  const handleExport = () => {
    const doc = new jsPDF();
    doc.text(output || "No content to export", 10, 10);
    doc.save("email_output.pdf");
  };

  const handleDelete = (id) => {
    const updated = savedEmails.filter((email) => email.id !== id);
    setSavedEmails(updated);
    localStorage.setItem("savedEmails", JSON.stringify(updated));
  };

  const handleEdit = (email) => {
    setEditingEmailId(email.id);
    setEditedPrompt(email.prompt);
    setEditedOutput(email.content);
  };

  const handleSaveEdit = () => {
    const updated = savedEmails.map((email) =>
      email.id === editingEmailId
        ? { ...email, prompt: editedPrompt, content: editedOutput }
        : email
    );
    setSavedEmails(updated);
    localStorage.setItem("savedEmails", JSON.stringify(updated));
    setEditingEmailId(null);
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-lg border border-gray-200 dark:bg-gray-900">
      {/* Prompt Input */}
      <div className="mb-4">
        <label className="block text-sm text-gray-700 dark:text-gray-200 mb-1">
          Enter your prompt / email subject
        </label>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
          placeholder="Type your prompt here..."
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <button
          onClick={handleGenerate}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Generate
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Clear
        </button>
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Save
        </button>
        <button
          onClick={handleExport}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Export to PDF
        </button>
      </div>

      {/* Generated Output */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2 text-gray-800 dark:text-white">
          Generated Email
        </h3>
        <textarea
          value={output}
          readOnly
          rows={8}
          className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Saved Emails Section */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
          Saved Emails
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedEmails.map((email) => (
            <div
              key={email.id}
              className="border border-gray-300 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            >
              {editingEmailId === email.id ? (
                <>
                  <input
                    value={editedPrompt}
                    onChange={(e) => setEditedPrompt(e.target.value)}
                    className="w-full mb-2 p-2 border rounded dark:bg-gray-700 dark:text-white"
                  />
                  <textarea
                    value={editedOutput}
                    onChange={(e) => setEditedOutput(e.target.value)}
                    className="w-full mb-2 p-2 border rounded dark:bg-gray-700 dark:text-white"
                    rows={4}
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingEmailId(null)}
                    className="bg-gray-600 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <strong>Tone:</strong> {email.tone}
                  </p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    {email.prompt}
                  </p>
                  <p className="text-sm mt-2 text-gray-700 dark:text-gray-200">
                    {email.content}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(email)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(email.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailOutput;
