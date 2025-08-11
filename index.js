const http = require("http");

const hostname = "localhost";

const port = 3100;

const todos = [
  {
    id: 1,

    title: "Wake up",

    completed: false,
  },
];

const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "application/json");

  if (request.method === "GET") {
    response.statusCode = 200;

    response.end(JSON.stringify(todos));
  } else if (request.method === "POST") {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk.toString();
    });

    request.on("end", () => {
      try {
        const json = JSON.parse(body);

        todos.push(json);
      } catch {}

      response.writeHead(200, { "Content-Type": "application/json" });

      response.end(JSON.stringify(todos[todos.length - 1]));
    });
  } else if (request.method === "DELETE") {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk.toString();
    });

    request.on("end", () => {
      try {
        const json = JSON.parse(body);
        const index = todos.findIndex((todo) => todo.id === json.id);
        if (index !== -1) {
          const deleted = todos.splice(index, 1)[0];
          response.writeHead(200, { "Content-Type": "application/json" });
          response.end(JSON.stringify(deleted));
        } else {
          response.writeHead(404, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ message: "Todo not found" }));
        }
      }:
    });
  } else {
    response.statusCode = 405;

    response.end(JSON.stringify({ message: "Method not allowed" }));
  }
});
clas
server.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}/`);
});
