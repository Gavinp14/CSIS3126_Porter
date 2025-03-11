import React from "react";
import "./contact.css";

function Contact({ trainerName }) {
  return (
    <div className="contact">
      <h3>{trainerName}</h3>
    </div>
  );
}

export default Contact;