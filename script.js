const API = "/api/notes";

async function addNote() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });

  loadNotes();
}

async function loadNotes() {
  const res = await fetch(API);
  const notes = await res.json();

  const container = document.getElementById("notes");
  container.innerHTML = "";

  notes.forEach(note => {
    container.innerHTML += `
      <div class="note ${note.pinned ? "pin" : ""}">
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <button onclick="togglePin('${note._id}')">
          ${note.pinned ? "Unpin" : "Pin"}
        </button>
        <button onclick="deleteNote('${note._id}')">Delete</button>
      </div>
    `;
  });
}

async function togglePin(id) {
  await fetch(`${API}/${id}/pin`, { method: "PATCH" });
  loadNotes();
}

async function deleteNote(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadNotes();
}

loadNotes();