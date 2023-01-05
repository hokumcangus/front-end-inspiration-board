import "../styles/NewBoardForm.css";
import { useState } from "react";

const NewBoardForm = (props) => {
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleOwnerChange = (e) => {
    setOwner(e.target.value);
  };

  const createNewBoard = (e) => {
    e.preventDefault();
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
        onChange={handleTitleChange}
        className={
          title.length === 0 || title.length > 40 ? "invalidInput" : ""
        }
      ></input>
      <br />
      <br />
      <label>Owned By</label>
      <br />
      <input
        type="text"
        value={owner}
        onChange={handleOwnerChange}
        className={
          owner.length === 0 || owner.length > 40 ? "invalidInput" : ""
        }
      ></input>
      <p>
        Preview: {title} - {owner}
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
      <button type="Submit" className="realTime">
        Create
      </button>
    </form>
  );
};

export default NewBoardForm;
