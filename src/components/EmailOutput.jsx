import React, { useState } from "react";

const EmailOutput = ({ emailText, onClear, onSave }) => {
  const [savedEmails, setSavedEmails] = useState(
    JSON.parse(localStorage.getItem("savedEmails")) || []
  );

  const handleSave = () => {
    if (!emailText.trim()) return;
    const updatedEmails = [...savedEmails, emailText];
    setSavedEmails(updatedEmails);
    localStorage.setItem("savedEmails", JSON.stringify(updatedEmails));
    if (onSave) onSave(emailText);
  };

  const handleDelete = (index) => {
    const updatedEmails = savedEmails.filter((_, i) => i !== index);
    setSavedEmails(updatedEmails);
    localStorage.setItem("savedEmails", JSON.stringify(updatedEmails));
  };

  const handleExportPDF = (email, index) => {
    const element = document.createElement("a");
    const file = new Blob([email], { type: "application/pdf" });
    element.href = URL.createObjectURL(file);
    element.download = `email_${index + 1}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full p-4">
      {/* Generated Email Output Section */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Generated Email</h2>
        <div className="min-h-[150px] whitespace-pre-wrap text-gray-700 bg-gray-100 rounded-xl p-4 border border-gray-300">
          {emailText || "Your generated email will appear here..."}
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            Save
          </button>
          <button
            onClick={onClear}
            className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Saved Emails Section */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Saved Emails</h2>

        {savedEmails.length === 0 ? (
          <p className="text-gray-500">No saved emails yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedEmails.map((email, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-300 rounded-xl p-4 relative"
              >
                <div className="whitespace-pre-wrap text-sm text-gray-700 mb-3">{email}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-sm px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleExportPDF(email, index)}
                    className="text-sm px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
                  >
                    Export PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailOutput;
