import React, { useState } from "react";
import PropTypes from 'prop-types';

const NewCardForm = (props) => {
  const [message, setMessage] = useState("");
  
  const createNewMessage = (event) => {
    setMessage(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    props.addNewCard(message);
    setMessage("");
  };

  return (
    <section>
      <h2>Create a New Card</h2>
      <p>Enter details below and click Create</p>
      <form onSubmit={onFormSubmit} className="newCardForm">
        <label htmlFor="message">Message</label>
        <br />
        <input
          type="text"
          value={props.message}
          onChange={createNewMessage}
          className={
            message.length === 0 || message.length > 50
              ? "Message required. Do not exceed 50 characters."
              : ""
          }
        ></input>
        <p>Preview: {message}</p>
        <input
          type="submit"
          value="Create"
        ></input>
      </form>
    </section>
  );
};

NewCardForm.propTypes = {
  addNewCard: PropTypes.func
};

export default NewCardForm;
