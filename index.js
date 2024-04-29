const express = require('express')
const { connectToMongoDB } = require('./src/config/dbConnection');
const router = require('./src/routes');
require('dotenv').config();
const {Server} = require('socket.io')
const { createServer } = require('http');
const cors = require('cors');

const app = express()
const port = process.env.PORT || 5000
connectToMongoDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use(router)

const server = new createServer(app)
const io = new Server(server , {
    cors: {
        origin: "*",
    }
})
 
io.on("connection" , (socket) => {
    console.log("user connected with Id : " , socket.id);
    socket.join("test-channel")
    callSocket()

})
server.listen(port, () => console.log(`Example app listening on port ${port}!`))

// Call this function to emit event
const callSocket = ()=>{
    io.emit("test-channel", "event called")
}