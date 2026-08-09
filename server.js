const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//用户数据库
let userList = [];
//管理员账号密码
const adminPwd = "123456";

//注册接口
app.post('/register',(req,res)=>{
    const {username,password} = req.body;
    if(password !== "123456"){
        return res.json({code:0,msg:"密码错误"});
    }
    let exist = userList.find(u=>u.username === username);
    if(exist){
        return res.json({code:0,msg:"用户名已存在"});
    }
    userList.push({
        username,
        status:"normal" //normal正常 frozen冻结 ban封禁
    })
    res.json({code:1,msg:"注册成功"});
})

//管理员登录
app.post('/adminlogin',(req,res)=>{
    const {pwd} = req.body;
    if(pwd === adminPwd){
        res.json({code:1,data:userList});
    }else{
        res.json({code:0,msg:"管理员密码错误"});
    }
})

//修改用户状态 冻结、解冻、封禁
app.post('/setuserstatus',(req,res)=>{
    const {username,status} = req.body;
    let u = userList.find(x=>x.username === username);
    if(u){
        u.status = status;
        res.json({code:1});
    }else{
        res.json({code:0});
    }
})

app.listen(port,()=>{
    console.log("服务器启动，端口："+port);
})
