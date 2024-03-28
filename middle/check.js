 // 校验token
 const jwt = require('jsonwebtoken')
 module.exports = (req, res, next) => {
    let token = req.get("token")
    if(!token){
        return  res.json({
            code:'2000',
            msg:'token 缺失',
            data : null
        })
    }
    jwt.verify(token , 'Echooo' , (err , data) => {
        if(err){
            return  res.json({
                code:'2000',
                msg:'token 读取失败',
                data : null
            })
        }
        // 保存用户信息 req.session  中间件函数先对函数做处理,把信息存在req res中
        req.user = data
        next()
    })
 }
