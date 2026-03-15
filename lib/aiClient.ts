export async function generateExplanation(topic: string) {
  const prompt = `Explain the topic "${topic}" in simple terms for a student. Keep it short and student-friendly.`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b", // Correct Groq model
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
console.log(process.env.GROQ_API_KEY);
