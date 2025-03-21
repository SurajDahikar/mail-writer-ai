// src/components/Sidebar.jsx
import { Mail, Save, Settings } from "lucide-react";

export default function Sidebar({ currentSection, setCurrentSection }) {
  const navItems = [
    { icon: <Mail className="w-5 h-5" />, label: "Write Email", key: "write" },
    { icon: <Save className="w-5 h-5" />, label: "Saved Emails", key: "saved" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", key: "settings" },
  ];

  return (
    <aside className="w-60 bg-white border-r shadow-md min-h-screen flex flex-col justify-between dark:bg-gray-900 dark:border-gray-800">
      {/* Brand */}
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6 text-green-600">Mail Writer AI</h2>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setCurrentSection(item.key)}
              className={`flex items-center gap-2 w-full text-left p-2 rounded-md ${
                currentSection === item.key
                  ? "bg-green-100 text-green-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              } dark:hover:bg-gray-800 dark:text-white`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Auth Buttons */}
      <div className="p-4 border-t dark:border-gray-700">
        <button className="w-full mb-2 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 font-medium py-2 rounded">
          Login
        </button>
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded">
          Sign Up
        </button>
      </div>
    </aside>
  );
}
