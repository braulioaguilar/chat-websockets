import React, { useState, useEffect } from 'react'

const Chat = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/ws');

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data)
      setMessages((prevMessage) => [...prevMessage, msg])
    }

    return () => {
      ws.close()
    }
  }, []);


  const sendMessage = () => {
    const ws = new WebSocket('ws://localhost:8080/ws');
    const msg = {
      username: username,
      message: message
    };

    ws.onopen = () => {
      ws.send(JSON.stringify(msg))
    };
    setMessage('')
  }

  return (
    <div>
      <h1>Chat</h1>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}</strong>: {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;