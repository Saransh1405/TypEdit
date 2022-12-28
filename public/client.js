const socket = io()

let name;
let textarea=document.querySelector('#textarea')
let messageArea=document.querySelector(".message__area")

do{
    name=prompt('Please Enter Your Name: ')
}while(!name)

var audio=new Audio('/Ting.mp3')

textarea.addEventListener('keyup',(e)=>{
    if(e.key=='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg={
        user: name,
        message:message.trim()
    }

    //append


    appendMessage(msg,'outgoing')
    textarea.value=''
    scrollToBottom()

    //send to server

    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let mainDiv=document.createElement('div')
    let className=type

    mainDiv.classList.add(className,'message')

    let markup=`<h4>${msg.user}</h4>
        <p>${msg.message}</p>
        `
       mainDiv.innerHTML=markup
       
       messageArea.appendChild(mainDiv)


       if(type=='incoming'){
            audio.play();
       }
}



const append =(name,type)=>{
    let mainDiv=document.createElement('div')
    let className=type

    mainDiv.classList.add(className,'message')

    let markup=`<p> ${name} joined </p>`;

       
    mainDiv.innerHTML=markup;
       
    messageArea.append(mainDiv)

    if(type=='incoming'){
        audio.play();
   }
}

const appendd =(name,type)=>{
    let mainDiv=document.createElement('div')
    let className=type

    mainDiv.classList.add(className,'message')

    let markup=`<p> ${name} left </p>`;

       
    mainDiv.innerHTML=markup;
       
    messageArea.append(mainDiv)

    if(type=='incoming'){
        audio.play();
   }
}

//recive

socket.emit('new-user-joined',name)

socket.on('user-joined',(msg) =>{
    append(msg,'incoming');
    scrollToBottom()
})

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})

socket.on('left',msg =>{
    appendd( msg,'incoming')
    scrollToBottom()
})


function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}