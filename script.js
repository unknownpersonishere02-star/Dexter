const apiURL = "https://dexter-ai-worker.lunarsoul69.workers.dev";

async function askDexter() {
  const input = document.getElementById("userInput").value;
  const output = document.getElementById("output");

  if (!input.trim()) {
    output.innerText = "Please enter something.";
    return;
  }

  output.innerText = "Dexter AI is thinking...";

  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: input
      })
    });

    const data = await response.json();

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI.";

    output.innerText = text;
  } catch (err) {
    output.innerText = "Error connecting to Dexter AI.";
  }
}
