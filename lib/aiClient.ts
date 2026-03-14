export async function generateExplanation(topic: string) { 
  const apiKey = process.env.GEMINI_API_KEY; 

  // 1. Guardrail: Make sure the API key is actually loading
  if (!apiKey) {
    console.error("🚨 Missing API Key: GEMINI_API_KEY is not defined in your .env file.");
    throw new Error("Server configuration error: Missing API Key");
  }

  const prompt = `Explain the topic '${topic}' in simple terms for a student. Keep it short and student-friendly.`; 
 
  // 2. Cleaned up the URL so there are no accidental line breaks
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(apiUrl, { 
    method: "POST", 
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify({ 
      contents: [{ parts: [{ text: prompt }] }], 
    }), 
  }); 
 
  // 3. Detailed error logging if Google rejects the request
  if (!response.ok) { 
    const errorDetails = await response.text();
    console.error(`🚨 Gemini API Error (${response.status}):`, errorDetails);
    throw new Error(`Failed to fetch from Gemini API. Status: ${response.status}`); 
  } 
 
  const data = await response.json(); 

  // 4. Guardrail: Ensure candidates actually exist before trying to read them
  if (!data.candidates || data.candidates.length === 0) {
    console.error("🚨 Gemini API returned no candidates. Full response:", JSON.stringify(data));
    throw new Error("Gemini returned an empty or blocked response.");
  }

  return data.candidates[0].content.parts[0].text; 
}
