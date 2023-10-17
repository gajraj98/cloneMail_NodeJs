import DbClient from "../CommanFiles/DbClient.js";

export default class User extends DbClient{
    static async conformDetails(email){
        try{
           const session = DbClient.session.collection('user');
            // console.log(email);
            const details = {
                email:email,
                password:123
            }
            // await session.insertOne(details);
            const user = await session.findOne({email:email.toString()});
            return user;
        }
        catch(e){
            return e.message;
        }
    }
}