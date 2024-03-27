var express = require('express');
var router = express.Router();
let UserModel = require('../../Model/reg')
const md5 = require("md5")
// 拿到页面
router.get('/reg' , (req , res) =>{
    // 去web下面找
    res.render('login/reg')
})

// 实现注册功能
router.post('/reg' , (req , res) => {
    console.log(req.body);
    UserModel.create({...req.body ,password: md5(req.body.password)})
    .then(data => {
        res.status(200).send("注册成功")
    })
    .catch(err => {
        res.status(500).send("注册失败")
    })
})

// 登录
router.get('/login' , (req , res) =>{
    // 去web下面找
    res.render('login/login')
})

// 登录验证
router.post('/login' , (req , res) =>{
    let {username , password} = req.body
    UserModel.findOne({username : username , password : md5(password)})
    .then(data => {
        if(!data){
            res.send("账号或者密码错误")
        }else{
            res.render("success" , {msg :'登录成功' , url : '/api/accountList'})
            req.session.username = data.username
            req.session._id = data._id
        }
    })
    .catch(err => {
        res.status(500).send("查找失败")
    })
})


module.exports = router;
