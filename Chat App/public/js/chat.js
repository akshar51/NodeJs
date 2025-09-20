const socket = io();

const form = document.getElementById("chatForm");
const input = document.getElementById("msg");
const messages = document.getElementById("messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chatMessage", { user, message: input.value });
    input.value = "";
  }
});

socket.on("chatMessage", (msg) => {
  const p = document.createElement("p");
  p.innerHTML = `<strong>${msg.sender}:</strong> ${msg.message}`;
  messages.appendChild(p);
  messages.scrollTop = messages.scrollHeight;
});
