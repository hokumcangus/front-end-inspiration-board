import React from 'react';
import PropTypes from 'prop-types'

const Card = (props) => {
  return (
    <div className='card'>
      <section>
        <p className='card-message'>{props.card.message}</p>
        <ul className='card-controls'>
          <li><p>{props.card.likesCount} ❤️</p></li>
          <li><p onClick={() => props.plusOneCardItem(props.card)}>+1</p></li>
          <li><p className='card-delete' onClick={() => props.deleteCard(props.card)}>Delete</p></li>
        </ul>
      </section>
  </div>);
};

Card.propTypes = {
  cardId: PropTypes.number,
  message: PropTypes.string.isRequired,
  // likesCount = PropTypes.number,
  boardId: PropTypes.number
};

export default Card;