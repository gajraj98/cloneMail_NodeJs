import DbClient from "../CommanFiles/DbClient.js";

export default class User extends DbClient{
    static async conformDetails(email,password){
        try{
           const session = DbClient.session.collection('user');
            // console.log(email);
            const details = {
                email:email,
                password:password
            }
            // await session.insertOne(details);
            const user = await session.findOne({email:email.toString()});
            return user;
        }
        catch(e){
            return e.message;
        }
    }
    static async addDetails(email,password,phoneNumber){
        try{
            console.log(email);
               const session = DbClient.session.collection('user');
               const user = await session.findOne({email:email.toString()});
               if(user){
               throw new Error('user alredy exist');
               }
               const details = {
                email: email,
                password: password,
                phoneNumber: phoneNumber
               }

               await session.insertOne(details);
               return "user added succesfully";
        }
        catch(e){
            return console.error(e.message);
        }
    }
    static async verifyPhoneNumber(phoneNumber){
        try{
            console.log('stage11');
            const session = DbClient.session.collection('user');
            console.log(phoneNumber);
            const user = await session.findOne({ phoneNumber: phoneNumber.toString() });
            console.log('stage12');
            // console.log(user);
            return user;
        }
        catch(e){
            console.log(e.message);
            return e.message;
        }
    }
    static async otpVerifection(phoneNumber){   
        try{
             const session = DbClient.session.collection('otp');
             const otp = await session
             .find({ phoneNumber:  phoneNumber.toString() })
             .sort({ timestamp: -1 })
             .limit(1)
             .toArray();
             return otpRecord[0].otp;
        }
        catch(e){
            return e.message;
        }
    }
    static async saveOtp(phoneNumber,otp){
        try{
            console.log('stage30');
            const list = {
                phoneNumber:phoneNumber,
               otp:otp
            };
            console.log('stage31');
            const session = DbClient.session.collection('otp');
            await session.insertOne(list);
            console.log('stage34');
       }
       catch(e){
           console.log(e.message);
           return {Error:e.message};
       }
    }
}