const {Router} = require("express")

const doctorRouter = Router()
const {DoctorModel} = require("../models/doctorModel")
const {authMiddleware} = require("../middleware/authMiddleware")


doctorRouter.post("/appointments" ,authMiddleware, async(req,res)=>{
    try {

        let newAppointment =  await DoctorModel.create( req.body)
            res.status(200).send({
                "msg" : "Appointment Created Successfully",
                newAppointment
            })
            return
         
    } catch (error) {
        res.status(400).send({"msg" : error.message,
         "error" : "Error occured while creating new Appointment"})
    }
})


doctorRouter.get("/" ,async(req,res)=>{
    try {
        let {name , date, specialization} = req.query 
        let query = {}

        if(name){
            query.name = { $regex: name, $options: 'i' }
        }
        if(date){
            query.date = date
        }
        if(specialization){
            query.specialization = specialization
        }

        let appointments = await DoctorModel.find(query)
        res.status(200).send({
            "msg" : "Appointment Fetched Successfully",
            appointments
        })
        return
    } catch (error) {
        res.status(400).send({"msg" : error.message,
        "error" : "Error occured while fetching the data"})
    }
   
})


doctorRouter.delete("/appointments/:id",async(req,res)=>{
    try {
        let {id} = req.params
        let appointment = await DoctorModel.findByIdAndDelete(id)
        res.status(200).send({
            "msg" : "Doctor's Appointment Deleted Successfully",
           appointment
        })
        return
    } catch (error) {
        res.status(400).send({"msg" : error.message,
        "error" : "Error occured while deleting the data"})
    }
   
})


doctorRouter.patch("/appointments/:id",async(req,res)=>{
    try {
        let {id} = req.params
        console.log("id  coming from param" , id , typeof id)
        let payload = req.body
        let appointment = await DoctorModel.findByIdAndUpdate(id , payload , {new:true})
        console.log("appointment is", appointment)
        res.status(200).send({
            "msg" : "Doctor's Appointment Updated Successfully",
           "updated" : appointment
        })
        return
    } catch (error) {
        res.status(400).send({"msg" : error.message,
        "error" : "Error occured while updating the data"})
    }
   
})
 

module.exports = {doctorRouter}