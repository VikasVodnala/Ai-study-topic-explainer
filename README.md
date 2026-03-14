# AI Study Topic Explainer 
## Project Description 
The AI Study Topic Explainer is an educational web application built with Next.js. It a lows 
students to enter complex study topics (like "Photosynthesis" or "Newton's Laws") and uses 
Artificial Inte ligence to instantly generate simple, student-friendly explanations. This tool 
bridges the gap between complicated academic material and student comprehension. 
## How AI API was used 
This project integrates the **Groq API** (Free Tier).  - When a student inputs a topic, the frontend sends a request to the Next.js API route 
(`/api/explain`). - The backend securely communicates with the GROQ API, using a specific system prompt to 
ensure the output is tailored for a student's reading level. - The AI's simplified explanation is then returned and displayed on the clean, responsive user 
interface. 
## Setup Instructions 
1. **Clone the repository** (or create a new Next.js project and copy the files). 
2. **Install dependencies:** Run `npm install` to ensure Next.js, React, and Tailwind CSS are 
ready. 
3. **Environment Variables:** Create a `.env.local` file in the root directory of your project and 
add your GROQ API Key: 
'GROQ_API_KEY=your_actual_api_key_here` 
4. **Run the development server:** Start the application by running `npm run dev`. 
5. **View the app:** Open `http://localhost:3000` in your browser.
