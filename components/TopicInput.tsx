import { useState } from "react";

interface TopicInputProps {
  onGenerate: (topic: string) => void;
  isLoading: boolean;
}

export default function TopicInput({ onGenerate, isLoading }: TopicInputProps) {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onGenerate(topic);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full group">
      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
        {/* Subtle Search Icon */}
        <svg className="h-6 w-6 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      <input
      type="text"
      value={topic}
      onChange={(e) => setTopic(e.target.value)}
      disabled={isLoading}
      placeholder="e.g., Photosynthesis, The Cold War, Black Holes..."
      className="w-full pl-14 pr-36 py-5 text-lg bg-gray-900/60 backdrop-blur-sm border border-gray-600 rounded-full shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all duration-300 disabled:bg-gray-800 disabled:cursor-not-allowed"
      />

      <button
        type="submit"
        disabled={isLoading || !topic.trim()}
        className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-full font-semibold tracking-wide hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center"
      >
        {isLoading ? "Thinking..." : "Explain"}
      </button>
    </form>
  );
}