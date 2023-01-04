import React from 'react';
import PropTypes from 'prop-types'

const Card = (props) => {
  return (
    <div className='card-item'>
      <section>
        <p className='card-item__message'>{props.card.message}</p>
        <ul className='card-item__controls'>
          <li><p>{props.card.likes_count} 💕</p></li>
          <li><p onClick={() => props.plusOneCardItem(props.card)}>+1</p></li>
          <li><p className='card-item__delete' onClick={() => props.deleteCardItem(props.card)}>Delete</p></li>
        </ul>
      </section>
  </div>);
};

Card.propTyoes = {
  cardId: PropTypes.number,
  message: PropTypes.string.isRequired,
  // likesCount = PropTypes.number,
  boardId: PropTypes.number
};

export default Card;