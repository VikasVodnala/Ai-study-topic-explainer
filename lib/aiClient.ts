export async function generateExplanation(topic: string) {
  const apiKey = process.env.GROQ_API_KEY;
  const prompt = `Explain the topic "${topic}" in simple terms for a student. Keep it short and student-friendly.`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-70b-preview", // Example Groq model
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch from Groq API");
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
