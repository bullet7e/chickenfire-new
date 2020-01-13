const express = require("express");
const session = require("express-session");
const mysql = require("mysql");
const cors = require("cors");
//3:创建数据库连接池
var pool = mysql.createPool({
   host:"127.0.0.1",
   user:"root",
   password:"",
   port:3306,
   connectionLimit:15,
   database:"pubg"
})
//4:创建web服务器
var server = express();
//5:配置跨域
//允许跨域程序端口
server.use(cors({
    //允许哪个程序列表 脚手架
    origin:["http://176.221.15.22:8080",
		"http://176.221.15.22:5050",
		"http://127.0.0.1:8080",
    "http://localhost:8080"],
    //每次请求验证
    credentials:true
}));
//6:配置session对象
server.use(session({
   secret:"128位安全字符串",//加密条件
   resave:true,            //请求更新数据
   saveUninitialized:true  //保存初始化数据
}))
//7:指定静态目录  public
server.use(express.static("public")); 
server.use(express.urlencoded({ extended: true })); 
//8:启动监听端口  5050
server.listen(5050);

server.post("/login",(req,res)=>{
  //1:获取参数 uname upwd
  var n = req.body.uname;
  var p = req.body.upwd;
  //2:创建sql
  var sql =" SELECT uid FROM pubg_user WHERE uname = ? AND upwd = ?";
  //3:发送sql并且结果返回脚手架
  pool.query(sql,[n,p],(err,result)=>{
     //4:如果发生严重错误抛出
     if(err)throw err;
     //5:登录成功用户名密码有错
     if(result.length==0){
       res.send({code:-1,msg:"用户名或密码有误"})
     }else{
       //6:登录成功
       //7:将登录成功用户id保存
       //session对象作为登录成功凭据
       req.session.uid=result[0].uid;
       res.send({code:1,msg:"登录成功",data:[n]});
     }
  })
});

server.get("/getdata",(req,res)=>{
  //2:创建sql
  var sql =" SELECT pkind,pckind,pname,img,pdetail FROM pubg_prop";
  //3:发送sql并且结果返回脚手架
  pool.query(sql,(err,result)=>{
     //4:如果发生严重错误抛出
     if(err)throw err;
		 res.send(result);
  })
});

//注册
server.post("/regist",(req,res)=>{
  //1:获取参数
  var n = req.body.uname;
  var p = req.body.upwd;
	var em=req.body.email;
	var gen=req.body.gender;
	if(gen=="male"){
		gen=1
	}else if(gen=="female"){
		gen=0
	}
	if(!n){
		res.send({code:-2,msg:"用户名不能为空"});
		return;
	}
	if(!p){
		res.send({code:-3,msg:"密码不能为空"});
		return;
	}
  //2:创建sql
	var sql0="SELECT uid FROM pubg_user WHERE uname=?";
	pool.query(sql0,[n],(err,result)=>{
		if(err)throw err;
		if(result.length>0){
			res.send({code:-1,msg:"已存在该用户"})
		 }else{
			var sql =" INSERT INTO pubg_user VALUES(null,?,?,?,?)";
			//3:发送sql并且结果返回脚手架
			pool.query(sql,[n,p,em,gen],(err,result)=>{
			  //4:如果发生严重错误抛出
			  if(err)throw err;
			  if(result.affectedRows>0){
			  //5:登录成功
			 		 res.send({code:1,msg:"注册成功",data:[n]});
			  }
			 });
		 }
	 })
});

// 获取资讯列表
server.get("/getnewslist",(req,res)=>{
  var sql =" SELECT did,dkind,dtitle,dtime FROM pubg_detail";
  //3:发送sql并且结果返回脚手架
  pool.query(sql,(err,result)=>{
     //4:如果发生严重错误抛出
     if(err)throw err;
     res.send({code:1,data:result});
  })
});
//根据id获取资讯
server.post("/newsdetail",(req,res)=>{
  var id = req.body.did;
  //2:创建sql
  var sql =" SELECT dkind,dtitle,dtime,dauthor,detail FROM pubg_detail WHERE did = ?";
  //3:发送sql并且结果返回脚手架
  pool.query(sql,[id],(err,result)=>{
     //4:如果发生严重错误抛出
     if(err)throw err;
     res.send({code:1,data:result});
  })
});