const http = require("http")
const app = require("./app")

const server = http.createServer(app)


let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port);