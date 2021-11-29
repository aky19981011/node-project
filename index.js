const fs = require("fs");
const http = require("http");

// synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = textIn + " I am Rk. ";
// fs.writeFileSync("./txt/output.txt", textOut);

// console.log("Its done.");

// Non-bolcking, asynchronous way

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile("./txt/" + data1 + ".txt", "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", data2 + "\n" + data3, "utf-8", (err) => {
//         console.log("Your file has been written");
//       });
//     });
//   });
// });
// console.log("Well read file");

const server = http.createServer((req, res) => {
  res.end("hello from the server!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
