import express from 'express';
import dto from '../Dto/inboxDto.js'
import login from '../Dto/userDto.js'
const routes = express.Router();

routes.get('/',(req,res)=>{
    res.render('login');
})
routes.get('/logout',login.logout);
routes.post('/login',login.conformDetails);
routes.get('/home',(req,res)=>{
    res.render('index');
});
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