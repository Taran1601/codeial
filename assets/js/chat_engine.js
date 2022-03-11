class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;
 

       // emitting a connect event
        this.socket=io.connect('http://localhost:5000',{
        withCredentials: true,
        extraHeaders: {
             "my-custom-header": "abcd"
  }
        });

        if(this.userEmail){
            this.connectionHandler();
        }
    }
    connectionHandler(){
        //ask for joining the chat room
        let self=this;
        this.socket.on('connect',function(){
            console.log('connection established using sockets..!!');
            self.socket.emit('_join_room',{
                user_email:self.userEmail,
                chatroom:'Codeial'
            });
            //detection of req is done using .on
            self.socket.on('user_joined',function(data){
                console.log('user joined',data);
            });
        });
        //CHANGE:: send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg=$('#chat-message-input').val();
            if(msg!=''){
self.socket.emit('send_message',{
    message:msg,
    user_email:self.userEmail,
    chatroom:'Codeial'
});
            }
        });
        //detect if the message is received
        self.socket.on('receive_message',function(data){
            console.log('message received',data.message);
            let newMessage=$('<li>');
            //let the message be coming from other user
            let messageType='other-message';
            if(data.user_email==self.userEmail){
                messageType='self-message';
            }
            newMessage.append($('<span>',{
                'html':data.message
            }));
            newMessage.append($('<sub>',{
                'html':data.user_email
            }));
            newMessage.addClass(messageType);
            $('#chat-messages-list').append(newMessage);
                });
    }
}