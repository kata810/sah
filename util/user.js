/*const redisClient=require("../config/redis")



const newUser=(socketId,user,roomId=null)=>{
if(roomId){
    user.room=roomId;

}
redisClient.set(socketId, JSON.stringify(user));

redisClient.get('total-users', (err,reply) =>{
    if(err) throw err;

    if(reply){
        let totalUsers=parseInt(reply);

        totalUsers+=1;

        redisClient.set('total-users', totalUsers+"");
    }else{
        redisClient.set('total-users', '1');
    }
})

}
const removeUser=(socketId) =>{
    redisClient.del(socketId);
    redisClient.get('total-users', (err,reply) =>{
        if(err) throw err;
    
        if(reply){
            let totalUsers=parseInt(reply);
    
            totalUsers-=1;
    if(totalUsers===0){
redisClient.del('total-users');
    }else{

        redisClient.set('total-users', totalUsers+ "");
    }
        }
    })
}

module.exports={newUser,removeUser}*/
const redisClient = require("../config/redis");

const newUser = async (socketId, user, roomId = null) => {
    if (roomId) {
        user.room = roomId;
    }

    await redisClient.set(socketId, JSON.stringify(user));  // Dodaj await

    try {
        const reply = await redisClient.get('total-users');  // Dodaj await

        let totalUsers = 1;

        if (reply) {
            totalUsers = parseInt(reply) + 1;
        }

        await redisClient.set('total-users', totalUsers + "");  // Dodaj await
    } catch (err) {
        console.error('Error interacting with Redis:', err);
        throw err;
    }
};

const removeUser = async (socketId) => {
    await redisClient.del(socketId);  // Dodaj await

    try {
        const reply = await redisClient.get('total-users');  // Dodaj await

        if (reply) {
            let totalUsers = parseInt(reply) - 1;

            if (totalUsers === 0) {
                await redisClient.del('total-users');  // Dodaj await
            } else {
                await redisClient.set('total-users', totalUsers + "");  // Dodaj await
            }
        }
    } catch (err) {
        console.error('Error interacting with Redis:', err);
        throw err;
    }
};

module.exports = { newUser, removeUser };