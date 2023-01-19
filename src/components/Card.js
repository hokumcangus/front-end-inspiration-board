import React from "react";
import PropTypes from "prop-types";
import "../styles/Card.css";

const Card = (props) => {
	return (
		<div>
			<section>
				<p className="message">{props.card.message}</p>
				<div className="tinyFlexWrapper">
						<span>{props.card.likes}🧡</span>
						<button onClick={(event) => props.updateLikes(props.card.card_id)}>
							+🧡
						</button>
						<button onClick={(event) => props.deleteCard(props.card.card_id)}>
							Delete Card
						</button>
				</div>
			</section>
		</div>
	);
};

Card.propTypes = {
  cards: (PropTypes.shape({
    card_id: PropTypes.number,
    likes: PropTypes.number,
    message: PropTypes.string,
  })),
	totalLikeCnt: PropTypes.func,
	onCards: PropTypes.func,
	updateLikes: PropTypes.func,
  cardLiked: PropTypes.func,
  deleteCard: PropTypes.func
};

export default Card;