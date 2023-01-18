import React from "react";
import PropTypes from "prop-types";
import "../styles/Card.css";

// i was struggling to access the card_id key:value pair without hardcoding

// const Card = (props) => {
//   const onLikeCallback = () => {
//     console.log("Like button pressed!");
//     props.onLikeCallback(props.card.card_id);
//   };

//   const onDeleteCallback = () => {
//     console.log("Delete button pressed!");
//     props.onDeleteCallback(props.card.card_id);
//   };

//   return (
//     <div>
//       <section>
//         <p>{props.card.message}</p>
//         <ul>
//           <li>
//             <p>{props.card.likesCount} ❤️</p>
//           </li>
//           <li>
//             {/* <button onClick={(event) => props.plusOneLike(props.card)}>
//               +❤️
//             </button> */
//             <button onClick={onLikeCallback}>+🧡</button>
//             }
//           </li>
//         </ul>
//         <section>
//           {/* <button onClick={(event) => props.deleteCard(props.card)}> */}
//             {/* Delete Card
//           </button> */}
//           <button onClick={onDeleteCallback}>Delete</button>
//         </section>
//       </section>
//     </div>
//   );
// };


const Card = (props) => {
	return (
		<div>
			<section>
				<p className="message">{props.message}</p>
				<div className="tinyFlexWrapper">
						<span>{props.likesCount}🧡</span>
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

Card.propTypes = {
  likesCount: PropTypes.number,
  message: PropTypes.string,
  plusOneLike: PropTypes.func,
  deleteCard: PropTypes.func
};

export default Card;
