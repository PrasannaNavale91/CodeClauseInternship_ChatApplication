import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const socket = socketIOClient('http://localhost:3000');

  useEffect(() => {
    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [socket]);

  const handleSendMessage = () => {
    socket.emit('sendMessage', newMessage);
    setNewMessage('');
  };

  const handleJoinRoom = () => {
    socket.emit('joinRoom', room);
  };

  const handleLeaveRoom = () => {
    socket.emit('leaveRoom', room);
  };

  return (
    <div>
      <h1>Chat App</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="text"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Room"
      />
      <button onClick={handleJoinRoom}>Join Room</button>
      <button onClick={handleLeaveRoom}>Leave Room</button>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <span>{message.username}</span>: {message.message}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;