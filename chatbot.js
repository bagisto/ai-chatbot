
let container = document.createElement("div");
container.id = "chatbot-iframe-container";
let containerStyles = {
  border: "0px",
  "background-color": "transparent",
  "pointer-events": "none",
  "z-index": "2147483639",
  position: "fixed",
  bottom: "0px",
  width: "96px",
  height: "96px",
  overflow: "hidden",
  opacity: "1",
  "max-width": "26rem",
  right: "0px",
  "max-height": "42rem",
};
Object.assign(container.style, containerStyles);
let chatFrame = document.createElement("iframe");
chatFrame.src = `src/index.html`;
chatFrame.id = "chatbot-iframe";
chatFrame.setAttribute('allow', 'clipboard-write; clipboard-read;');
let styles = {
  "pointer-events": "all",
  background: "none",
  border: "0px",
  float: "none",
  position: "absolute",
  inset: "0px",
  width: "100%",
  height: "100%",
  margin: "0px",
  padding: "0px",
  "min-height": "0px",
};
Object.assign(chatFrame.style, styles);
container.appendChild(chatFrame);
document.querySelector("body").appendChild(container);
const chatContainer = document.getElementById("chatbot-iframe-container");
window.addEventListener("message", handleMessage, false);
window.addEventListener("message", copyToClipboard, false);
function handleMessage(event) {
  const message = event.data;
  if (message === "chatbot.formClose") {
    containerStyles.height = "966px";
    containerStyles.width = "446px";
  } else if (message === "chatbot.formOpen") {
    containerStyles.height = "96px";
    containerStyles.width = "96px";
  }
  Object.assign(container.style, containerStyles);
}
function copyToClipboard(event) {
  try {
    const message = event.data;
    if (message.hasOwnProperty('clipBoardData')) {
      const tempTextarea = document.createElement("textarea");
      tempTextarea.value = message.clipBoardData;
      document.body.appendChild(tempTextarea);
      tempTextarea.select();
      document.execCommand("copy");
      document.body.removeChild(tempTextarea);
    }
  } catch (error) {
    console.error('Failed to copy to clipboard: ', error?.message ?? error);
  }
}
if (window.chatbotConfig?.url) {
  setTimeout(() => {
    const chatFrame = document.getElementById("chatbot-iframe");
    chatFrame.contentWindow.postMessage(window.chatbotConfig, "*");
  }, 500);
}

