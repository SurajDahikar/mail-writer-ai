// src/components/EmailModal.jsx
export default function EmailModal({ isOpen, content, onClose }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full relative">
          <h2 className="text-xl font-semibold mb-4">Saved Email Content</h2>
          <pre className="whitespace-pre-wrap text-gray-700 mb-4">{content}</pre>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg font-bold"
          >
            ×
          </button>
        </div>
      </div>
    );
  }
  