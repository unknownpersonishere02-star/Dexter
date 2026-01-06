const API_KEY = "AIzaSyAa3ClYalKRWCs1DMOIaEOalSKV5ZH5W4c";

function showTab(id) {
  document.querySelectorAll(".box").forEach(div => div.style.display = "none");
  document.getElementById(id).style.display = "block";
}

async function generateAI() {
  const notes = document.getElementById("notes").value.trim();
  if (!notes) {
    alert("Please paste some notes first");
    return;
  }

  document.getElementById("summary").style.display = "block";
  document.getElementById("summary").innerText = "⏳ Generating with AI...";

  const prompt = `
You are an AI learning assistant.
From the following notes, generate:
1. A short summary
2. 5 key points
3. 3 multiple choice questions with answers

Notes:
${notes}
`;

  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await res.json();
    const text = data.candidates[0].content.parts[0].text;

    // Simple parsing
    const sections = text.split("\n\n");

    document.getElementById("summary").innerText = sections[0] || "No summary";
    document.getElementById("keypoints").innerText = sections[1] || "No key points";
    document.getElementById("quiz").innerText = sections[2] || "No quiz";

  } catch (err) {
    document.getElementById("summary").innerText = "❌ Error: " + err.message;
  }
}
