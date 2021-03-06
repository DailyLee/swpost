const Koa = require('koa')
const path = require('path')
const staticServe = require('koa-static')
const http = require("http")
const https = require("https")
const fs =require("fs")
const bodyParser =require("koa-bodyparser")
const post =require("./request/post")
const port = process.env.PORT || 3000

const app = new Koa()

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'
app.use(staticServe(path.join(path.resolve(), staticPath),{
    setHeaders (res) {
        res.setHeader('ETag', Date.now())
    },
}))

app.use(bodyParser())
app.use(post)

http.createServer(app.callback()).listen(port);

// const options = {
//     key: fs.readFileSync("./server.key", "utf8"),
//     cert: fs.readFileSync("./server.cert", "utf8")
// };
// https.createServer(options, app.callback()).listen(443);
