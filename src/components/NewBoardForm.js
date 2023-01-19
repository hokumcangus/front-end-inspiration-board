import React, { useState } from "react";
import PropTypes from 'prop-types';
import "../styles/App.css";

const NewBoardForm = (props) => {
  // console.log("new board form props", props)
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const addTitle = (event) => {
    setTitle(event.target.value);
  };
  const addOwner = (event) => {
    setOwner(event.target.value);
  };

  const createNewBoard = (event) => {
    event.preventDefault();
    props.createNewBoard({ title, owner });
    setTitle("");
    setOwner("");
  };

  const resetForm = (event) => {
    setTitle("");
    setOwner("");
    };

  return (
    <form onSubmit={createNewBoard} className="newBoardForm">
      <label>Title</label>
      <br />
      <input
        type="text"
        minLength={1}
        maxLength={40}
        value={props.title}
        onChange={addTitle}
      ></input>
      <br />
      <br />
      <label>Owned By</label>
      <br />
      <input
        type="text"
        minLength={1}
        maxLength={40}
        value={props.owner}
        onChange={addOwner}
      ></input>
      <p>
        Preview:
        {title && ` ${title}`}
        {owner && ` - ${owner}`}
      </p>
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
  );
};

export default NewBoardForm;