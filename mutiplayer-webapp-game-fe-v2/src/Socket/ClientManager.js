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

const emit_score_game1 = (player_id, score) => {
  socket.emit("scoreGame1", { player_id, score });
};

const get_score_game1 = (player_id) => {
  console.log("Attempting to get scores for: " + player_id);

  return new Promise(function (resolve, reject) {
    socket.on("sendScoresGame1", (arg) => {
      var score = 0;
      console.log(arg);
      if (player_id == 1) {
        score = arg.player1;
      } else {
        score = arg.player2;
      }
      resolve(score);
    });
  });
};

const emit_score_game2 = (player_id, score) => {
  socket.emit("scoreGame2", { player_id, score });
};

const get_score_game2 = (player_id) => {
  console.log("Attempting to get scores for: " + player_id);

  return new Promise(function (resolve, reject) {
    socket.on("sendScoresGame2", (arg) => {
      var score = 0;
      console.log(arg);
      if (player_id == 1) {
        score = arg.player1;
      } else {
        score = arg.player2;
      }
      resolve(score);
    });
  });
};

const emit_score_game3 = (player_id, score) => {
  socket.emit("scoreGame3", { player_id, score });
};

const get_score_game3 = (player_id) => {
  console.log("Attempting to get scores for: " + player_id);

  return new Promise(function (resolve, reject) {
    socket.on("sendScoresGame3", (arg) => {
      var score = 0;
      console.log(arg);
      if (player_id == 1) {
        score = arg.player1;
      } else {
        score = arg.player2;
      }
      resolve(score);
    });
  });
};

const emit_score_game4 = (player_id, score) => {
  socket.emit("scoreGame4", { player_id, score });
};

const get_score_game4 = (player_id) => {
  console.log("Attempting to get scores for: " + player_id);

  return new Promise(function (resolve, reject) {
    socket.on("sendScoresGame4", (arg) => {
      var score = 0;
      console.log(arg);
      if (player_id == 1) {
        score = arg.player1;
      } else {
        score = arg.player2;
      }
      resolve(score);
    });
  });
};


module.exports = { inititaize, join, emit_score_game1, get_score_game1, emit_score_game2, get_score_game2, emit_score_game3, get_score_game3, emit_score_game4, get_score_game4, socket };
