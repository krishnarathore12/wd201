const http = require("http");
const fs = require("fs");
const minimist = require("minimist");
const path = require("path");

// Parse command line arguments
const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

let homeContent = "";
let projectContent = "";
let registrationContent = "";

// Use path.join with __dirname to make file paths absolute
fs.readFile(path.join(__dirname, "home.html"), (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile(path.join(__dirname, "project.html"), (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

fs.readFile(path.join(__dirname, "registration.html"), (err, registration) => {
  if (err) {
    throw err;
  }
  registrationContent = registration;
});

http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    
    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;
      case "/registration":
        response.write(registrationContent);
        response.end();
        break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  }); 