import express from 'express';
import dto from '../Dto/inboxDto.js'
import login from '../Dto/userDto.js'
const routes = express.Router();

routes.get('/',(req,res)=>{
    res.render('login');
})
routes.get('/sign',(req,res)=>{
    res.render('signUp');
})
routes.get('/enterPhoneNumber',(req,res)=>{
    res.render('input_phoneNumber');
})
routes.get('/enter-otp',(req,res)=>{
    const phoneNumber = req.query.phoneNumber;
    const email = req.query.email;
    // console.log(phoneNumber);
    // console.log(email);
    res.render('enter_otp',{phoneNumber,email});
})
routes.get('/password-change',(req,res)=>{
    const phoneNumber = req.query.phoneNumber;
    res.render('passwordChange',{phoneNumber});
})
routes.get('/otp-verifection',login.otpVerifection);
routes.post('/verifyPhoneNumber',login.verifyPhoneNumber);
routes.get('/logout',login.logout);
routes.post('/login',login.conformDetails);
routes.get('/home',(req,res)=>{
    res.render('index');
});
routes.post('/sign',login.postDetails);
routes.get('/inboxMailHtml/:id',(req,res)=>{
    const id = req.params.id;
    res.render('inboxMail',{id});
})
routes.get('/compose',(req,res)=>{
    res.render('compose');
})
routes.get('/sent',(req,res)=>{
    res.render('sent');
})
routes.get('/inbox',dto.getInbox);
routes.get('/getSentMails',dto.getAllSentMailDto);
routes.get('/inboxMail/:id',dto.getMailById);
routes.post('/composeMail',dto.composeMail);

export default routes