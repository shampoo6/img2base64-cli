#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const base64js = require('base64-js')

console.log(process.argv)

let _input = 'C:\\Users\\Shampoo6\\Desktop\\temp\\微信图片_20200806174319.png'
let _output = undefined
if (process.argv.length < 3) {
    console.error('请输入图片路径')
    return
} else if (process.argv.length === 3) {
    _input = process.argv[2]
} else if (process.argv.length >= 4) {
    _input = process.argv[2]
    _output = process.argv[3]
}

// 判断输入文件是否存在
if (!fs.existsSync(_input)) {
    console.error('图片文件不存在')
    return
}

// 查询工作空间
let workDir = path.dirname(_input)
if (!fs.existsSync(workDir)) {
    console.error('图片所在目录不存在')
    return
}

// 获取输出路径
if (!_output) {
    _output = path.join(workDir, './_out_temp.txt')
}

readFile(_input).then((data) => {
    return writeFile(_output, data)
}).catch(err => {
    console.error(err)
}).finally(() => {
    console.log('执行完毕')
})


function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

function writeFile(filePath, data) {
    return new Promise((resolve, reject) => {
        // 'data:image/png;base64,'
        // let buffer = new Buffer(data.toString())
        let str = 'data:image/png;base64,' + base64js.fromByteArray(data)
        fs.writeFile(filePath, str, (err) => {
            if (err) reject(err)
            else resolve()
        })
    })
}
