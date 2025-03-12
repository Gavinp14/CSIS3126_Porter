import React, { useState, useEffect } from "react";
import Message from "../Message/Message";
import "./messagetable.css";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

function MessageTable() {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const { getUserId, getToken } = useAuth();
  const userId = getUserId();
  const token = getToken();

  // Fetch trainers when component mounts
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/v1/trainermessages/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setTrainers(response.data.trainers || []);
      } catch (error) {
        console.error("Error fetching trainers:", error);
        // Fallback data for testing
        setTrainers([
          { trainer_id: 1, first_name: "John", last_name: "Doe" },
          { trainer_id: 2, first_name: "Jane", last_name: "Smith" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, [userId, token]);

  // Handle trainer selection
  const handleTrainerClick = (trainer) => {
    console.log("Selected trainer:", trainer);
    setSelectedTrainer(trainer);
    
    // Fetch messages for this trainer
    if (userId && trainer.trainer_id) {
      fetchMessages(userId, trainer.trainer_id);
    }
  };

  // Fetch messages between user and trainer
  const fetchMessages = async (userId, trainerId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/v1/messages/thread/${userId}/${trainerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    }
  };

  // Handle sending a new message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedTrainer) return;

    try {
      await axios.post(
        "http://127.0.0.1:5000/api/v1/messages",
        {
          sender_id: userId,
          receiver_id: selectedTrainer.trainer_id,
          message_text: newMessage
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      // Clear the input and refresh messages
      setNewMessage("");
      fetchMessages(userId, selectedTrainer.trainer_id);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid message-container">
      <div className="row h-100">
        {/* Contacts sidebar - col-sm-4 */}
        <div className="col-sm-4 contacts-sidebar">
          <h2 className="sidebar-title">My Contacts</h2>
          <div className="trainers-list">
            {trainers.map((trainer) => (
              <div
                key={trainer.trainer_id || Math.random()}
                className={`trainer-item ${selectedTrainer?.trainer_id === trainer.trainer_id ? 'active' : ''}`}
                onClick={() => handleTrainerClick(trainer)}
              >
                {trainer.first_name} {trainer.last_name}
              </div>
            ))}
          </div>
        </div>
        
        {/* Messages section - col-sm-8 */}
        <div className="col-sm-8 messages-section">
          {selectedTrainer ? (
            <>
              <h3 className="conversation-title">
                Conversation with {selectedTrainer.first_name} {selectedTrainer.last_name}
              </h3>
              <div className="conversation-container">
                {messages.length > 0 ? (
                  messages.map((msg) => (
                    <Message 
                      key={msg.id || Math.random()}
                      message={msg.message_text || msg.message}
                      timestamp={msg.timestamp}
                      isSender={msg.sender_id === userId} 
                    />
                  ))
                ) : (
                  <p className="no-messages">No messages yet. Start a conversation!</p>
                )}
              </div>
              <div className="message-input-container">
                <form onSubmit={handleSubmit}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={`Message to ${selectedTrainer.first_name}...`}
                    />
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <p>Select a contact to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageTable;