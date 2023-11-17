const connection = new WebSocket('ws://localhost:8000');
var userName = document.getElementById('currentUserEmail').value;
connection.onopen = function(){
    console.log('meet.js');
}

var name;
var connectedUser;
var myConn;
var local_video  = document.querySelector('#local-video');
var call_to_user  = document.querySelector('#email');
var call_btn  = document.querySelector('#call-btn');
var call_status = document.querySelector('.call-hang-status');
call_btn.addEventListener("click",function(){
     const userEmail = call_to_user.value;
     if(userEmail.length>0){
        connectedUser = userEmail;
        myConn.createOffer(function(offer){
            send({
                type:"offer",
                offer:offer
            });
            myConn.setLocalDescription(offer);
        },
        function(error){
            alert('Offer is not created');
        })
     }
     else{
        alert('enter user Email');
     }  
});

// in order to run in different browser
navigator.getUserMedia = navigator.getUserMedia || navigator.webKitGetUserMedia || mozGetUserMedia;

// ready state is take some time so we have to use settimeout

setTimeout(function(){
    if(connection.readyState===1){
        if(userName!==null){
            send({
                type:'online',
                name:userName
            })
        }
    }
    else{
        console.log('Problem in ready state');
    }
},3000);

function send(message){
    if(connectedUser){
        message.name = connectedUser;
    }
    connection.send(JSON.stringify(message));
}

connection.onmessage = function(msg){
    let data = JSON.parse(msg.data);
    switch(data.type){
        case 'online':
            onlineProcess(data.success);
        break;
        case "offer":
            call_status.innerHTML = '<div class="calling-status-wrap card black white-text"> <div class="user-image"> <img src="/images/user.png" class="caller-image circle" alt=""> </div> <div class="user-name">Unknown User</div> <div class="user-calling-status">Calling...</div> <div class="calling-action"> <div class="call-accept"><i class="material-icons green darken-2 white-text audio-icon">call</i></div> <div class="call-reject"><i class="material-icons red darken-3 white-text close-icon">close</i></div> </div> </div>'
            offerProcess(data.offer,data.name);
        break;
        case "answer":
            answerProcess(data.answer);
        break;
        case "candidate":
            candidateProcess(data.candidate);
    }

}

connection.onerror = function(error){
    console.log(error);
}

function onlineProcess(success){
    if(success){
        navigator.getUserMedia(
            {
                audio:true,
                video:true
            },
            // for local media straming
            function(myStrem){
                stream = myStrem;
                local_video.srcObject = stream;
        //   stun server for global ip
                let configuration = {
                    'iceServers': [
                        {"url":"stun:stun2.l.google.com:19302"}
                    ]
                }
            //   myConn help to treack streaming
                myConn = new webkitRTCPeerConnection(configuration,{
                    optional:[{
                        // to create channel
                        RtpDataChannels:true
                    }]
                });

                myConn.addStream(stream)
                myConn.onicecandidate = function(event){
                    if(event.candidate){
                        send({
                            type:'candidate',
                            candidate:event.candidate
                        })
                    }
                }
            },
            // for error 
            function(error){
                alert("can't access media");
            }
        );
    }
    else{
        alert('Something goes wrong in online process');
    }
}

function offerProcess(offer,name){
    connectedUser  = name;
    console.log(connectedUser);
    myConn.setRemoteDescription(new RTCSessionDescription(offer));

    myConn.createAnswer(function(answer){
        myConn.setLocalDescription(answer);
        send({
            type:'answer',
            answer:answer
        })
    },function(error){
        alert("Answer is not created");
    })
}
function answerProcess(answer){
    myConn.setRemoteDescription(RTCSessionDescription(answer));
}

function candidateProcess(candidate){
    myConn.addIceCandidate(new RTCIceCandidate(candidate));
}
