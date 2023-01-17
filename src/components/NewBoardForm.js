import React, { useState } from "react";

const NewBoardForm = (props) => {
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const createTitle = (event) => {
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

  return (
    <form onSubmit={createNewBoard} className="newBoardForm">
      <label>Title</label>
      <br />
      <input
        type="text"
        value={title}
        onChange={createTitle}
        className={
          title.length === 0 || title.length > 50
            ? "Title cannot exceed 50 characters"
            : ""
        }
      ></input>
      <br />
      <br />
      <label>Owned By</label>
      <br />
      <input
        type="text"
        value={owner}
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
      {/* <input
        type="Submit"
        disabled={
          title.length === 0 ||
          owner.length === 0 ||
          title.length > 40 ||
          owner.length > 40
        }
        className="new-board-form__form-submit-btn"
      ></input> */}
      <button type="Submit" className="submitBtn">
        Create
      </button>
    </form>
  );
};

export default NewBoardForm;
