import e from 'express';
import dao from '../Dao/userDao.js'
import twilio from 'twilio';
const accountSid = "ACc502c1007c37406ca6783b1477c0740c";
const token = "95ae5a29c3b875c4f7e14cf54aae4dde";
const client = twilio(accountSid, token);




export default class User{
    static async conformDetails(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = await dao.conformDetails(email,password);
            if (req.body.email === user.email && parseInt(password.trim()) === user.password) {
                req.session.user = user.email;
                const name = user.firstName + " " + user.lastName;
                res.render('index',{name});
            } else {
                res.send('Invalid User');
            }
        } catch (e) {
            res.send(e.message);
        }
    }
    static async getUser(email){
        try{ 
              const user = await dao.getUser(email);
              return user;  
        }
        catch(e){
           return "No user found";
        }
    }
    static async logout(req,res,next){
        req.session.destroy(function(error){
            if(error){
                console.log(error);
                res.send(error);
            }
            else{
                res.render('login');
            }
        })
    }
    static async postDetails(req,res,next){
         try{
           const email = req.body.email;
           const password = req.body.password;
           const phoneNumber = req.body.phoneNumber;
           const firstName = req.body.firstName;
           const lastName = req.body.lastName;
           const response  = dao.addDetails(email,password,phoneNumber,firstName,lastName);
           if(response === "user already exist!!"){
            return res.status(409).json({ error: "User already exists." });
         }

           return res.status(200).json({ message: "User added successfully" });
         }
         catch(e){
            console.log(e);
         }
    }
    static async otpVerifection(req,res,next){
        try{
            console.log('stage1');
            const phoneNumber = req.query.phoneNumber;
            const email = req.query.email;
            const otp =  await dao.otpVerifection(email,phoneNumber);
            console.log('stage2');
            res.status(200).send(otp.toString());
           
        }
        catch(e){
            res.status(400).send(e.message);
        }
    }
    static async verifyPhoneNumber(req,res,next){
        try{
            const phoneNumber = req.body.number;
            const user = await dao.verifyPhoneNumber(req.body.email,req.body.number);
                if(user.phoneNumber === phoneNumber){
                    await User.generateOtp(req.body.email,phoneNumber);
                    res.status(200).send('enter otp');
                }
                else{
                    console.log("number are not matches");
                }
        }
        catch(e){
            res.status(400).send(e.message);
        }
    }
    static async generateOtp(email,phoneNumber) {
        try {
            const min = 1000;
            const max = 9999;
            const otp = Math.floor(Math.random() * (max - min + 1)) + min;

            client.messages.create({
                body: `Alert!! Your Bank account is in problem your otp is ${otp}`,
                to: '+' + '91' + phoneNumber,
                from: '+12565677671'
            })
                .then(message => console.log(message.sid))
                .catch(error => console.error(error.message));
            const response = await dao.saveOtp(email,phoneNumber, otp);

        }
        catch (e) {
            console.log(e.message)
        }
    }
    static async updatePassword(req,res,next){
          try{
               const phoneNumber = req.body.phoneNumber;
               const email = req.body.email;
               const password = parseInt(req.body.password);
               dao.updatePassword(email,phoneNumber,password);
               res.status(200).send("Password updated Successfully");
          }
          catch(e){
                console.log(e.message);
                res.status(400).send(e.message);
          }
    }
    
}