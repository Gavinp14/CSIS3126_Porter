import React, { useState } from 'react';
import Message from '../Message/Message';
import "./messageform.css"

function MessageForm({ trainerName, trainerId, userId, token, messages = [], onSendMessage }) {
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="container form-container">
      <h3 className="px-4 py-4 mt-3 text-center">Conversation with {trainerName}</h3>
      <div className="conversation-container">
        <div className="row">
          <div className="col-12">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <Message 
                  key={msg.id}
                  message={msg.message}
                  timestamp={msg.timestamp}
                  isSender={msg.sender_id === userId} 
                />
              ))
            ) : (
              <p className="text-center">No messages yet. Start a conversation!</p>
            )}
          </div>
        </div>
      </div>
      <div className="text-box-container">
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-row mt-3">
            <input
              type="text"
              className="form-control me-2"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message to ${trainerName}...`}
            />
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ height: 'calc(1.5em + .75rem + 2px)' }}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MessageForm;
