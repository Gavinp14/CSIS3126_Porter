import React from 'react'
import "./message.css"

function Message({ message, timestamp, isSender }) {
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return '';
      
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      console.error("Error formatting timestamp:", e);
      return '';
    }
  };

  return (
    <div className={`message-bubble ${isSender ? 'sent' : 'received'}`}>
      <div className="message-content">{message}</div>
      {timestamp && <div className="message-timestamp">{formatTimestamp(timestamp)}</div>}
    </div>
  )
}

export default Message
