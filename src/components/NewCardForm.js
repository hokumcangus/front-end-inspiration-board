import { useState } from "react";

const NewCardForm = (props) => {
  const [message, setMessage] = useState("");
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const createNewCard = (e) => {
    e.preventDefault();
    props.postNewCard(message);
    setMessage("");
  };

  return (
    <section>
      <h2>Create a New Card</h2>
      <p>Enter details below and click Create</p>
      <form onSubmit={createNewCard} className="newCardForm">
        <label>Message</label>
        <br />
        <input
          type="text"
          className={
            message.length === 0 || message.length > 40
              ? "invalid-form-input"
              : ""
          }
          onChange={handleMessageChange}
          value={message}
        ></input>
        <p>Preview: {message}</p>
        {/* <input
          type="Submit"
          disabled={message.length === 0 || message.length > 40}
          className="new-card-form__form-submit-btn"
        ></input> */}
        <button type="Submit" className="submitBtn">
          Create
        </button>
      </form>
    </section>
  );
};

export default NewCardForm;
