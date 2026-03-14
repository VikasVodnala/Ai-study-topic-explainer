export async function generateExplanation(topic: string) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("🚨 Missing API Key: GEMINI_API_KEY is not defined in your .env file.");
    throw new Error("Server configuration error: Missing API Key");
  }

  const prompt = `Explain the topic '${topic}' in simple terms for a student. Keep it short and student-friendly.`;

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error(`🚨 Gemini API Error (${response.status}):`, errorDetails);
    throw new Error(`Gemini API request failed: ${errorDetails}`);
  }

  const data = await response.json();

  if (!data.candidates || data.candidates.length === 0) {
    console.error("🚨 Gemini API returned no candidates. Full response:", JSON.stringify(data));
    throw new Error("Gemini returned an empty or blocked response.");
  }

  const firstCandidate = data.candidates[0];
  const firstPart = firstCandidate.content?.parts?.[0];

  if (!firstPart || !firstPart.text) {
    console.error("🚨 Gemini candidate missing text. Candidate:", JSON.stringify(firstCandidate));
    throw new Error("Gemini response did not contain text output.");
  }

  return firstPart.text;
}
