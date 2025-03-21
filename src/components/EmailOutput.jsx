import { useState, useEffect } from "react";
import jsPDF from "jspdf";

export default function EmailOutput({ tone, language, emailType, prompt, setPrompt }) {
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [savedEmails, setSavedEmails] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("savedEmails");
    if (stored) setSavedEmails(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("savedEmails", JSON.stringify(savedEmails));
  }, [savedEmails]);

  const handleGenerate = () => {
    const mockEmail = `📝 Generated Email:
Tone: ${tone}
Language: ${language}
Type: ${emailType}
Prompt: ${prompt}

----------------------------------------
Hello! This is your AI-generated email based on your preferences.
Thank you for using Mail Writer AI!`;

    setGeneratedEmail(mockEmail);
  };

  const handleSave = () => {
    if (generatedEmail.trim()) {
      setSavedEmails((prev) => [...prev, generatedEmail]);
    }
  };

  const handleClear = () => {
    setPrompt("");
    setGeneratedEmail("");
  };

  const handleExportPDF = (email, filename = "generated_email.pdf") => {
    if (!email.trim()) return;
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(email, 180);
    doc.text(lines, 10, 20);
    doc.save(filename);
  };

  const handleDelete = (index) => {
    const updated = savedEmails.filter((_, i) => i !== index);
    setSavedEmails(updated);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedContent(savedEmails[index]);
  };

  const handleSaveEdit = () => {
    if (editedContent.trim()) {
      const updated = [...savedEmails];
      updated[editingIndex] = editedContent;
      setSavedEmails(updated);
      setEditingIndex(null);
      setEditedContent("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-2xl space-y-6 transition-all duration-300">
      <div>
        <label className="text-sm font-semibold mb-2 block">✍️ Prompt</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full h-32 border border-gray-300 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Type your email prompt here..."
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <button onClick={handleGenerate} className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg">
          Generate
        </button>
        <button onClick={handleSave} className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg">
          Save
        </button>
        <button onClick={() => handleExportPDF(generatedEmail)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded-lg">
          Export to PDF
        </button>
        <button onClick={handleClear} className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg">
          Clear
        </button>
      </div>

      <div>
        <label className="text-sm font-semibold mb-2 block">📨 Generated Email</label>
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 min-h-[150px] whitespace-pre-wrap">
          {generatedEmail || "No email generated yet."}
        </div>
      </div>
    </div>
  );
}
