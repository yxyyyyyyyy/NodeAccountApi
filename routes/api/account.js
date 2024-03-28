var express = require('express');
var router = express.Router();


// 导入日期管理工具
const moment = require("moment")

const AccountModel = require("../../Model/Account")
const loginmiddle = require("../../middle/Login")
const tokenmidle = require("../../middle/check")
let UserModel = require('../../Model/reg')
const md5 = require("md5");
const { token } = require('morgan');
const jwt = require('jsonwebtoken')
// 声明中间件检测登录
let checkLogin = loginmiddle
let checkToken = tokenmidle
// router.get('/', (req, res) => {
//     res.redirect('/login'); // 重定向到登录页面
// });

// 获取全部账单
router.get('/accountList' ,checkToken ,  function (req, res, next) {
    const user = req.user
    AccountModel.find().sort({ time: -1 }).exec()
        .then(data => {
            res.json({
                code: '0',
                msg: '读取成功',
                data: data
            })
        })
        .catch(err => {
            res.json({
                code: '1001',
                msg: '读取失败',
                data: null
            })
        });
});

// 在接口规则中 ,  不会给客户返回html  只会返回json

router.post('/add', checkToken, function (req, res, next) {
    AccountModel.create({
        ...req.body,
        time: moment(req.body.time).toDate()
    })
        .then(data => {
            res.json({
                code: '0',
                msg: '创建成功',
                data: data
            })
        })
        .catch(err => {
            res.json({
                code: '1001',
                msg: '创建失败',
                data: data
            })
        });
});

router.get('/delete/:id', checkToken, (req, res) => {
    let id = req.params.id
    AccountModel.deleteOne({
        _id: id
    })
        .then(data => {
            res.json({
                code: '0',
                msg: '删除成功',
                data: {}
            })
        })
        .catch(err => {
            res.json({
                code: '1001',
                msg: '删除成功',
                data: null
            })
        })

})

// 获取单个账单
router.get('/account/:id', checkToken, (req, res) => {
    let { id } = req.params;
    AccountModel.findById(id)
        .then(data => {
            if (data) {
                res.json({
                    code: '0',
                    msg: '依照id查询单个成功',
                    data: data
                });
            } else {
                res.json({
                    code: '1001',
                    msg: '依照id查询单个失败，未找到对应数据',
                    data: null
                });
            }
        })
        .catch(err => {
            res.json({
                code: '1001',
                msg: '依照id查询单个失败',
                data: null
            });
        });
});


router.patch('/account/:id', checkToken, (req, res) => {
    let { id } = req.params;
    AccountModel.updateOne({ _id: id }, req.body)
        .then(data => {
            res.json({
                code: '0000',
                msg: '更新成功',
                data: data
            });
        })
        .catch(err => {
            return res.json({
                code: '500',
                msg: '更新失败',
                data: null
            });
        });
});

module.exports = router;
