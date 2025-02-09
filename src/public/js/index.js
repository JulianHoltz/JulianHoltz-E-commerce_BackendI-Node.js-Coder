const soket = io();
let user; //usuario identificado
let chatBox = document.getElementById('chatBox');//ref al input del chat

//Alert para identificar al usuario
Swal.fire({
    title: 'Identificate',
    input: 'text',
    text: 'Ingresa tu nombre para identificarte en el chat',
    inputValidator: (value) => {
        return !value && 'Necesitas escribir un nombre para continuar';
    },
    allowOutsideClick: false //no permite cerrar el alert con un click afuera de la ventana
}).then(result => {
    user = result.value; //asigna el usaurio identificado
    console.log(user);
});


//Listener para enviar mensajes al presionar Enter
chatBox.addEventListener('keyup', evt => {
    if(evt.key === 'Enter'){
        if(chatBox.value.trim().length > 0) { //condicional para revisar que el mensaje no este vacio
            Socket.emit('message', {user:user, message: chatBox.value}); //envio mensaje
        }
    }
});