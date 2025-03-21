export default function SettingsPanel({ tone, setTone, language, setLanguage, emailType, setEmailType }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2">🎯 Email Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option>Formal</option>
            <option>Informal</option>
            <option>Friendly</option>
            <option>Persuasive</option>
            <option>Professional</option>
          </select>
        </div>
  
        <div>
          <label className="block text-sm font-semibold mb-2">🌐 Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
  
        <div>
          <label className="block text-sm font-semibold mb-2">📧 Email Type</label>
          <select
            value={emailType}
            onChange={(e) => setEmailType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option>Introduction</option>
            <option>Follow-up</option>
            <option>Thank You</option>
            <option>Apology</option>
            <option>Newsletter</option>
          </select>
        </div>
      </div>
    );
  }
  