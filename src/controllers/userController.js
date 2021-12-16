const userModel = require('../models/userModel');

//validation
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}
const isValidEmail= function(email){
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    }
const isValidPhone = function (phone) {
    return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(phone)
}


//
const createUser = async function (req, res) {
    const requestBody = req.body
    let { title, name, phone, email, password, address } = requestBody
    if (!isValidRequestBody(requestBody)) {
        res.status(400).send({ status: false, message: "Please provide valid request body" })
        return
    }
    if (!isValid(title)) {
        res.status(400).send({ status: false, message: "Title is required" })
        return
    }

    if (!isValid(name)) {
        res.status(400).send({ status: false, message: "name is required" })
        return
    }
    
    if (!isValid(phone)) {
        res.status(400).send({ status: false, message: "phone is required" })
        return
    }
    if(!isValidPhone(phone)){
        res.status(400).send({status:false, message:"provide valid phone number"})
        return
    }

    const isPhoneAlreadyUsed = await userModel.findOne({ phone })

    if (isPhoneAlreadyUsed) {
        res.status(400).send({ status: false, message: "phone is already in use, try something different" })
        return
    }

    if (!isValid(email)) {
        res.status(400).send({ status: false, message: "email should be valid" })
        return
    }
    if (!isValidEmail(email)) {
        res.status(400).send({ status: false, message: "provide valid email" })
        return
    }

    const isEmailAlreadyUsed = await userModel.findOne({ email })

    if (isEmailAlreadyUsed) {
        res.status(400).send({ status: false, message: "phone is already in use, try something different" })
        return
    }


    if (!isValid(password)) {
        res.status(400).send({ status: false, message: "password is required" })
        return
    }
    
    if (!isValidRequestBody(address)) {
        res.status(400).send({ status: false, message: "Please provide valid address" })
        return
    }


    const userDetails = await userModel.create(requestBody)
    res.status(200).send({status:true,data:userDetails})
    return

}

module.exports.createUser=createUser
// const isValidTitle = function (title) {
//     return ['Mr', 'Mrs', 'Miss'].indexOf(title) !== -1
// }
