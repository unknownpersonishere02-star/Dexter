const API_KEY = "AIzaSyAa3ClYalKRWCs1DMOIaEOalSKV5ZH5W4c";

let aiData = null;

async function generateAI() {
  const notes = document.getElementById("notes").value.trim();
  if (!notes) {
    showError("Please paste some notes first.");
    return;
  }

  showError("Generating with AI...");

  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
        API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
From the following notes:
1. Give a short summary
2. Give 5 key points
3. Create 3 MCQ questions with options and correct answer

Notes:
${notes}

Respond ONLY in JSON like this:
{
 "summary": "",
 "keyPoints": [],
 "quiz": [
   {
     "question": "",
     "options": ["", "", "", ""],
     "answer": ""
   }
 ]
}
`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    // SAFETY CHECK
    if (
      !data.candidates ||
      !data.candidates[0] ||
      !data.candidates[0].content ||
      !data.candidates[0].content.parts ||
      !data.candidates[0].content.parts[0]
    ) {
      throw new Error("Invalid AI response");
    }

    const text = data.candidates[0].content.parts[0].text;
    aiData = JSON.parse(text);

    showError("AI generated successfully ✅");
  } catch (err) {
    console.error(err);
    showError("AI Error: Check API key or response format");
  }
}

function showSummary() {
  if (!aiData) return showError("Generate AI first");
  document.getElementById("output").innerHTML =
    "<h3>📄 Summary</h3><p>" + aiData.summary + "</p>";
}

function showKeyPoints() {
  if (!aiData) return showError("Generate AI first");
  document.getElementById("output").innerHTML =
    "<h3>🔑 Key Points</h3><ul>" +
    aiData.keyPoints.map((p) => "<li>" + p + "</li>").join("") +
    "</ul>";
}

function showQuiz() {
  if (!aiData) return showError("Generate AI first");

  let html = "<h3>❓ Quiz</h3>";
  aiData.quiz.forEach((q, i) => {
    html += `<p><b>${i + 1}. ${q.question}</b></p>`;
    q.options.forEach((opt) => {
      html += `<label>
        <input type="radio" name="q${i}" onclick="checkAnswer('${opt}','${q.answer}')">
        ${opt}
      </label><br>`;
    });
  });

  document.getElementById("output").innerHTML = html;
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    alert("✅ Correct");
  } else {
    alert("❌ Wrong\nCorrect: " + correct);
  }
}

function showError(msg) {
  document.getElementById("output").innerHTML =
    `<p style="color:#ff4d4d;">${msg}</p>`;
}
