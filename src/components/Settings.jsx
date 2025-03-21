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
    alert("✅ Preferences saved successfully!");
  };

  const toneOptions = [
    "Professional",
    "Friendly",
    "Persuasive",
    "Conversational",
    "Humorous",
    "Apologetic",
    "Appreciative",
    "Informative",
    "Urgent",
    "Concise",
  ];

  const emailStyles = [
    { value: "", label: "Select Style" },
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "creative", label: "Creative" },
  ];

  return (
    <div className="bg-white p-4 rounded-2xl shadow border border-gray-200 mb-6 dark:bg-gray-900 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">⚙️ Email Preferences</h2>

      {/* Tone Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Select Email Tone
        </label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Select Tone</option>
          {toneOptions.map((option) => (
            <option key={option} value={option.toLowerCase()}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Email Style Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Select Writing Style
        </label>
        <select
          value={emailStyle}
          onChange={(e) => setEmailStyle(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white"
        >
          {emailStyles.map((style) => (
            <option key={style.value} value={style.value}>
              {style.label}
            </option>
          ))}
        </select>
      </div>

      {/* Autosave Toggle */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-700 dark:text-gray-300">Enable Autosave</span>
        <input
          type="checkbox"
          checked={autosave}
          onChange={() => setAutosave(!autosave)}
          className="h-5 w-5 text-green-500 accent-green-500"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSavePreferences}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
      >
        💾 Save Preferences
      </button>
    </div>
  );
}
