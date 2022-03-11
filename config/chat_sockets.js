module.exports.chatSockets=function(socketServer){
    let io=require('socket.io')(socketServer,{
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
          }
    });
   
    // receives a connection and emits back that the connection has been established
    io.sockets.on('connection',function(socket){
        console.log('new connection established',socket.id);
        

        socket.on('disconnect',function(){
            console.log('socket disconnected');
        });
        // .on detects the event emiited by the user
 socket.on('_join_room',function(data){
     console.log('joining request received',data);
 //user will be connected to the chat room if connection has been established
            socket.join(data.chatroom);
 //emitting the notification to other users that the new user has joined the chat room
            io.in(data.chatroom).emit('user_joined',data);
        })
    });
}