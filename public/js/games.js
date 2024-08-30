//DOM Elements

//const { Socket } = require("socket.io");
//const socket = io();

const gamesDivElement=document.getElementById("games");

const rankFilter=document.getElementById("filter");

const gameList=document.getElementById("game-list");

const noGameMessage=document.getElementById("no-games-message");

const createRoomBtn=document.getElementById("create-room")
const joinRoomBtn=document.getElementById("join-room")

const createRoomFormContainer=document.getElementById("create-room-form-container");

const createRoomForm=document.getElementById("create-room-form");

const roomId=document.getElementById("room-id");

const gameTime=document.getElementById("game-time")

const closeCreateRoomFormBtn=document.getElementById("close-create-form");

const addPassword=document.getElementById("add-password");

const passwordInputGroup=document.getElementById("password-input-group");

const roomPassword=document.getElementById("room-password");


const joinRoomFormContainer=document.getElementById("join-room-form-container");

const joinRoomForm=document.getElementById("join-room-form");

const roomPasswordJoin=document.getElementById("room-password-join")

const closeJoinRoomFormBtn=document.getElementById("close-join-form");


roomPassword.readOnly=true;

let user;

let gameId=null;

const intervals=[0, 15, 30,45,60]

const fetchUserCallback=(data)=>{   //funkcija se poziva nakon što se podaci o korisniku preuzmu sa servera
    user=data; //primaju se podaci o korisniku sa servera i dodelju se promenljivoj user
    socket.emit("user-connected",user) //serveru se šalje dogadjaj user-connected zajedno sa podacima o korisniku
    socket.emit('get-rooms',"all") //šalje se zahtev serveru da pošalje listu svih soba koje su dostupne

    gamesDivElement.classList.remove("hidden") 

    hideSpinner();


}

fetchData('/api/user-info', fetchUserCallback) //koristi se za preuzimanje podataka o korisniku sa servera. Prvi parametar je URL endpoint sa kojeg se preuzimaju podaci o korisniku. 

//fetchUserCallback je callback funkcija koja se poziva kada se podaci uspešno preuzmu
