import { Mail, Settings, Save } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-white border-r shadow-md min-h-screen flex flex-col justify-between">
      {/* Top Navigation Area */}
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6 text-green-600">Mail Writer AI</h2>
        <nav className="space-y-4">
          <button className="flex items-center gap-2 w-full text-left hover:bg-gray-100 p-2 rounded">
            <Mail className="w-5 h-5 text-gray-600" />
            <span>Write Email</span>
          </button>
          <button className="flex items-center gap-2 w-full text-left hover:bg-gray-100 p-2 rounded">
            <Save className="w-5 h-5 text-gray-600" />
            <span>Saved Emails</span>
          </button>
          <button className="flex items-center gap-2 w-full text-left hover:bg-gray-100 p-2 rounded">
            <Settings className="w-5 h-5 text-gray-600" />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Bottom Login / Signup Buttons */}
      <div className="p-4 border-t">
        <button className="w-full mb-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded">
          Login
        </button>
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded">
          Sign Up
        </button>
      </div>
    </aside>
  );
}
