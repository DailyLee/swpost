const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
// const querystring = require("querystring")
const Busboy = require('busboy')

/**
 * 同步创建文件目录
 * @param  {string} dirname 目录绝对地址
 * @return {boolean}        创建目录结果
 */
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}

/**
 * 获取上传文件的后缀名
 * @param  {string} fileName 获取上传文件的后缀名
 * @return {string}          文件后缀名
 */
function getSuffixName(fileName) {
    let nameList = fileName.split('.')
    return nameList[nameList.length - 1]
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr(queryStr) {
    let queryData = {}
    let queryStrList = queryStr.split('&')
    console.log(queryStrList)
    for (let [index, queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=')
        queryData[itemList[0]] = decodeURIComponent(itemList[1])
    }
    return queryData
}

function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = [];
            ctx.req.addListener('data', (data) => {
                postdata.push(data)
            })
            ctx.req.addListener("end", function () {
                resolve(Buffer.concat(postdata))
            })
        } catch (err) {
            reject(err)
        }
    })
}

/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @param  {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}
 */
function uploadFile(ctx, options) {
    let req = ctx.req
    let res = ctx.res
    let busboy;
    try {
        busboy = new Busboy({headers: req.headers})
    } catch (e) {
        return parsePostData(ctx).then(payload => {
            let filePath = `${Date.now()}.png`;

            return new Promise((resolve, reject) => {
                fs.writeFile('./static/upload/' + filePath, payload, 'utf8', (error) => {
                    if (error) {
                        console.log(error);
                        reject({
                            message: error.message,
                            success: false
                        })
                    }
                    console.log('filePath', filePath)
                    resolve({
                        uploadFile: filePath,
                        message: "二进制上传成功",
                        success: true
                    })
                })
            })


        })
    }

    // 获取类型
    // let fileType = options.fileType || 'common'
    let filePath = path.join('./static/upload')
    let mkdirResult = mkdirsSync(filePath)

    return new Promise((resolve, reject) => {
        console.log('文件上传中...')
        let result = {
            success: false,
            formData: {},
            uploadFile: ''
        }

        // 解析请求文件事件
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
            let _uploadFilePath = path.join(filePath, fileName)
            let saveTo = path.join(_uploadFilePath)

           // resolve(result)

            // 文件保存到制定路径
            file.pipe(fs.createWriteStream(saveTo))

            // 文件写入事件结束
            file.on('end', function () {
                result.success = true
                result.message = '文件上传成功'
                result.uploadFile = fileName

                console.log('文件上传成功！')
            })
        })

        // 解析表单中其他字段信息
        busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
            console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val));
            result.formData[fieldname] = inspect(val);
        });

        // 解析结束事件
        busboy.on('finish', function () {
            console.log('文件上结束')
            resolve(result)
        })

        // 解析错误事件
        busboy.on('error', function (err) {
            console.log('文件上出错')
            reject(result)
        })

        req.pipe(busboy)
    })

}


module.exports = uploadFile;
