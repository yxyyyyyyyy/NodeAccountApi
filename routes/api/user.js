var express = require('express');
var router = express.Router();


let UserModel = require('../../Model/reg')
const md5 = require("md5");
const { token } = require('morgan');
const jwt = require('jsonwebtoken')


router.post('/login' , (req , res) => {

    let {username , password} = req.body
    UserModel.findOne({username : username , password : md5(password)})
    .then(data => {
        // 如果不写return 就会继续往下执行 就会遇到另一个return 就相当于有两个end 这样是不对
        if(!data){
            return res.json({
                code :'2002',
                msg :'用户名或者密码错误',
                data :null
            })
        }
        // 创建
        let token = jwt.sign({
            username:data.username,
            _id : data._id
        } , 'Echooo',{
            expiresIn : 60 * 60 * 24 * 1000
        })
        // 响应
        res.json({
            code:'0000',
            msg:'登录成功',
            data:token
        })
        
    })
    .catch(err => {
        res.json({
            code :'2001',
            msg :'数据库读取失败',
            data :null
        })
    })
    
})
module.exports = router;
