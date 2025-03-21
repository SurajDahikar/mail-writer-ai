// src/components/Settings.jsx
import React, { useEffect, useState } from "react";

export default function Settings({ tone, setTone }) {
  const [emailStyle, setEmailStyle] = useState("");
  const [autosave, setAutosave] = useState(false);

  // Load saved preferences from localStorage
  useEffect(() => {
    const preferences = JSON.parse(localStorage.getItem("mailWriterSettings"));
    if (preferences) {
      if (preferences.tone) setTone(preferences.tone);
      if (preferences.emailStyle) setEmailStyle(preferences.emailStyle);
      if (preferences.autosave !== undefined) setAutosave(preferences.autosave);
    }
  }, [setTone]);

  const handleSavePreferences = () => {
    const preferences = {
      tone,
      emailStyle,
      autosave,
    };
    localStorage.setItem("mailWriterSettings", JSON.stringify(preferences));
    alert("Preferences saved successfully ✅");
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow border border-gray-200 mb-6 dark:bg-gray-900">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Select Tone / Style
      </label>
      <select
        value={tone}
        onChange={(e) => setTone(e.target.value)}
        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white"
      >
        <option value="formal">Formal</option>
        <option value="informal">Informal</option>
        <option value="friendly">Friendly</option>
        <option value="persuasive">Persuasive</option>
      </select>

      {/* New Email Style Dropdown */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4 mb-2">
        Select Email Writing Style
      </label>
      <select
        value={emailStyle}
        onChange={(e) => setEmailStyle(e.target.value)}
        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white"
      >
        <option value="">Select Style</option>
        <option value="professional">Professional</option>
        <option value="casual">Casual</option>
        <option value="creative">Creative</option>
      </select>

      {/* Autosave Toggle */}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-700 dark:text-gray-300">Enable Autosave</span>
        <input
          type="checkbox"
          checked={autosave}
          onChange={() => setAutosave(!autosave)}
          className="h-5 w-5 text-green-500"
        />
      </div>

      {/* Save Preferences Button */}
      <button
        onClick={handleSavePreferences}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
      >
        Save Preferences
      </button>
    </div>
  );
}
