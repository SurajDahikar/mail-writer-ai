// src/components/SaveButton.jsx
export default function SaveButton({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition duration-200"
      >
        Save Email
      </button>
    );
  }
  