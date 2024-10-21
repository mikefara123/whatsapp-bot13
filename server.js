const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Health check route
app.get('/', (req, res) => {
    res.send('WhatsApp bot is running!');
});

app.post('/webhook', (req, res) => {
    const message = req.body.messages[0];
    const fromUser = message.from;  // The user who sent the message
    const text = message.text.body; // The content of the message
    const groupId = message.chatId; // The group chat id
    
    // Check if the message is from the specific user and group
    if (fromUser === 'specificUserID' && groupId === 'yourGroupChatID') {
        if (text === 'specific message') {
            sendReply(groupId, 'Your automated reply here');
        }
    }
    res.sendStatus(200);
});

function sendReply(chatId, message) {
    // Send the message to the group using WhatsApp Business API
    const axios = require('axios');
    const token = 'your-whatsapp-api-token';
    
    axios.post('https://graph.facebook.com/v13.0/423446030853250/messages', {
        messaging_product: 'whatsapp',
        to: chatId,
        text: { body: message }
    }, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('Message sent:', response.data);
    }).catch(error => {
        console.error('Error sending message:', error.response.data);
    });
}

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
