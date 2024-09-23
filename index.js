const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080; //  chose port from here like 8080, 3001

server.use(middlewares);
server.use(router);
jsonServer.rewriter({
    "/*" : "/$1"
})

server.listen(port, () => {
    console.log('json server is running', port);
});

module.exports = server;