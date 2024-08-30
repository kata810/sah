const express =require("express");
const dotenv=require("dotenv");
const db=require("./config/db");
const path=require("path");
const http=require("http")
const socketIO=require("socket.io");

const cookieParser=require("cookie-parser")
const redisClient=require("./config/redis")


const{newUser,removeUser} =require("./util/user")

dotenv.config()
//Routes
const viewRoutes=require("./routes/views");
const userRoutes=require("./routes/api/user");


const { emitWarning } = require("process");

const app=express()
const server= http.createServer(app);

db.connect((err)=>{
    if(err){
        console.log(err);
        process.exit(1);
    }
    console.log("Connected to MySql Database<3...")
})

app.use(cookieParser("secret"))
app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({extended: true}))




app.use("/", viewRoutes)
app.use("/api", userRoutes)



const io=socketIO(server);

/*io.on("connection", (socket) => {
socket.on('user-connected',(user,roomId=null)=>{
    if(roomId){
        //TODO: Join with room ID
    }else{
        newUser(socket.id,user);
    }




})

socket.on('send-total-rooms-and-users',()=>{
    redisClient.get('total-users',(err,reply)=>{
        if(err) throw err; 

        let totalUsers=0;
        let totalRooms=0;
        let numberOfRooms=[0,0,0,0];

        if(reply){
            totalUsers=parseInt(reply);
        }
        redisClient.get('total-rooms',(err,reply)=>{
            if(err) throw err;

            if(reply){
                totalRooms=parseInt(reply);
            }
            redisClient.get('number-of-rooms',(err,reply)=>{
                if(err) throw err;
    
                if(reply){
                    numberOfRooms=JSON.parse(reply);
                }
    
                socket.emit('receive-number-of-rooms-and-users',numberOfRooms,totalRooms,totalUsers);
        })
        })
    })
})
socket.on("disconnect",()=>{
    let socketId=socket.id;

    redisClient.get(socketId,(err,reply)=>{
        if(err) throw err;
        if(reply){
            let user=JSON.parse(reply);

            if(user.room){
                //TODO: Remove user's room and also remove user from the room
            }
        }
    })
    removeUser(socketId);
})
});*/

io.on("connection", (socket) => {
    socket.on('user-connected', async (user, roomId = null) => {
        if (roomId) {
            // TODO: Join with room ID
        } else {
            await newUser(socket.id, user);
        }
    });

    socket.on('send-total-rooms-and-users', async () => {
        try {
            console.log('Fetching total-users from Redis');
            const totalUsersReply = await redisClient.get('total-users');
            const totalUsers = totalUsersReply ? parseInt(totalUsersReply) : 0;

            console.log('Fetching total-rooms from Redis');
            const totalRoomsReply = await redisClient.get('total-rooms');
            const totalRooms = totalRoomsReply ? parseInt(totalRoomsReply) : 0;

            console.log('Fetching number-of-rooms from Redis');
            const numberOfRoomsReply = await redisClient.get('number-of-rooms');
            const numberOfRooms = numberOfRoomsReply ? JSON.parse(numberOfRoomsReply) : [0, 0, 0, 0];

            socket.emit('receive-number-of-rooms-and-users', numberOfRooms, totalRooms, totalUsers);
        } catch (err) {
            console.error('Error fetching data from Redis:', err);
        }
    });

socket.on("send-message",(message,user,roomId=null)=>{
    if(roomId){
        socket.to(roomId).emit("receive-message",message,user);
    }else{
        socket.broadcast.emit("receive-message",message,user,true);
    }
})

    socket.on("disconnect", async () => {
        let socketId = socket.id;

        try {
            console.log('Fetching user data from Redis');
            const reply = await redisClient.get(socketId);

            if (reply) {
                let user = JSON.parse(reply);

                if (user.room) {
                    // TODO: Remove user's room and also remove user from the room
                }
            }

            await removeUser(socketId);
        } catch (err) {
            console.error('Error during disconnect:', err);
        }
    });
});

const PORT=process.env.PORT || 5000

server.listen(PORT, ()=> console.log(`Server started at http://localhost:${PORT}`))
