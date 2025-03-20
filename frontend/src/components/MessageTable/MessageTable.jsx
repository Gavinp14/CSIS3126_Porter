import React, { useState, useEffect } from "react";
import Message from "../Message/Message";
import "./messagetable.css";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { ErrorDialog, SuccessDialog } from '../dialogs';

function MessageTable() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [userType, setUserType] = useState('client'); // Default to client
  
  const { getUserId, getToken } = useAuth();
  const userId = getUserId();
  const token = getToken();

  // Note: Since getUserRole is not available, just use client mode
  // Later you can update the AuthContext to include getUserRole
  
  // Fetch trainers when component mounts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Try to determine if user is a trainer by checking localStorage
        const userType = localStorage.getItem('registertype') || 'client';
        const isTrainer = userType === 'trainer';
        
        console.log(`User appears to be a ${isTrainer ? 'trainer' : 'client'}`);
        
        // Use the appropriate endpoint based on user type
        const endpoint = isTrainer
          ? `http://127.0.0.1:5000/api/v1/clientmessages/${userId}`
          : `http://127.0.0.1:5000/api/v1/trainermessages/${userId}`;
        
        console.log(`Fetching contacts from: ${endpoint}`);
        
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        
        console.log("Response data:", response.data);
        
        // Set the appropriate contacts based on user type
        if (isTrainer) {
          setContacts(response.data.clients || []);
        } else {
          setContacts(response.data.trainers || []);
        }
        
        // Store the user type for later use in the component
        setUserType(isTrainer ? 'trainer' : 'client');
        
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setContacts([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId && token) {
      fetchContacts();
    } else {
      setLoading(false);
    }
  }, [userId, token]);

  // Handle trainer selection
  const handleContactClick = (contact) => {
    console.log("Selected trainer:", contact);
    setSelectedContact(contact);
    
    // Fetch messages for the selected trainer
    if (userId && contact.trainer_id) {
      fetchMessages(userId, contact.trainer_id);
    }
  };

  // Fetch messages between user and trainer
  const fetchMessages = async (userId, trainerId) => {
    setLoadingMessages(true);
    try {
      console.log(`Fetching messages between ${userId} and ${trainerId}`);
      const response = await axios.get(
        `http://127.0.0.1:5000/api/v1/messages/thread/${userId}/${trainerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Messages response:", response.data);
      
      // Ensure we're using the correct messages data from the response
      const messagesData = response.data.messages || [];
      console.log("Parsed messages:", messagesData);
      
      setMessages(messagesData);
    } catch (error) {
      console.error("Error fetching messages:", error);
      console.error("Error details:", error.response || error.message);
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Send a message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    try {
      console.log("Sending message:", {
        sender_id: userId,
        receiver_id: selectedContact.trainer_id,
        message_text: newMessage
      });
      
      await axios.post(
        "http://127.0.0.1:5000/api/v1/messages",
        {
          sender_id: userId,
          receiver_id: selectedContact.trainer_id,
          message_text: newMessage
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      // Clear input and refresh messages
      setNewMessage("");
      fetchMessages(userId, selectedContact.trainer_id);
      
    } catch (error) {
      console.error("Error sending message:", error);
      console.error("Error details:", error.response || error.message);
    }
  };

  const handleAssignTrainer = async () => {
    if (!selectedContact) return;
    
    try {
      await axios.post(
        `http://127.0.0.1:5000/api/v1/trainer_clients/${userId}`,
        {
          trainer_id: selectedContact.trainer_id,
          client_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Show success message
      SuccessDialog("Trainer assigned successfully!");
    } catch (error) {
      ErrorDialog("Error assigning trainer:", error);
    }
  };

  if (loading) {
    return <div className="loading-indicator">Loading contacts...</div>;
  }

  return (
    <div className="container-fluid message-container">
      <div className="row h-100">
        {/* Contacts sidebar */}
        <div className="col-sm-4 contacts-sidebar">
          <h2 className="sidebar-title">My Trainers</h2>
          <div className="contacts-list">
            {contacts.length > 0 ? (
              contacts.map((trainer) => (
                <div
                  key={trainer.trainer_id}
                  className={`contact-item ${selectedContact?.trainer_id === trainer.trainer_id ? 'active' : ''}`}
                  onClick={() => handleContactClick(trainer)}
                >
                  {trainer.first_name} {trainer.last_name}
                </div>
              ))
            ) : (
              <p className="no-contacts">No trainers found.</p>
            )}
          </div>
        </div>
        
        {/* Messages section */}
        <div className="col-sm-8 messages-section">
          {selectedContact ? (
            <>
              <h3 className="conversation-title">
                Conversation with {selectedContact.first_name} {selectedContact.last_name}
              </h3>
              <div className="conversation-container">
                {loadingMessages ? (
                  <div className="loading-messages">Loading messages...</div>
                ) : messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <Message 
                      key={msg.message_id || index}
                      message={msg.message_text}
                      timestamp={msg.timestamp || new Date().toISOString()}
                      isSender={parseInt(msg.sender_id) === parseInt(userId)}
            />
          ))
        ) : (
                  <p className="no-messages">No messages yet. Start a conversation!</p>
        )}
      </div>
              <div className="message-input-container">
                <form onSubmit={handleSubmit} className="message-form">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="message-input"
                  />
                  <button type="submit" className="send-button">
                    Send
                  </button>
                  {userType === 'client' && (
                    <button 
                      type="button" 
                      className="assign-trainer-button"
                      onClick={handleAssignTrainer}
                    >
                      Assign as Trainer
                    </button>
                  )}
                </form>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <p>Select a trainer to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageTable;