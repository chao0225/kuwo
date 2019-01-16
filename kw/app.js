//使用express构建web服务器 --11:25
const express = require('express');
const bodyParser = require('body-parser');
const cors=require("cors");   // 需要下载   cors 跨域包
/*引入路由模块*/

var app = express();
var server = app.listen(3344, function() {
  console.log("即将开启你的音乐之旅！！！")
});
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
//托管静态资源到public目录下
app.use(express.static('public'));
app.use(cors({
  origin:["http://localhost:5500","http://127.0.0.1:5500"]
}))
// app.use(session({
//   secret:"128位随机字符",
//   resave:false,
//   saveUninitialized:true
// }))
