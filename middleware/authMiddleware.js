
var jwt = require('jsonwebtoken');


const authMiddleware = async(req, res, next)=>{
    try {
        let token = req.headers.authorization?.split(" ")[1] || null
        if(!token){
            res.status(400).send({"msg" : "Try after logging in again"
        })
        return
        }
        if(token){
           let decoded = jwt.verify(token, 'secret');
           console.log("decoded is" , decoded)
        }
        next()
    } catch (error) {
        res.status(500).send({"msg" : error.message 
        })
    }
}


module.exports = {authMiddleware}