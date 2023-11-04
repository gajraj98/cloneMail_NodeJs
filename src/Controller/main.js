import express from 'express';
import dto from '../Dto/inboxDto.js'
import login from '../Dto/userDto.js'
const routes = express.Router();

routes.get('/', (req, res) => {
    res.render('login');
});
routes.get('/sign', (req, res) => {
    res.render('signUp');
});
routes.get('/enterPhoneNumber', (req, res) => {
    res.render('input_phoneNumber');
});
routes.get('/enter-otp', (req, res) => {
    const phoneNumber = req.query.phoneNumber;
    const email = req.query.email;
    res.render('enter_otp', { phoneNumber, email });
});
routes.get('/password-change', (req, res) => {
    const phoneNumber = req.query.phoneNumber;
    const email = req.query.email;
    res.render('passwordChange', { phoneNumber, email });
});
routes.get('/profile', async (req, res)=>{
    console.log(req.session);
    if (req.session.cookie._expires !== null) {
        
        const user = await login.getUser(req.session.user);
        const phoneNumber = user.phoneNumber;
        const name = user.firstName + " " + user.lastName;
        const email = user.email;
        res.render('user_profile', { name,email,phoneNumber });
    }
    else {
        res.status(404).send('No User Found');
    }
})
routes.get('/inboxMailHtml/:id', async(req, res) => {
    
    if (req.session.cookie._expires !== null) {
        const user = await login.getUser(req.session.user);
        const name = user.firstName + " " + user.lastName;
        const id = req.params.id;
        res.render('inboxMail', { id,name });
    }
    else {
        res.status(404).send('No User Found');
    }
});
routes.get('/compose', (req, res) => {
    res.render('compose');
});
routes.get('/sent', async (req, res) => {
    if (req.session.cookie._expires !== null) {
        const user = await login.getUser(req.session.user);
        const name = user.firstName + " " + user.lastName;
        res.render('sent', { name });
    }
    else {
        res.status(404).send('No User Found');
    }
});
routes.get('/home', async (req, res) => {
    console.log(req.session);
    if (req.session.cookie._expires !== null) {
        const user = await login.getUser(req.session.user);
        const name = user.firstName + " " + user.lastName;
        res.render('index', { name });
    }
    else {
        res.status(404).send('No User Found2');
    }
});
routes.post('/password-update', login.updatePassword);
routes.get('/otp-verifection', login.otpVerifection);
routes.post('/verifyPhoneNumber', login.verifyPhoneNumber);
routes.get('/logout', login.logout);
routes.post('/login', login.conformDetails);
routes.post('/sign', login.postDetails);
routes.get('/inbox', dto.getInbox);
routes.get('/getSentMails', dto.getAllSentMailDto);
routes.get('/inboxMail/:id', dto.getMailById);
routes.post('/composeMail', dto.composeMail);

export default routes