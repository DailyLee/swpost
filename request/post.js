const uploadFile = require('./upload')
const path = require('path')

const post = async (ctx) => {

    if (ctx.url === '/' && ctx.method === 'GET') {
        // 当GET请求时候返回表单页面
        let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `
        ctx.body = html
    } else if (ctx.url === '/' && ctx.method === 'POST') {
        // 当POST请求的时候，中间件koa-bodyparser解析POST表单里的数据，并显示出来
        let postData = ctx.req.body
        ctx.body = postData
    } else if (ctx.url === '/upload' && ctx.method === 'POST') {
        // 上传文件请求处理
        let result = {success: false}
        let serverFilePath = path.join(__dirname, 'upload-files')

        // 上传文件事件
        result = await uploadFile(ctx, {
            fileType: 'album', // common or album
            path: serverFilePath
        })

        ctx.body = result
    } else {
        // 其他请求显示404
        ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
    }
};

module.exports = post

