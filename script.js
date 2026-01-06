const WORKER_URL = "https://dexter-ai-worker.lunarsoul69.workers.dev";

async function askDexter() {
  const input = document.getElementById("userInput").value;
  const output = document.getElementById("output");

  if (!input.trim()) {
    output.innerText = "Please type something.";
    return;
  }

  output.innerText = "Dexter AI is thinking...";

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: input
      })
    });

    const data = await response.json();

    if (data.error) {
      output.innerText = "AI Error: " + data.error;
    } else {
      output.innerText = data.text;
    }

  } catch (err) {
    output.innerText = "Error connecting to AI";
  }
}
