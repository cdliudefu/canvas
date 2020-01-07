const express = require('express')
const path = require('path')
const fs = require('fs')
var querystring = require("querystring");

const app = express()
app.use(express.static(path.join(__dirname, "upload")));

app.get('/',(req,res)=>{
  let data = fs.readFileSync("./index.html", { encoding :'utf-8'});
  res.end(data);
})

app.post("/upload", (req, res) => {
  console.log("====upload==", req.Files);
   var body = "";
  //每当接收到请求体数据，累加到post中
  req.on("data", function(chunk) {
    body += chunk; //一定要使用+=，如果body=chunk，因为请求favicon.ico，body会等于{}
    console.log("chunk:", chunk);
  });
  //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
  req.on('end', function () {
      // 解析参数
      // body = querystring.parse(body);  //将一个字符串反序列化为一个对象
      var base64Img = body.toString("base64");
      var decodeImg = new Buffer(base64Img, 'base64');  // new Buffer(string, encoding)
      console.log("body:", decodeImg);
      var url = path.join(__dirname,'a.png')
      fs.writeFileSync(url, decodeImg);
      // 设置响应头部信息及编码\
    // res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});  
    //   if(body.name && body.url) { // 输出提交的数据
    //       res.write("网站名：" + body.name);
    //       res.write("<br>");
    //       res.write("网站 URL：" + body.url);
    //   } else {  // 输出表单
    //       res.write(postHTML);
    //   }
    res.write(body);
    res.end('');
  });
  // res.end("hello");
});

app.listen(3000,()=>{
  console.log('server listening 3000')
})

//  HttpRequest req = _Context.Request;
//     if (req.Files.Count > 0)
//     {
//         string newname = Guid.NewGuid().ToString() + ".jpg";
//         //接收二级制数据并保存
//         Stream stream = req.Files[0].InputStream;
//         byte[] dataOne = new byte[stream.Length];
//         stream.Read(dataOne, 0, dataOne.Length);
//         FileStream fs = new FileStream(TempFile + newname, FileMode.Create, FileAccess.Write);
//         try
//         {
//             fs.Write(dataOne, 0, dataOne.Length);
//         }
//         finally
//         {
//             fs.Close();
//         }
//         return newname;
//     }
//     return "";
