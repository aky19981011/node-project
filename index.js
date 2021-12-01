const fs = require("fs");
const http = require("http");
const url = require("url");

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

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

const tempOverview = fs.readFileSync(
  "./templates/template-overview.html",
  "utf-8"
);
const tempCard = fs.readFileSync("./templates/template-card.html", "utf-8");
const tempProduct = fs.readFileSync(
  "./templates/template-product.html",
  "utf-8"
);

const data = fs.readFileSync("data.json", "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Overview page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
    // Product page
  } else if (pathName === "/product") {
    res.end("This is the product");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
