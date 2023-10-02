import { response } from 'express';
import dao from '../Dao/inboxDao.js'
export default class Dto{
    static async getInbox(req,res,next){
            try{
                const mails = await dao.getInbox()
                if(mails){
                    // console.log(mails);
                    res.send(mails);
                }
                else{
                    res.send("Empty")
                }
            }
            catch(e){
                res.status(500).send(e.message)
            } 
    }
    static async getMailById(req,res,next){
      //   console.log("stag:1");
      // const  data = [{ id:'1234',user: 'user1@gmail.com',subject:"Job offer", mail: 'mail1@example.com' }];
      //  res.send(data);
           try{
              const id = req.params.id;
              const mail = await dao.getMailById(id);
              if(mail){
                console.log(mail);
                console.log("stag 1");
                res.send(mail);
            }
            else{
                console.log("stag 2");
                res.send("No mail found");
            }
           }
           catch(e){
            console.log("stag 3");
            res.status(500).send(e.message)
        } 
    }
    static async composeMail(req,res,next){
      console.log('composeMail stage1');
      try{
           const user = req.body.user;
           const to = req.body.to;
           const subject = req.body.subject;
           const mailContent  = req.body.mailContent;
           const response = dao.composeMail(user,to,subject,mailContent);
           if(!response){
            res.send("Server Error");
           }
           else{
            res.send('Mail sent');
           }
      }
      catch(e){
        console.log(e.message);
        res.status(500).send('Error: ' + e.message);
      }
    }
}
