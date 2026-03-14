"use client";
import { useState } from "react";
import TopicInput from "@/components/TopicInput";
import ExplanationCard from "@/components/ExplanationCard";

export default function Home() {
  const [currentTopic, setCurrentTopic] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateExplanation = async (topic: string) => {
    setIsLoading(true);
    setError("");
    setExplanation("");
    setCurrentTopic(topic);

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const contentType = response.headers.get("content-type");
      let data = null;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        throw new Error(
          `Server error: Expected JSON but received HTML. (Status: ${response.status}). Check your API route.`
        );
      }

      if (!response.ok) {
        throw new Error(data?.error || `Failed to fetch explanation. Status: ${response.status}`);
      }

      if (!data?.explanation) {
        throw new Error("No explanation was returned from the server.");
      }

      setExplanation(data.explanation);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-cyan-50 flex flex-col items-center py-20 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-3xl mx-auto w-full flex flex-col items-center">
        
        {/* Enhanced Heading with Gradient Text */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 drop-shadow-sm text-center">
          AI Study Topic Explainer
        </h1>
        
        {/* Polished Subtitle */}
        <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl text-center leading-relaxed">
          Enter a study topic you're struggling with and get a simple, easy-to-understand
          explanation instantly.
        </p>

        {/* Input Component Wrapper */}
        <div className="w-full max-w-2xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-100/50 rounded-2xl">
          <TopicInput onGenerate={handleGenerateExplanation} isLoading={isLoading} />
        </div>

        {/* Modern Loading Indicator with Spinner */}
        {isLoading && (
          <div className="mt-12 flex items-center justify-center space-x-3 text-indigo-600 animate-in fade-in duration-300">
            <svg className="animate-spin h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="font-medium text-lg tracking-wide">Synthesizing explanation...</span>
          </div>
        )}

        {/* Soft Glassmorphism Error Message */}
        {error && (
          <div className="mt-8 text-red-600 bg-red-50/80 backdrop-blur-md py-4 px-6 rounded-xl font-medium border border-red-200 shadow-sm flex items-center animate-in slide-in-from-bottom-2 duration-300">
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {/* Output Section Wrapper */}
        <div className="w-full mt-10 w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          {explanation && (
             <ExplanationCard topic={currentTopic} explanation={explanation} />
          )}
        </div>
        
      </div>
    </main>
  );
}