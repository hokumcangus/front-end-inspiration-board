import React from "react";
import PropTypes from "prop-types";

const Board = (props) => {
  return (
    <div onClick={() => props.onSelect(props.board)}>{props.board.title}</div>
  );
};

Board.propTypes = {
  boardId: PropTypes.number,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired
}

export default Board;
