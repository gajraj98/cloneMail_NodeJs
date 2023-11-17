import express from "express";
import bodyparser from 'body-parser';
import hbs from 'hbs';
import routes from './Controller/main.js';
import mongodb from 'mongodb';
import DbClient from './CommanFiles/DbClient.js';
import session from 'express-session';
import {v4 as uuidv4} from 'uuid';
import { WebSocketServer } from 'ws';
// const webSocketServer = new ws.Server;
const PORT = process.env.PORT || 3000;
const app = express()

const mongodbClient = mongodb.MongoClient;
const url = `mongodb+srv://gajrajnitin201:nfwhGAXYflThqCjw@cluster0.1n5wlfw.mongodb.net/?retryWrites=true&w=majority`


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:true
}))

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true,
    cookie: {
        maxAge: 3600000 // Session expires after 1 hour (in milliseconds)
    }
}));

app.use('/static',express.static("public"));
app.use('/inboxMailHtml/static',express.static("public"));
app.set('view engine','hbs')
app.set('views','views');
app.use('/',routes);
hbs.registerPartials("views/partials")


mongodbClient.connect(url,{
    maxPoolSize:50,
    wtimeoutMS: 2500,
    useNewUrlParser:true,
}).catch(e=>console.log("error in app.js"+e.message))
.then(async client=>{
    DbClient.injectDb(client);
    console.log('Db connected');
})  

app.listen(PORT,()=>{
    console.log('Application started')
})

// web socket server code

let users = {};
const wss = new  WebSocketServer({
    port:8000
});

wss.on('connection',function(conn){
    conn.on('message',function(message){
       let data;
       try{
          data = JSON.parse(message);
       }
       catch(e){
        console.log(e);
       }

       switch(data.type){
         case 'online':
            users[data.name] = conn;
            conn.name = data.name;
            sendTotherUsers(conn,{
                type:'online',
                success:true
            })
         break
         case 'offer':
            var connect = users[data.name];
            console.log(conn.name);
            if(connect!=null){
              conn.otherUser = data.name;
              sendTotherUsers(connect,{
                type:"offer",
                offer:data.offer,
                name:conn.name
              })
            }
        break;
        case "answer":
            var connect = users[data.name];
            if(connect!=null){
                conn.otherUser  = data.name;
                sendTotherUsers(connect,{
                    type:'answer',
                    answer:data.answer
                })
            }
        break;
        case "candidate":
            var connect = users[data.name];
            if(connect!=null){
                sendTotherUsers(connect,{
                    type:'candidate',
                    candidate:data.candidate
                })
            }
            break;
       }
    });
    conn.on('close',function(){
       console.log('connection close');
    });
})

function sendTotherUsers(connection,message){
    connection.send(JSON.stringify(message));
}