/**
 * Widget Embed iframe code
 * (also external domain)
 *
 */
(function () {
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
  // chat source (external url)
  chatFrame.src = "http://192.168.15.81/NextJs/chatbot";
  chatFrame.id = "chatbot-iframe";
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

  function handleMessage(event) {
    const message = event.data;
    if (message === "chatbot.formOpen") {
      chatContainer.style.height = "100%";
      chatContainer.style.width = "100%";
    } else if (message === "chatbot.formClose") {
      chatContainer.style.height = "96px";
      chatContainer.style.width = "96px";
    }
  }
})();
