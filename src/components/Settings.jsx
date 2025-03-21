// src/components/Settings.jsx
export default function Settings({ tone, setTone }) {
    return (
      <div className="bg-white p-4 rounded-2xl shadow border border-gray-200 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Tone / Style
        </label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="formal">Formal</option>
          <option value="informal">Informal</option>
          <option value="friendly">Friendly</option>
          <option value="persuasive">Persuasive</option>
        </select>
      </div>
    );
  }
  