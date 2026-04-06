const API_CHAT_URL = 'https://fluid-python.onrender.com/api/chat';

function createChatbot() {
    const widget = document.createElement('div');
    widget.innerHTML = `
    <div id="chat-toggle" onclick="toggleChat()" title="Ask AI Assistant">💬</div>
    <div id="chat-window">
        <div id="chat-header">
            <span>Fluid AI Assistant</span>
            <button onclick="toggleChat()">✕</button>
        </div>
        <div id="chat-messages"></div>
        <div id="chat-input-area">
            <input id="chat-input" type="text" placeholder="Ask about fluid dynamics..." onkeydown="if(event.key==='Enter') sendChat()" />
            <button onclick="sendChat()">Send</button>
        </div>
    </div>`;
    document.body.appendChild(widget);
    appendMessage('bot', 'Hi! Ask me anything about fluid dynamics or your simulation results.');
}

function toggleChat() {
    const win = document.getElementById('chat-window');
    win.style.display = win.style.display === 'flex' ? 'none' : 'flex';
}

function appendMessage(role, text) {
    const messages = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `chat-msg ${role}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

async function sendChat() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;
    input.value = '';
    appendMessage('user', message);
    appendMessage('bot', 'Thinking...');

    try {
        const res = await fetch(API_CHAT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        const data = await res.json();
        const messages = document.getElementById('chat-messages');
        messages.lastChild.textContent = data.reply || data.error;
    } catch {
        document.getElementById('chat-messages').lastChild.textContent = 'Error connecting to server.';
    }
}

document.addEventListener('DOMContentLoaded', createChatbot);
