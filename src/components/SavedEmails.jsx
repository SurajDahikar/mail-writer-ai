// src/components/SavedEmails.jsx
import { useState, useEffect } from "react";
import { Trash2, Eye, FileDown, Pencil } from "lucide-react";
import jsPDF from "jspdf";

export default function SavedEmails({ onView }) {
  const [savedEmails, setSavedEmails] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("savedEmails")) || [];
    setSavedEmails(data);
  }, []);

  // Delete email
  const handleDelete = (index) => {
    const updated = [...savedEmails];
    updated.splice(index, 1);
    setSavedEmails(updated);
    localStorage.setItem("savedEmails", JSON.stringify(updated));
  };

  // Export email to PDF
  const handleExport = (content) => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(content, 10, 10);
    doc.save("mail_writer_email.pdf");
  };

  // Start editing
  const handleEdit = (index, content) => {
    setEditingIndex(index);
    setEditedContent(content);
  };

  // Save edited email
  const handleSaveEdit = () => {
    const updated = [...savedEmails];
    updated[editingIndex] = editedContent;
    setSavedEmails(updated);
    localStorage.setItem("savedEmails", JSON.stringify(updated));
    setEditingIndex(null);
    setEditedContent("");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Saved Emails</h2>

      {savedEmails.length === 0 ? (
        <p className="text-gray-500 text-sm">No saved emails yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedEmails.map((email, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg p-4 shadow-md space-y-3"
            >
              {editingIndex === index ? (
                <>
                  <textarea
                    className="w-full h-32 border p-2 rounded text-sm"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="mt-2 text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm whitespace-pre-line">{email}</p>

                  <div className="flex justify-between items-center pt-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onView(email)}
                        className="text-gray-600 hover:text-green-600"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleExport(email)}
                        className="text-gray-600 hover:text-blue-600"
                        title="Export PDF"
                      >
                        <FileDown size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(index, email)}
                        className="text-gray-600 hover:text-yellow-600"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-gray-600 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <span className="text-xs text-gray-400">#{index + 1}</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
