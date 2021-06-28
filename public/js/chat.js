const socket=io()

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendlocationbutton = document.querySelector('#Send-Location')

socket.on('message',(message)=>{
    console.log(message)
})

document.querySelector("#message-form").addEventListener('submit',(e)=>{
    e.preventDefault()
    
    $messageFormButton.setAttribute('disabled','disabled')
    
    const message=e.target.elements.message.value
    
    socket.emit('sendMessage',message,(error)=>{
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value=''
        $messageFormInput.focus()

        if(error){
            return console.log(error);
        }
        console.log('The Message was Delivered',message)

    })
})

document.querySelector('#Send-Location').addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('GeoLocation not supported by your browser')
    }

    $sendlocationbutton.setAttribute('disableLocation','disabled')
    
    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('sendLocation',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        },()=>{
            $sendlocationbutton.removeAttribute('disableLocation')
            console.log("Location Shared");
        })  
    })
    
})