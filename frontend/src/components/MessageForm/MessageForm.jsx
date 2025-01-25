import React from 'react';
import Message from '../Message/Message';
import "./messageform.css"

function MessageForm() {
  return (
    <div className="container form-container">
      <h3 className="px-4 py-4 mt-3 text-center">Conversation with John Doe</h3>
      <div className="conversation-container">
        <div className="row">
          <div className="col-12">
            <Message isSender={false} />
            <Message isSender={true} />
          </div>
        </div>
      </div>
      <div className="text-box-container">
        <form>
          <div className="d-flex flex-row mt-3">
            <input
              type="text"
              className="form-control me-2" // Add margin to the right for spacing between input and button
              id="exampleInput"
              placeholder="Enter text here"
            />
            <button className="btn btn-primary" style={{ height: 'calc(1.5em + .75rem + 2px)' }}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MessageForm;
