export default function Modal({ isOpen, onClose, content }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-700">Saved Email</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 text-lg font-semibold"
            >
              ×
            </button>
          </div>
          <div className="text-gray-700 whitespace-pre-line">{content}</div>
        </div>
      </div>
    );
  }
  