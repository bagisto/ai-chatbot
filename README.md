# AI ChatBot for Bagisto ( v2 )

AI Based Chatbot for Bagisto DOCS. Ask anything regarding Bagisto and get instant response.

## Installation

Add URL to window object in your HTML file.

```html
<script>
  window.chatbotConfig = {
      url: "chat-bot-url",
      logoUrl: "logo-url",
      appName:'chat-bot title',
      imageAlt:'logo alt title',
      chatBotIcon:'chat bot icon',
      welcomeNote:'welcome message'
    };
</script>
```
### window.chatbotConfig
1.  Chat Bot Endpoint (chat-bot-endpoint - *Required): An interactive chat bot accessible via the provided endpoint URL.

2. Logo URL (chat-bot-log-url - *Optional): Includes the URL to your chat bot’s logo or icon.

3. App Name (chat-bot-name - *Optional): Specifies the name of your chat bot application.

4. Image Alt Text (chat-bot-image-alt - *Optional): A brief alt text for the chat bot image.

5. Admin Icon (admin-icon - *Optional): Describes the purpose of the admin icon.

6. Welcome Note (welcome-note - *Optional): Provides a friendly welcome message for users.


Add Chatbot widget to your HTML file.

```html
<script
  type="text/javascript"
  async
  src="https://github.com/VikasTiwari-Webkul/ai-chatbot/blob/v2-exported/chatbot.js"
></script>
```

See Demo: [AI ChatBot for Bagisto](https://vikastiwari-webkul.github.io/ai-chatbot/demo.html)
