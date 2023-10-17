import dao from '../Dao/userDao.js'




export default class User{
    static async conformDetails(req, res, next) {
        try {
            const email = req.body.email;
            const user = await dao.conformDetails(email);
            if (req.body.email === user.email) {
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
    
}