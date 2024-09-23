const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);

server.get('/patientCard', (req, res) => {
  // Return the patientCard object
  const db = router.db; // Get the database
  const patientCard = db.get('patientCard').value(); // Assuming patientCard is an array
  res.json(patientCard); // Send the patientCard data
});

server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
});
