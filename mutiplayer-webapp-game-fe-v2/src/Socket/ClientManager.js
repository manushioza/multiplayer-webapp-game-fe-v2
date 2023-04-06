const io = require("socket.io-client");
var URL = "http://localhost:8000";
var room_id = 0;

const socket = io(URL, {
  withCredentials: true,
});

const inititaize = () => {
  socket.on("connect", () => {
    console.log(socket.id);
  });
  return socket.connected;
};

const join = (session_id, player_id) => {
  console.log("Joining room...");
  socket.emit("join", { player_id, session_id });
  console.log("Joined room...");
};

const emit_score = (player_id, score) => {
  socket.emit("score", { player_id, score });
};

const get_score = (player_id) => {
  
  console.log("Attempting to get scores for: " + player_id);
  socket.on("sendScores", (arg) => {
    var score = 0;
    console.log(arg);
    if (player_id == 1) {
      score = arg.player1;
    } else {
      score = arg.player2;
    }
    console.log(score)
  return score;
  });
  
};

module.exports = { inititaize, join, emit_score, get_score, socket };
