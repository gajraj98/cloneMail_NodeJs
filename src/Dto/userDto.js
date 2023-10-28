import e from 'express';
import dao from '../Dao/userDao.js'
import twilio from 'twilio';
const accountSid = "ACc502c1007c37406ca6783b1477c0740c";
const token = "1187316fce9b4f928dadbc5a39c1e645";
const client = twilio(accountSid, token);




export default class User{
    static async conformDetails(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = await dao.conformDetails(email,password);
            console.log(password);
            console.log(user.password);
            if (req.body.email === user.email && parseInt(password.trim()) === user.password) {
                req.session.user = user.email;
                res.render('index');
            } else {
                res.send('Invalid User');
            }
        } catch (e) {
            console.log('Error:', e.message);
            res.send(e.message);
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
           console.log(email);
           const response  = dao.addDetails(email,password,phoneNumber);
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
            const phoneNumber = req.query.phoneNumber;
            const otp = dao.otpVerifection(phoneNumber);
            res.status(200).send(otp.tostring());
        }
        catch(e){
            res.status(400).send(e.message);
        }
    }
    static async verifyPhoneNumber(req,res,next){
        try{
            const phoneNumber = req.body.number;
            const user = await dao.verifyPhoneNumber(req.body.number);
            console.log(user.phoneNumber);
            console.log(phoneNumber);
                if(user.phoneNumber === phoneNumber){
                    console.log('stag2');
                    await User.generateOtp(phoneNumber);
                    console.log('stag3');
                    res.status(200).send('enter otp');
                }
        }
        catch(e){
            console.log(e.message);
            res.status(400).send(e.message);
        }
    }
    static async generateOtp(phoneNumber) {
        try {
            console.log('stag21')
            const min = 1000;
            const max = 9999;
            const otp = Math.floor(Math.random() * (max - min + 1)) + min;

            client.messages.create({
                body: `Alert!! Your Bank account is in problem your otp is ${otp}`,
                to: '+' + phoneNumber,
                from: '+12565677671'
            })
                .then(message => console.log(message.sid))
                .catch(error => console.error(error.message));
                console.log('stag22');
            const response = await dao.saveOtp(phoneNumber, otp);

        }
        catch (e) {
            console.log(e.message)
        }
    }
    
}