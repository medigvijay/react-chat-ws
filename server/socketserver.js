const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3030 });
var connList = [];
var sockList = [];


const messageList = [
	"Hello there",
	"Ho can I help you",
	"Are you there",
	"I think you are busy",
	"I am ready to help",
	"Let me think",
	"Let me find a solution for you",
	"Here is your solution",
	"Hi again!!!",
	"Welcome back!!!",
	"That's a good question",
	"I can't help you on this one",
	"I am running on Nodejs",
	"What is your technology stack",
	"I sense you are using ReactJS",
	"Did you know that we both are communicating over websockets?",
	"Here is my template response",
	"I am designed to use machine learning",
	"I am very fast",
	"Did you know React uses virtual DOM to make things fast?",
	"Do you want to hear a joke?"
];

wss.on('connection', function connection(ws) {
	//console.log(ws);
  ws.on('message', function incoming(message) {
  	message = JSON.parse(message);
    console.log('received: %s', message);
    //setTimeout(() => {ws.send(messageList[Math.floor(Math.random() * messageList.length)])}, 500)
    if(message.mtype !== "conn_update") {
    	wss.clients.forEach(function(client) {
	    	if(client != ws && client.readyState === WebSocket.OPEN) {
	    		client.send(JSON.stringify(message));
	    	}
	    })
    } else {
    	handleNewClient(message);
    	wss.clients.forEach(function(client) {
	    	if(client.readyState === WebSocket.OPEN) {
	    		client.send(JSON.stringify({mtype: message.mtype, userList: connList}));
	    	}
	    });
    }
  });

  ws.on('close', function close() {

	sockList.forEach(function(client, index) {
		  	//console.log(client, ws, index)
    	if(client == ws) {
    		sockList.splice(index, 1);
    		connList.splice(index, 1);
    	}
    });
    wss.clients.forEach(function(client) {
    	if(client.readyState === WebSocket.OPEN) {
    		client.send(JSON.stringify({mtype: "conn_update", userList: connList}));
    	}
    });
  });
  sockList.push(ws);
});


function handleNewClient(message) {
	connList = [...connList, {username: message.username}];
	//console.log(connList);
}