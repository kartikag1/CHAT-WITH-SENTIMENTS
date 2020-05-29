const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const name = prompt("What is your name?");
appendMessage("You joined");
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  const review = data.message;
  const options = {
    method: "POST",
    body: JSON.stringify({ review }),
    headers: new Headers({ "Content-Type": "application/json" }),
  };
  let face = "https://img.icons8.com/officel/80/000000/neutral-emoticon.png";
  fetch("http://localhost:4000/s-analyzer", options)
    .then((res) => res.json())
    .then(({ analysis }) => {
      if (analysis < 0) {
        face = "https://img.icons8.com/emoji/96/000000/angry-face.png";
        $("#face").attr("src", face);
        appendMessage(`${data.name}: ${data.message}`);
        var objDiv = document.getElementById("message-container");
        objDiv.scrollTop = objDiv.scrollHeight;
      }
      if (analysis === 0) {
        face = "https://img.icons8.com/officel/80/000000/neutral-emoticon.png";
        $("#face").attr("src", face);
        appendMessage(`${data.name}: ${data.message}`);
      }
      if (analysis > 0) {
        face = "https://img.icons8.com/color/96/000000/happy.png";
        $("#face").attr("src", face);
        appendMessage(`${data.name}: ${data.message}`);
        var objDiv = document.getElementById("message-container");
        objDiv.scrollTop = objDiv.scrollHeight;
      }
    })
    .catch((err) => {
      face = "https://img.icons8.com/officel/80/000000/neutral-emoticon.png";
      $("#face").attr("src", face);
      appendMessage(`${data.name}: ${data.message}`);
      var objDiv = document.getElementById("message-container");
      objDiv.scrollTop = objDiv.scrollHeight;
    });
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const review = message;
  const options = {
    method: "POST",
    body: JSON.stringify({ review }),
    headers: new Headers({ "Content-Type": "application/json" }),
  };
  let face = "https://img.icons8.com/officel/80/000000/neutral-emoticon.png";
  fetch("http://localhost:4000/s-analyzer", options)
    .then((res) => res.json())
    .then(({ analysis }) => {
      console.log(analysis);
      if (analysis < 0) {
        face = "https://img.icons8.com/emoji/96/000000/angry-face.png";
        $("#face").attr("src", face);
        appendMessage(`You: ${message}`);
        socket.emit("send-chat-message", message);
        var objDiv = document.getElementById("message-container");
        objDiv.scrollTop = objDiv.scrollHeight;
        messageInput.value = "";
      }
      if (analysis === 0) {
        face = "https://img.icons8.com/officel/80/000000/neutral-emoticon.png";
        $("#face").attr("src", face);
        appendMessage(`You: ${message}`);
        socket.emit("send-chat-message", message);
        var objDiv = document.getElementById("message-container");
        objDiv.scrollTop = objDiv.scrollHeight;
        messageInput.value = "";
      }
      if (analysis > 0) {
        face = "https://img.icons8.com/color/96/000000/happy.png";
        $("#face").attr("src", face);
        appendMessage(`You: ${message}`);
        socket.emit("send-chat-message", message);
        var objDiv = document.getElementById("message-container");
        objDiv.scrollTop = objDiv.scrollHeight;
        messageInput.value = "";
      }
    })
    .catch((err) => {
      face = "https://img.icons8.com/officel/80/000000/neutral-emoticon.png";
      appendMessage(`You: ${message}`);
      $("#face").attr("src", face);
      socket.emit("send-chat-message", message);
      var objDiv = document.getElementById("message-container");
      objDiv.scrollTop = objDiv.scrollHeight;
      messageInput.value = "";
    });
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

$("#message-input").keypress(() => {
  const review = document.getElementById("message-input").value;
  const options = {
    method: "POST",
    body: JSON.stringify({ review }),
    headers: new Headers({ "Content-Type": "application/json" }),
  };
  let face = "https://img.icons8.com/officel/80/000000/neutral-emoticon.png";
  fetch("http://localhost:4000/s-analyzer", options)
    .then((res) => res.json())
    .then(({ analysis }) => {
      if (analysis < 0) {
        face = "https://img.icons8.com/emoji/96/000000/angry-face.png";
        $("#face").attr("src", face);
      }
      if (analysis === 0) {
        face = "https://img.icons8.com/officel/80/000000/neutral-emoticon.png";
        $("#face").attr("src", face);
      }
      if (analysis > 0) {
        face = "https://img.icons8.com/color/96/000000/happy.png";
        $("#face").attr("src", face);
      }
    })
    .catch((err) => {
      face = "https://img.icons8.com/officel/80/000000/neutral-emoticon.png";
      $("#face").attr("src", face);
    });
});
