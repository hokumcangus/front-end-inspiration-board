import React from "react";
import PropTypes from "prop-types";

const Board = (props) => {
  return (
    <div onClick={(event) => props.onSelect(props.board)}>{props.board.title}</div>
  );
};

Board.propTypes = {
  board: PropTypes.shape({
    board_id: PropTypes.number,
    cards: PropTypes.arrayOf(PropTypes.shape({
      card_id: PropTypes.number,
      likes: PropTypes.number,
      message: PropTypes.string
    })),
    title: PropTypes.string,
    owner: PropTypes.string
  }),  
  onSelect:PropTypes.func
}

export default Board;