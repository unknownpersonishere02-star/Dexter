function generate() {
  const text = document.getElementById("notes").value;
  if (!text) {
    alert("Please paste notes first!");
    return;
  }

  const sentences = text.split(".").filter(s => s.trim());

  // Summary
  document.getElementById("summary").innerText =
    sentences.slice(0, 2).join(".") + ".";

  // Flashcards (flip)
  const flashcards = document.getElementById("flashcards");
  flashcards.innerHTML = "";

  sentences.slice(0, 4).forEach((s) => {
    const card = document.createElement("div");
    card.style.padding = "10px";
    card.style.marginTop = "8px";
    card.style.background = "#334155";
    card.style.borderRadius = "8px";
    card.style.cursor = "pointer";
    card.innerText = "Tap to reveal";

    let flipped = false;
    card.onclick = () => {
      flipped = !flipped;
      card.innerText = flipped ? s.trim() : "Tap to reveal";
    };

    flashcards.appendChild(card);
  });

  // Quiz
  document.getElementById("quiz").innerHTML = `
    <p><b>Quiz:</b> This topic is mainly about?</p>
    <button onclick="alert('Correct 🎉')">Based on notes</button>
    <button onclick="alert('Wrong ❌')">Something else</button>
  `;

  localStorage.setItem("dexter_notes", text);
}
