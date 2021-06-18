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

let count=0

io.on('connection',(socket)=>{
    console.log('New Websocket Connection')
    count=count+1
    socket.emit('countUpdated',count)
    socket.on('increment',()=>{
        
    })
})

server.listen(port,()=>{
    console.log('='.repeat(50))
       console.log(`server has started on port ${port}!`)
    console.log('='.repeat(50))
})