const {Router} = require("express")
var jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const {UserModel} = require("../models/userModel")
const userRouter = Router()

userRouter.get("/",(req,res)=>{
    res.send("Welcome to users page")
})


userRouter.post("/signup" , async(req,res)=>{
    try {

        let {email , password , confirm_password} = req.body
        let user = await UserModel.findOne({email})
        if(!user){
            let hashedPassword = await bcrypt.hash(password, 5)
           
            let newUser = await UserModel.create( {email, password : hashedPassword , confirm_password : hashedPassword})
            res.status(200).send({
                "msg" : "User Created Successfully",
                newUser
            })
            return
        }
        else{
            res.status(400).send("User with this Email already exits. Kindly login to continue")
        }
        
    } catch (error) {
        res.status(400).send({"msg" : error.message,
         "error" : "Error occured while creating user"})
    }
})


userRouter.post("/login" , async(req,res)=>{
    try {

        let {email , password } = req.body
        console.log("here inside login request body", req.body)
        let user = await UserModel.findOne({email})
        if(user){
            let isPasswordValid =  await bcrypt.compare(password, user.password)

            if(isPasswordValid){
                // jwt token

                let token = jwt.sign({
                    userEmail : email,
                    userId : user.id
                  }, 'secret', { expiresIn: '1h' });
               
                console.log("token is ", token)
               
                res.status(200).send({
                    "msg" : "User Logged in Successfully", token
                })
                return
            }else{
                res.status(400).send("Please enter right credentials..!!")
            }
            
            return
        }
        else{
            res.status(400).send("User with this Email does not exits. Kindly Signup")
        }
        
    } catch (error) {
        res.status(400).send({"msg" : error.message,
         "error" : "Error occured while creating user"})
    }
})

module.exports = {userRouter}