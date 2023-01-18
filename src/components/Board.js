import React from "react";
import PropTypes from "prop-types";

const Board = (props) => {
  return (
    <div onClick={(event) => props.onSelect(props.board)}>{props.board.title}</div>
  );
};



Board.propTypes = {
  title: PropTypes.string,
  owner: PropTypes.string
}

export default Board;
