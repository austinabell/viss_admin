const express = require("express");
const resolve = require("path").resolve;

const app = express();
const port = process.env.PORT || 9000;

// Serve the static files from the React app
app.use(express.static(resolve(process.cwd(), "build")));

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(resolve(process.cwd(), "build", "index.html"));
});

app.listen(port);

console.log(`Server started at port: ${port}`);
