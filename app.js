var express = require('express')
var app = express()
// 設定靜態檔案絕對路由
app.use(express.static('public'))

//設定 ejs
var engine = require('ejs-locals');
app.engine('ejs',engine);
// ejs 檔案在 views 中讀取
app.set('views','./views');
// 讓 express 使用 ejs
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({
  extended:false
}))

var login = (req,res,next)=>{
  var _url=req.url;
  if(_url!=='/'){
    next()
  }else{
    res.send('你的登入有誤')
  }
}


app.get('/user/:name',login,(req,res)=>{
  var myName = req.params.name
  var limit = req.query.limit
  var q = req.query.q
  if(myName !== 'ryder'){
    res.send(`<!DOCTYPE html>
    <html lang="zh-TW">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      ${myName} 想要找 ${q}  的資料共 ${limit} 筆
      <img src="/image/test.jpg" alt="">

    </body>
    </html>`)
  }else{
    res.render('index',{
      'title':'六角',
      'name':'ryder',
      'test': '<span>科科</span>',
      'show': true,
      'array': ['Ryder','Ray','Jack','Mike']
  })
  }
})

app.get('/product',(req,res)=>{
  res.render('product',{
    'title':'六角',
    'name':'ryder',
    'test': '<span>科科</span>',
    'show': true,
    'array': ['Ryder','Ray','Jack','Mike']
  })
})

app.get('/search',(req,res)=>{
  res.render('search')
})
app.post('/searchList',(req,res)=>{
  console.log(req.body)
    res.redirect('search')
  // res.render('search')
})
app.post('/searchAjax',(req,res)=>{
  console.log(req.body)
  res.send(`hello ${req.body.array[0]}`)
})
app.use((req,res)=>{
res.status(404).send('sorry，找不到你的頁面')
})

app.use((err,req,res,next)=>{
  res.status(500).send('sorry，程式碼有些問題請稍後嘗試')
})

var port = process.env.port || 3000
app.listen(port)

//網址內容會使用 ? 做參數
// next  