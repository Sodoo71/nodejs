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
      } catch (e) {}

      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(todos[todos.length - 1]));
    });
  } else if (request.method === "DELETE") {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk.toString();
    });

    request.on("end", () => {
      const json = JSON.parse(body);

      if (!json.id) {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify({
            message: "Param id required",
          })
        );
      } else {
        let index = -1;

        for (let i = 0; i < todos.length; i++) {
          if (json.id === todos[i].id) {
            index = i;
          }
        }

        if (index === -1) {
          response.writeHead(404, { "Content-Type": "application/json" });
          response.end(
            JSON.stringify({
              message: `Todo with id "${json.id}" not found`,
            })
          );
        } else {
          const deletedTodo = todos[index];
          todos.splice(index, 1);
          response.writeHead(200, { "Content-Type": "application/json" });
          response.end(JSON.stringify(deletedTodo));
        }
      }
    });
  } else {
    response.statusCode = 405;
    response.end(JSON.stringify({ message: "Method not allowed" }));
  }
});

server.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}/`);
});
