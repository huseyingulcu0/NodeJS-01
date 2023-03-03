/** @format */

const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><h1>Hi, Welcome to my first Nodejs App</h1><form action='/create-user' method='POST' ><input name='value' type='text' /></form></body>"
    );
    return res.end();
  } else if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><ul><li>User 1</li><li>User 2</li><li>User 3</li><li>User 4</li></ul></body>"
    );
    res.write("</html>");
    return res.end();
  } else if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
};

exports.handler = requestHandler;
exports.dummyText = "Some hard coded text";
