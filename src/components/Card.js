import React from "react";
import PropTypes from "prop-types";
import "../styles/Card.css";

const Card = (props) => {
	return (
		<div>
			<section>
				<p className="message">{props.message}</p>
				<div className="tinyFlexWrapper">
						<span>{props.likesCount} 🧡</span>
						<button onClick={(event) => props.plusOneLike(props)}>
							+🧡
						</button>
						<button onClick={(event) => props.deleteCard(props)}>
							Delete Card
						</button>
				</div>
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
	message: PropTypes.string,
	likesCount: PropTypes.number,
};

export default Card;
