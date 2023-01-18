import React from "react";
import PropTypes from "prop-types";

const Card = (props) => {
  const onLikeCallback = () => {
    console.log("Like button pressed!");
    props.onLikeCallback(props.card.card_id);
  };

  const onDeleteCallback = () => {
    console.log("Delete button pressed!");
    props.onDeleteCallback(props.card.card_id);
  };

  return (
    <div>
      <section>
        <p>{props.card.message}</p>
        <ul>
          <li>
            <p>{props.card.likesCount} ❤️</p>
          </li>
          <li>
            {/* <button onClick={(event) => props.plusOneLike(props.card)}>
              +❤️
            </button> */
            <button onClick={onLikeCallback}>Like</button>
            }
          </li>
        </ul>
        <section>
          {/* <button onClick={(event) => props.deleteCard(props.card)}> */}
            {/* Delete Card
          </button> */}
          <button onClick={onDeleteCallback}>Delete</button>
        </section>
      </section>
    </div>
  );
};

// const Card = (props) => {
//   return (
//     <div className='card'>
//       <section>
//         <p className='card-message'>{props.card.message}</p>
//         <ul className='card-controls'>
//           <li><p>{props.card.likesCount} ❤️</p></li>
//           <li><p onClick={() => props.plusOneCardItem(props.card)}>+1</p></li>
//           <li><p className='card-delete' onClick={() => props.deleteCard(props.card)}>Delete</p></li>
//         </ul>
//       </section>
//   </div>);
// };

Card.propTypes = {
  cardId: PropTypes.number,
  message: PropTypes.string.isRequired,
  // likesCount: PropTypes.number.isRequired, (not getting it from props?)
  boardId: PropTypes.number,
};

export default Card;
