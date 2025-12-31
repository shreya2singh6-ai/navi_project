let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function addNote() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  if (title === "" || content === "") return;

  notes.push({
    id: Date.now(),
    title,
    content,
    pinned: false
  });

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";

  saveNotes();
  renderNotes();
}

function togglePin(id) {
  notes = notes.map(note =>
    note.id === id ? { ...note, pinned: !note.pinned } : note
  );
  saveNotes();
  renderNotes();
}

function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveNotes();
  renderNotes();
}

function renderNotes() {
  const pinnedContainer = document.getElementById("pinnedNotes");
  const notesContainer = document.getElementById("notes");

  pinnedContainer.innerHTML = "";
  notesContainer.innerHTML = "";

  notes.forEach(note => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note" + (note.pinned ? " pin" : "");

    noteDiv.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <button onclick="togglePin(${note.id})">
        ${note.pinned ? "Unpin" : "Pin"}
      </button>
      <button onclick="deleteNote(${note.id})">Delete</button>
    `;

    if (note.pinned) {
      pinnedContainer.appendChild(noteDiv);
    } else {
      notesContainer.appendChild(noteDiv);
    }
  });
}

renderNotes();