import React from "react";
import PropTypes from "prop-types";
import "../styles/Card.css";

const Card = (props) => {
	return (
		<div>
			<section  className="cardFlex">
				<p className="message">{props.card.message}</p>
				<div className="tinyFlexWrapper">
						<span>{props.card.likes}🧡</span>
						<button onClick={(event) => props.plusOneLike(props.card.card_id)}>
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
  card: (PropTypes.shape({
    card_id: PropTypes.number,
    likes: PropTypes.number,
    message: PropTypes.string,
  })),
  plusOneLike: PropTypes.func,
  deleteCard: PropTypes.func
};

export default Card;