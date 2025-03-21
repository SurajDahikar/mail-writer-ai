import { Eye, Pencil, Trash2, FileText } from "lucide-react";
import { useState } from "react";
import jsPDF from "jspdf";

export default function SavedEmails({ emails = [], onView, onEdit, onDelete }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const handleEdit = (index, content) => {
    setEditingIndex(index);
    setEditedContent(content);
  };

  const handleSaveEdit = () => {
    onEdit(editingIndex, editedContent);
    setEditingIndex(null);
    setEditedContent("");
  };

  const handleExportPDF = (email) => {
    const doc = new jsPDF();
    doc.text(email.subject || "Generated Email", 10, 10);
    doc.text(email.content, 10, 20);
    doc.save(`${email.subject || "email"}.pdf`);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-2xl mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📂 Saved Emails</h2>

      {emails.length === 0 ? (
        <p className="text-gray-500 text-sm">No saved emails yet.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {emails.map((email, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-4 shadow-sm bg-gray-50 hover:bg-gray-100 transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-gray-700 text-sm">
                  📅 {email.date || "No Date"}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onView(email.content)}
                    className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" /> View
                  </button>
                  <button
                    onClick={() => handleEdit(index, email.content)}
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                  >
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleExportPDF(email)}
                    className="text-purple-600 hover:text-purple-800 text-sm flex items-center gap-1"
                  >
                    <FileText className="w-4 h-4" /> PDF
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>

              {editingIndex === index ? (
                <div>
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm mb-2 focus:ring-2 focus:ring-green-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="bg-gray-400 text-white px-4 py-1 rounded-lg text-sm hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap text-sm text-gray-700">
                  {email.content}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
