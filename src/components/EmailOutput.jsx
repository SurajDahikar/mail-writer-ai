import React, { useState, useEffect } from 'react';

const EmailOutput = () => {
  const [tone, setTone] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [savedEmails, setSavedEmails] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedEmails = JSON.parse(localStorage.getItem('savedEmails')) || [];
    setSavedEmails(storedEmails);
  }, []);

  const handleGenerate = () => {
    const email = `Tone: ${tone}\nPrompt: ${prompt}\n\nDear User,\n\nThis is an AI-generated email based on the provided prompt.`;
    setGeneratedEmail(email);
  };

  const handleSave = () => {
    if (!generatedEmail.trim()) return;
    const updatedEmails = [...savedEmails, generatedEmail];
    setSavedEmails(updatedEmails);
    localStorage.setItem('savedEmails', JSON.stringify(updatedEmails));
    setGeneratedEmail('');
  };

  const handleDelete = (index) => {
    const updatedEmails = [...savedEmails];
    updatedEmails.splice(index, 1);
    setSavedEmails(updatedEmails);
    localStorage.setItem('savedEmails', JSON.stringify(updatedEmails));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditContent(savedEmails[index]);
  };

  const handleSaveEdit = (index) => {
    const updatedEmails = [...savedEmails];
    updatedEmails[index] = editContent;
    setSavedEmails(updatedEmails);
    localStorage.setItem('savedEmails', JSON.stringify(updatedEmails));
    setEditIndex(null);
    setEditContent('');
  };

  const handleExportPDF = (emailContent) => {
    const element = document.createElement('a');
    const file = new Blob([emailContent], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = 'email.pdf';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleClear = () => {
    setTone('');
    setPrompt('');
    setGeneratedEmail('');
  };

  const filteredEmails = savedEmails.filter((email) =>
    email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Enter tone (e.g., Formal)"
          className="p-3 border border-gray-300 rounded-xl w-full"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter prompt"
          className="p-3 border border-gray-300 rounded-xl w-full"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button onClick={handleGenerate} className="px-4 py-2 bg-green-600 text-white rounded-xl">Generate</button>
        <button onClick={handleSave} className="px-4 py-2 bg-gray-700 text-white rounded-xl">Save</button>
        <button onClick={handleClear} className="px-4 py-2 bg-red-500 text-white rounded-xl">Clear</button>
      </div>

      {/* Output Email */}
      {generatedEmail && (
        <div className="bg-white border border-gray-300 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Generated Email:</h2>
          <pre className="whitespace-pre-wrap text-sm text-gray-800">{generatedEmail}</pre>
        </div>
      )}

      {/* Search Box */}
      <div className="mt-8">
        <input
          type="text"
          placeholder="🔍 Search saved emails..."
          className="w-full p-3 border border-gray-300 rounded-xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Saved Emails Section */}
      <div>
        <h2 className="text-xl font-bold mb-3 mt-6">Saved Emails</h2>
        {filteredEmails.length === 0 ? (
          <p className="text-gray-500 text-sm">No matching emails found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEmails.map((email, index) => (
              <div key={index} className="border p-4 rounded-xl shadow-sm bg-gray-100 relative">
                {editIndex === index ? (
                  <>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows={6}
                    />
                    <button
                      onClick={() => handleSaveEdit(index)}
                      className="mt-2 px-3 py-1 bg-green-600 text-white rounded-xl"
                    >
                      Save Update
                    </button>
                  </>
                ) : (
                  <>
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 mb-2">{email}</pre>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded-md"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleExportPDF(email)}
                        className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md"
                      >
                        Export to PDF
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailOutput;
