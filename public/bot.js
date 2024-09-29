function sendMessage() {
  const inputValue = input.value.trim();
  if (inputValue === "") return;

  appendMessage("You: " + inputValue, "human");

  fetch("/assistance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: inputValue }),
  })
    .then((response) => response.json())
    .then((data) => {
      appendMessage("AI: " + data.text, "ai");
    })
    .catch((error) => {
      console.error("Error:", error);
      appendMessage("Error fetching response.");
    });

  input.value = "";
}
const input = document.getElementById("userInput");
const sendMsg = document.getElementById("enterIcon");
const chatMessage = document.getElementById("chat-messages");

sendMsg.addEventListener("click", (e) => {
  inputValue = input.value;
  // console.log(inputValue);
  sendMessage();
});

// function sendMessage() {
//   const inputValue = input.value.trim();
//   if (inputValue === "") return;

//   appendMessage("You: " + inputValue, "human");

//   fetch("/assistance", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ message: inputValue }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       appendMessage("AI: " + data.text, "ai");
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       appendMessage("Error fetching response.");
//     });

//   input.value = "";
// }

function appendMessage(message, type) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message-element");
  messageElement.classList.add(type);
  messageElement.textContent = message;
  chatMessage.appendChild(messageElement);
  chatMessage.scrollTop = chatMessage.scrollHeight;
}

const Bot = document.querySelector(".ai-bot");
const displayChatBox = document.getElementById("bot-img");
displayChatBox.addEventListener("click", (e) => {
  if (Bot.style.display == "none") {
    Bot.style.display = "block";
  } else {
    Bot.style.display = "none";
  }
});
