import * as Note from "../model/Note.js";

// curl "http://localhost:3000/notes?sort=DESC"
export function list(req, res) {
  let { sort } = req.query;
  sort = sort ? sort.toLowerCase() : "desc";
  if (sort !== "asc" && sort !== "desc") {
    return res.status(400).send("invalid sort params");
  }
  const notes = Note.getNotes(sort);
  res.json({ notes });
}

// curl -X POST -d title="hello" -d body="world" http://localhost:3000/notes/
export async function create(req, res) {
  const { title, body } = req.body;
  if (title == undefined || body == undefined) {
    return res.status(400).send("Invalid request");
  }
  const note = Note.createNote({ title, body });
  res.status(201).send({
    message: "ok",
    data: note,
  });
}

export async function read(req, res) {
  const { id } = body.params;
  if (id == undefined) {
    return res.status(400).send("Invalid request");
  }
  const note = await Note.getNode(id);
  res.json(note);
}

// curl -X POST -d title="hello" -d body="world" http://localhost:3000/notes/123
export async function update(req, res) {
  const { id } = req.params;
  const { title, body } = req.body;
  if (title == undefined && body == undefined) {
    return res.status(400).send("Invalid request");
  }
  const note = Note.updateNote(id, { title, body });
  res.send({ message: "ok", data: note });
}

// curl -X DELETE http://localhost:3000/notes/123
export async function deleteNote(req, res) {
  const { id } = req.params;
  await Note.deleteNode(id);
  res.send("ok");
}
