import express from 'express';
import dto from '../Dto/inboxDto.js'
const routes = express.Router();


routes.get('/',(req,res)=>{
    res.render('index');
});
routes.get('/inboxMailHtml/:id',(req,res)=>{
    const id = req.params.id;
    res.render('inboxMail',{id});
})
routes.get('/compose',(req,res)=>{
    res.render('compose');
})
routes.get('/inbox',dto.getInbox);
routes.get('/inboxMail/:id',dto.getMailById);
routes.post('/composeMail',dto.composeMail);

export default routes