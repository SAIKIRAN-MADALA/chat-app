const express=require('express')
const path=require('path')
const http=require('http')
const socketio=require('socket.io')

const app=express()
const server=http.createServer(app)
const io=socketio(server)

const port=process.env.PORT||3000
const publicDirectoryPath= path.join(__dirname,'../public')


app.use(express.static(publicDirectoryPath))

// let count=0
let message="Welcome New User"

io.on('connection',(socket)=>{
    console.log('New User Connected')
    
    socket.emit('message','Weclome')
    socket.broadcast.emit('message','A new user has joined!')
    
    socket.on('sendMessage',(message)=>{      
        io.emit('message',message)
    })
    socket.on('sendLocation',(coords)=>{
        io.emit('message',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })
    socket.on('disconnect',()=>{
        io.emit('message','A user has left!')
    })

})

server.listen(port,()=>{
    console.log('='.repeat(50))
       console.log(`server has started on port ${port}!`)
    console.log('='.repeat(50))
})