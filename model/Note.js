import { v4 as uuid } from "uuid";
import MapStore from "../lib/mapstore.js";
const NOTES = new Map();
const store = new MapStore("notes.json");
/*
Note {
    id: String
    title: String
    body:  String
    lastEdited: Date
}*/

store
  .read()
  .then((notes) => {
    for (let [id, note] of notes) {
      NOTES.set(id, note);
    }
  })
  .catch((err) => {
    console.error(err);
  });

export function getNotes(sort) {
  const notes = Array.from(NOTES.values());
  if (sort === "asc") {
    return notes.sort((a, b) => {
      return a.lastEdited - b.lastEdited;
    });
  } else {
    return notes.sort((a, b) => {
      return b.lastEdited - a.lastEdited;
    });
  }
  return;
}

export async function createNote({ title, body }) {
  const id = uuid();
  const lastEdited = Date.now();
  const note = {
    id,
    title,
    body,
    lastEdited,
  };
  NOTES.set(id, note);
  await store.save(NOTES);
  return { ...note };
}

export async function updateNote(id, { title, body }) {
  if (!NOTES.has(id)) {
    return null;
  }
  const note = NOTES.get(id);
  note.title = title ?? note.title;
  note.body = body ?? note.body;
  note.lastEdited = Date.now();
  await store.save(NOTES);
  return { ...note };
}

export function getNode(id) {
  if (!NOTES.has(id)) {
    return null;
  }
  const note = NOTES.get(id);
  return { ...note };
}

export async function deleteNode(id) {
  const successed = NOTES.delete(id);
  await store.save(NOTES);
  return successed;
}
