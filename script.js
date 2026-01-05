function generate() {
  const text = document.getElementById("notes").value;
  if (!text) {
    alert("Please paste notes first!");
    return;
  }

  // Summary logic
  const sentences = text.split(".");
  document.getElementById("summary").innerText =
    sentences.slice(0, 2).join(".") + ".";

  // Flashcards logic
  const flashcards = document.getElementById("flashcards");
  flashcards.innerHTML = "";
  sentences.slice(0, 3).forEach((s, i) => {
    if (s.trim()) {
      const li = document.createElement("li");
      li.innerText = `Q${i + 1}: ${s.trim()}?`;
      flashcards.appendChild(li);
    }
  });

  // Quiz logic
  document.getElementById("quiz").innerHTML = `
    <p><b>Quiz:</b> What is this topic about?</p>
    <button onclick="alert('Correct! 🎉')">Based on notes</button>
    <button onclick="alert('Wrong ❌ Try again')">Something else</button>
  `;

  // Save notes
  localStorage.setItem("dexter_notes", text);
}
