import mongodb from 'mongodb';
import DbClient from '../CommanFiles/DbClient.js';
const objectId = mongodb.ObjectId;
export default class Dao extends DbClient{
    static async getInbox(gmail){
        try{
            const session = DbClient.session.collection('mail'); // Assign to a local variable
            if (!session) {
                throw new Error("Database session is not initialized.");
            }
            const mails = await session.find({ to : gmail});
            return mails.toArray();
        }
        catch(e){
            return e.message
        }
    }
    static async getMailById(id){
        try{
            const session = DbClient.session.collection('mail');
           const mail = await session.findOne({_id:new objectId(id)});
           
            return mail;
        
        }
        catch(e){
         res.status(500).send("error in indexDao" + e.message)
     } 
    }
    static async composeMail(user,to,subject,mailContent,date,time){
        try{
             const list = {
                user:user,
                to:to,
                subject:subject,
                mailContent:mailContent,
                date:date,
                time:time
             };
             const session = DbClient.session.collection('mail');
           return  await session.insertOne(list)
        }
        catch(e){
            console.log(e.message);
            return {Error:e.message};
        }
    }
    static async getAllSentMailDao(gmail){
        try{
            const session = DbClient.session.collection('mail'); // Assign to a local variable
            if (!session) {
                throw new Error("Database session is not initialized.");
            }
            const mails = await session.find({ user : gmail});
            return mails.toArray();
        }
        catch(e){
            return e.message
        }
    }

}