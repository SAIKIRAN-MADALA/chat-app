const socket=io()

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendlocationbutton = document.querySelector('#Send-Location')
const $messages=document.querySelector('#messages')

//Templates
const messageTemplate=  document.querySelector('#Message-Template').innerHTML
const locationMessageTemplate =  document.querySelector('#location-message-template').innerHTML

//Options
const {username,room}= Qs.parse(location.search,{ ignoreQueryPrefix:true})

socket.on('message',(message)=>{
    console.log(message)
    const html=Mustache.render(messageTemplate,{
        message:message.text,
        createdAt:moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
})

socket.on('locationMessage',(message)=>{
    console.log(message);
    const html=Mustache.    render(locationMessageTemplate,{
        url: message.url,
        createdAt:moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
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

socket.emit('join',{username,room})
