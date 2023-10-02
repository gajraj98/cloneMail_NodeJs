import mongodb from 'mongodb';
const objectId = mongodb.ObjectId;
let session;
export default class Dao{
    static async injectDb(conn){
         if(session){
            return;
         }
         try{
            session = await conn.db('mailBox').collection('mail');
         }
         catch(e){
            console.log("error in indexDao" + e.message);
         }
    }
    static async getInbox(){
        try{
            const mails = await session.find({});
            return mails.toArray();
        }
        catch(e){
            return e.message
        }
    }
    static async getMailById(id){
        try{
           
           const mail = await session.findOne({_id:new objectId(id)});
           
            return mail;
        
        }
        catch(e){
         res.status(500).send("error in indexDao" + e.message)
     } 
    }
    static async composeMail(user,to,subject,mailContent){
        try{
             const list = {
                user:user,
                to:to,
                subject:subject,
                mailContent:mailContent
             };
           return  await session.insertOne(list)
        }
        catch(e){
            console.log(e.message);
            return {Error:e.message};
        }
    }

}