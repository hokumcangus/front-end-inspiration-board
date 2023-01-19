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

  const resetForm = (event) => {
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
          minLength={1}
          maxLength={40}
          value={message}
          onChange={createNewMessage}
        ></input>
        <p>Preview: {message}</p>
        <section className="buttonGrid">  
        <input
          type="submit"
          value="Create"
          className="button"
        ></input>
        <input
          type="reset"
          value="Reset"
          className="button"
          onClick={resetForm}
        ></input>
        </section>
      </form>
    </section>
  );
};

NewCardForm.propTypes = {
  addNewCard: PropTypes.func
};

export default NewCardForm;