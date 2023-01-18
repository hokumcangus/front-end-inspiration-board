import React, { useState } from "react";
import PropTypes from 'prop-types';

const NewBoardForm = (props) => {
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  
  const addTitle = (event) => {
    setTitle(event.target.value);
  };
  
  const addOwner = (event) => {
    setOwner(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    props.addNewBoard({ title, owner });
    setTitle("");
    setOwner("");
  };

  // const resetForm = (event) => {
  //   setTitle("");
  //   setOwner("");
  //   };

  return (
    <form onSubmit={onFormSubmit} className="newBoardForm">
      <label htmlFor="title">Title</label>
      <br />
      <input
        type="text"
        value={props.title}
        onChange={addTitle}
        className={
          title.length === 0 || title.length > 50
            ? "Title cannot exceed 50 characters"
            : ""
        }
      ></input>
      <br />
      <br />
      <label htmlFor="owner">Owned By</label>
      <br />
      <input
        type="text"
        value={props.owner}
        onChange={addOwner}
        className={
          owner.length === 0 || owner.length > 50
            ? "Owner name(s) cannot exceed 50 characters"
            : ""
        }
      ></input>
      <p>
        Preview:
        {title && ` ${title}`}
        {owner && ` - ${owner}`}
      </p>
      <section className="buttonWrapper">  
        <input
          type="submit"
          value="Create"
        ></input>
        <br />
        <br />
        {/* <input
          type="reset"
          value="Reset"
          onClick={resetForm}
        ></input> */}
        </section>
    </form>
  );
};

NewBoardForm.propTypes = {
  addNewBoard: PropTypes.func
};

export default NewBoardForm;
