const joinBtn = document.getElementById("join-btn");// login button
const usernameField = document.getElementById("username-input");//username field
const formEle = document.getElementsByClassName("form-username")[0];//form ele
const chatRoomContainer = document.getElementsByClassName("chatroom-container")[0];//chats container
const messageInput = document.getElementById("message-input");//message field
const sendButton = document.getElementById("send-btn");//message send button

const messageContainer = document.getElementById('message-container');

let username = '';
let socket = io();


joinBtn.addEventListener("click", (event) => {
    event.preventDefault();
    username = usernameField.value;
    if (username !== '') {
        formEle.style.display = "none";
        chatRoomContainer.style.display = "block";
      
    }

})

sendButton.addEventListener("click", (event) => {
    event.preventDefault();

    let data = {
        id: socket.id,
        message: messageInput.value,
        username: username
    }

    socket.emit('chat message', data);
    appendMessage(data, 'SENT');//to append sent message in the chat(no need to send to server and append)
})

socket.on('chat message', data => {
    if (data.id !== socket.id) {
        appendMessage(data, 'RECIEVED');

    }
})

function appendMessage(data, type) {
    let msgDiv = document.createElement('div');
    msgDiv.innerText = data.message;
    msgDiv.className = "message";

    if (type === 'SENT') {
        msgDiv.classList.add("sent");
    }
    messageContainer.append(msgDiv);
    messageInput.value = "";
}