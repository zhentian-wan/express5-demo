// curl "http://localhost:3000/notes?sort=DESC"
export function list(req, res) {
  const { sort } = req.query;
  console.log(`query sort: ${sort}`);
  res.json([]);
}

// curl -X POST -d title="hello" -d body="world" http://localhost:3000/notes/
export async function create(req, res) {
  const { title, body } = req.body;
  console.log(`${title} and ${body} received`);
  res.send("ok");
}

export function read(req, res) {
  const { id } = body.params;
  res.json({ id, title: "a smaple title", body: "a simple body" });
}

// curl -X POST -d title="hello" -d body="world" http://localhost:3000/notes/123
export async function update(req, res) {
  const { id } = req.params;
  const { title, body } = req.body;
  console.log(`update id: ${id}:" ${title} and ${body} received`);
  res.send("ok");
}

// curl -X DELETE http://localhost:3000/notes/123
export async function deleteNote(req, res) {
  const { id } = req.params;
  console.log(`delete id ${id}`);
  res.send("ok");
}
