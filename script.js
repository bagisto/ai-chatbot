const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#submit-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
let chatIframeContainer = null;

window.setTimeout(function () {
  chatIframeContainer = parent.document.getElementById(
    "chatbot-iframe-container"
  );
}, 1000);

let userText = null;
const API_KEY = "API_KEY"; // Paste your API key here

// Load saved chats and theme from local storage and apply/add them to the page
const loadDataFromLocalstorage = () => {
  // Default text to display when no saved chats exist
  const defaultText = `<div class="default-text">
                            <h1>ChatBot</h1>
                            <p>Start a conversation and explore the power of AI.<br> Your chat history will be displayed here.</p>
                        </div>`;

  // Load chat history from local storage or use default text if no saved chats exist
  chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
};

// Create a new chat element with specified content and class
const createChatElement = (content, className) => {
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat", className);
  chatDiv.innerHTML = content;
  return chatDiv; // Return the created chat div
};

// Fetch a chat response from the API and display it in the chat interface
const getChatResponse = async (incomingChatDiv, item = true) => {
  await fetchChat(userText, incomingChatDiv);
};

const copyResponse = (copyBtn) => {
  // Copy the text content of the response to the openclipboard
  const reponseTextElement = copyBtn.parentElement.querySelector("p");
  navigator.clipboard.writeText(reponseTextElement.textContent);
  copyBtn.textContent = "done";
  setTimeout(() => (copyBtn.textContent = "content_copy"), 1000);
};

const showTypingAnimation = () => {
  // Display the typing animation and call the getChatResponse function
  const html = `<div class="chat-content">
                    <div class="chat-details">
                    <i class="fa-solid fa-headset icon-chat"></i>                        
                    <div class="typing-animation">
                            <div class="typing-dot" style="--delay: 0.2s"></div>
                            <div class="typing-dot" style="--delay: 0.3s"></div>
                            <div class="typing-dot" style="--delay: 0.4s"></div>
                        </div>
                    </div>
                    <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
                </div>`;
  // Create an incoming chat div with typing animation and append it to chat container
  const incomingChatDiv = createChatElement(html, "incoming");
  chatContainer.appendChild(incomingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
  getChatResponse(incomingChatDiv, false);
};

const handleOutgoingChat = () => {
  userText = chatInput.value.trim(); // Get chatInput value and remove extra spaces
  if (!userText) return; // If chatInput is empty return from here
  // Clear the input field and reset its height
  chatInput.value = "";
  chatInput.style.height = `${initialInputHeight}px`;
  const html = `<div class="chat-content">
                    <div class="chat-details">
                    <i class="fa-solid fa-user icon-chat"></i>
                        <p>${userText}</p>
                    </div>
                </div>`;

  // Create an outgoing chat div with user's message and append it to chat container
  const outgoingChatDiv = createChatElement(html, "outgoing");
  chatContainer.querySelector(".default-text")?.remove();
  chatContainer.appendChild(outgoingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
  setTimeout(showTypingAnimation, 500);
};

const initialInputHeight = chatInput.scrollHeight;
chatInput.addEventListener("input", () => {
  // Adjust the height of the input field dynamically based on its content
  chatInput.style.height = `${initialInputHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If the Enter key is pressed without Shift and the window width is larger
  // than 800 pixels, handle the outgoing chat
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleOutgoingChat();
  }
});

// loadDataFromLocalstorage();
// sendButton.addEventListener("click", handleOutgoingChat);
function openForm() {
  const form = document.getElementById("chat-popup");
  form.style.display = "block";
  if (chatIframeContainer) {
    chatIframeContainer.style.height = "100%";
    chatIframeContainer.style.width = "100%";
  }

  setTimeout(() => {
    chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom of the chat container
  }, 300);
}

function closeForm() {
  const form = document.getElementById("chat-popup");
  // Set opacity to 0 for fade-out effect
  form.style.display = "none";
  // form.style.animation = "shake 0.5s ease-in both;";
}

const isValidJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const fetchChat = async (userText, incomingChatDiv) => {
  const url = "https://ask.bagisto.com:5000/chat";
  const pElement = document.createElement("p");

  const timeStamp = Date.now();

  pElement.id = "chat-response-" + timeStamp; // Add id to pElement

  incomingChatDiv.querySelector(".chat-details").appendChild(pElement);

  const msgEle = document.getElementById("chat-response-" + timeStamp);
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      query: userText,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    // Your error is here!
    console.log(error);
  });
  const reader = response.body.getReader();

  incomingChatDiv.querySelector(".typing-animation").remove();
  let message = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    let response = new TextDecoder().decode(value) || "{}";

    response = response.replaceAll("____new_line____", "<br/>");

    let isFailed = false;

    if (response && isValidJson(response)) {
      const parsedResponse = JSON.parse(response);

      if (parsedResponse.status === "false") {
        isFailed = true;
        message =
          "I'm sorry, but I'm not sure what you're asking Could you provide more context or clarify your question? As a helpful eCommerce chatbot, I'll do my best to assist you";
      }
    }

    let thisResponse = response;
    if (
      !isFailed &&
      response &&
      !response.includes('"document_cache"') &&
      !response.includes('"history"') &&
      !response.includes("Human:") &&
      !response.includes("AI:")
    ) {
      thisResponse = thisResponse.replaceAll("\n", "<br>");
      thisResponse = thisResponse.replaceAll("\n\n", "<br>");
      message += thisResponse;
    } else {
      console.warn("while not in true cond ==> ", {
        response,
      });
      break;
    }
    if (message) {
      console.warn(message);

      // msgEle.innerHTML = message;
      if (msgEle) {
        setTimeout(() => {
          msgEle.insertAdjacentHTML("beforeend", thisResponse);
        }, 50);

        setTimeout(() => {
          chatContainer.scrollTo(0, chatContainer.scrollHeight);
        }, 100);
      }
    }
  }
  const parsedMessage = createMessage(message);
  msgEle.innerHTML = parsedMessage;
  setTimeout(() => {
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
  }, 100);

  // localStorage.setItem("all-chats", chatContainer.innerHTML);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

const isValidUrl = (str) => {
  let urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(str);
};

const createMessage = (message) => {
  let replacedStr = message.replaceAll("<br>", " <br> ") || "";

  replacedStr = replacedStr.split(" ");

  let parsedMsg = replacedStr
    ?.map((str) => {
      let dot = "";
      if (str.charAt(str.length - 1) === ".") {
        str = str.substring(0, str.length - 1);
        dot = ".";
      }
      if (isValidUrl(str)) {
        return `<a target="_blank" href="${str}">${str}</a>` + dot;
      }
      return str;
    })
    .join(" ");
  return parsedMsg;
};


chatInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
      event.preventDefault();
      sendButton.click();
  }
}, true);
