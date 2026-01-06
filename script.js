// 🔐 AIzaSyAa3ClYalKRWCs1DMOIaEOalSKV5ZH5W4c
const API_KEY = "AIzaSyAa3ClYalKRWCs1DMOIaEOalSKV5ZH5W4c";

let aiData = {
  summary: "",
  keyPoints: "",
  quiz: ""
};

async function generateAI() {
  const notes = document.getElementById("notes").value.trim();
  const output = document.getElementById("output");

  if (!notes) {
    output.innerHTML = "<span class='error'>Please paste some notes first.</span>";
    return;
  }

  output.innerText = "⏳ Generating with AI...";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
From the following notes, generate:
1. A short summary
2. 5 key points
3. 3 MCQ questions with options and correct answer

Notes:
${notes}
                  `
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const text = data.candidates[0].content.parts[0].text;

    // Simple parsing
    aiData.summary = text;
    aiData.keyPoints = text;
    aiData.quiz = text;

    output.innerText = "✅ AI content generated. Choose an option above.";

  } catch (error) {
    output.innerHTML =
      "<span class='error'>❌ Error generating AI content. Check API key.</span>";
    console.error(error);
  }
}

function showSummary() {
  document.getElementById("output").innerText =
    aiData.summary || "Generate AI content first.";
}

function showKeyPoints() {
  document.getElementById("output").innerText =
    aiData.keyPoints || "Generate AI content first.";
}

function showQuiz() {
  document.getElementById("output").innerText =
    aiData.quiz || "Generate AI content first.";
}
