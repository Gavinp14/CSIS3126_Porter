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
  const [userType, setUserType] = useState(null);
  const [hasAssignedTrainer, setHasAssignedTrainer] = useState(false);
  const [isTrainerAssigned, setIsTrainerAssigned] = useState(false);
  
  const { getUserId, getToken } = useAuth();
  const userId = getUserId();
  const token = getToken();

  // Fetch contacts when component mounts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Determine user type from localStorage
        const storedUserType = localStorage.getItem('registertype') || 'client';
        const isTrainer = storedUserType === 'trainer';
        
        // Set the user type state
        setUserType(isTrainer ? 'trainer' : 'client');
        
        console.log(`User type: ${isTrainer ? 'trainer' : 'client'}`);
        
        // Fetch both trainer and client contacts
        if (isTrainer) {
          // If user is a trainer, fetch their clients
          const clientsResponse = await axios.get(
            `http://127.0.0.1:5000/api/v1/clientmessages/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          
          console.log("Trainer's clients:", clientsResponse.data);
          setContacts(clientsResponse.data.clients || []);
        } else {
          // If user is a client, fetch trainers
          const trainersResponse = await axios.get(
            `http://127.0.0.1:5000/api/v1/trainermessages/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          
          console.log("Client's trainers:", trainersResponse.data);
          setContacts(trainersResponse.data.trainers || []);
          
          // Check if the client has already been assigned a trainer
          setHasAssignedTrainer(!!trainersResponse.data.assignedTrainer);
          setIsTrainerAssigned(!!trainersResponse.data.assignedTrainer);
        }
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

  // Handle contact selection for both trainers and clients
  const handleContactClick = (contact) => {
    console.log("Selected contact:", contact);
    setSelectedContact(contact);
    
    // Determine the appropriate IDs based on user type
    const currentUserId = userId;
    const contactId = userType === 'trainer' ? contact.client_id : contact.trainer_id;
    
    fetchMessages(currentUserId, contactId);
  };

  // Fetch messages between the current user and the selected contact
  const fetchMessages = async (userId, contactId) => {
    setLoadingMessages(true);
    try {
      console.log(`Fetching messages between ${userId} and ${contactId}`);
      
      // This endpoint should work for both trainer-client and client-trainer communications
      const response = await axios.get(
        `http://127.0.0.1:5000/api/v1/messages/thread/${userId}/${contactId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      const messagesData = response.data.messages || [];
      console.log("Received messages:", messagesData);
      setMessages(messagesData);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Send a message to the selected contact
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    try {
      // Determine receiver ID based on user type
      const receiverId = userType === 'trainer' 
        ? selectedContact.client_id 
        : selectedContact.trainer_id;

      console.log("Sending message:", {
        sender_id: userId,
        receiver_id: receiverId,
        message_text: newMessage
      });
      
      await axios.post(
        "http://127.0.0.1:5000/api/v1/messages",
        {
          sender_id: userId,
          receiver_id: receiverId,
          message_text: newMessage
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      setNewMessage("");
      fetchMessages(userId, receiverId);
      
    } catch (error) {
      console.error("Error sending message:", error);
      ErrorDialog("Failed to send message");
    }
  };

  // Handle assigning a trainer (only for clients)
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
      
      setHasAssignedTrainer(true);
      setIsTrainerAssigned(true);
      SuccessDialog("Trainer assigned successfully!");
    } catch (error) {
      console.error("Error assigning trainer:", error);
      ErrorDialog("Failed to assign trainer");
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
          <h2 className="sidebar-title mt-4">
            {userType === 'trainer' ? 'My Clients' : 'My Trainers'}
          </h2>
          <div className="contacts-list">
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <div
                  key={userType === 'trainer' ? contact.client_id : contact.trainer_id}
                  className={`contact-item ${
                    selectedContact && 
                    selectedContact[userType === 'trainer' ? 'client_id' : 'trainer_id'] === 
                    contact[userType === 'trainer' ? 'client_id' : 'trainer_id'] ? 'active' : ''
                  }`}
                  onClick={() => handleContactClick(contact)}
                >
                  {contact.first_name} {contact.last_name}
                </div>
              ))
            ) : (
              <p className="no-contacts">
                {userType === 'trainer' ? 'No clients found.' : 'No trainers found.'}
              </p>
            )}
          </div>
        </div>
        
        {/* Messages section */}
        <div className="col-sm-8 messages-section">
          {selectedContact ? (
            <>
              <h3 className="conversation-title mt-4">
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
                  <div className="message-buttons">
                    <button type="submit" className="send-button">
                      Send
                    </button>
                    {/* Only show assign/remove trainer buttons for clients */}
                    {userType === 'client' && (
                      <>
                        {!hasAssignedTrainer && (
                          <button 
                            type="button" 
                            className="assign-trainer-button"
                            onClick={handleAssignTrainer}
                          >
                            Assign as Trainer
                          </button>
                        )}
                        {hasAssignedTrainer && isTrainerAssigned && (
                          <button 
                            type="button" 
                            className="assign-trainer-button assigned"
                            onClick={handleAssignTrainer}
                          >
                            Remove Trainer
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <p>
                {userType === 'trainer' 
                  ? 'Select a client to start messaging' 
                  : 'Select a trainer to start messaging'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageTable;