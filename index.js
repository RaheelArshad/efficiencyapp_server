const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const multer = require("multer");

// Set the storage for Multer to define where the file will be saved
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');  // Define folder to save the files
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);  // Keep the original filename
    }
  });


// Set up Multer middleware to handle file uploads
const upload = multer({ storage: storage });

// Set up file upload route
server.post("/upload", upload.single('audiofile'), (req, res) => {
  res.json({ message: "File uploaded successfully", file: req.file });
});


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