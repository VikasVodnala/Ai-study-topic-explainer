interface ExplanationCardProps {
  topic: string;
  explanation: string;
}

export default function ExplanationCard({ topic, explanation }: ExplanationCardProps) {
  return (
    <div className="w-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl shadow-indigo-100/50 rounded-3xl overflow-hidden transition-all duration-500">
      
      {/* Card Header */}
      <div className="bg-gradient-to-r from-indigo-50/50 to-blue-50/50 border-b border-indigo-100/50 px-8 py-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold tracking-wider text-indigo-400 uppercase mb-1">Topic</p>
          <h2 className="text-2xl font-extrabold text-gray-900 capitalize drop-shadow-sm">
            {topic}
          </h2>
        </div>
        
        {/* Decorative Sparkle Icon */}
        <div className="hidden sm:flex h-12 w-12 bg-white rounded-full items-center justify-center shadow-sm text-indigo-500">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      </div>

      {/* Card Body for the Explanation */}
      <div className="p-8 md:p-10 text-left">
        <div className="prose prose-indigo prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
          {explanation}
        </div>
      </div>
      
    </div>
  );
}