const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

// Use default middlewares (logger, static, cors, etc.)
server.use(middlewares);

// Custom routing logic
server.use(jsonServer.rewriter({
  "/patients": "/patients",
  "/patients/:id": "/patients/:id",  // To get specific patient by ID
  "/patientCard": "/patientCard",
  "/patientCard/:id": "/patientCard/:id", // To get specific patient card by ID
  "/login": "/login",
  "/getAllTypesLogin": "/getAllTypesLogin",
  "/getAllFacilitiesHome": "/getAllFacilitiesHome",
  "/getAllPatientDemographicByIdProviderAndName": "/getAllPatientDemographicByIdProviderAndName",
  "/chartLiabilities": "/chartLiabilities",
  "/chartLos": "/chartLos"
}));

// Use the router to handle requests
server.use(router);

// Start the server
server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
});
