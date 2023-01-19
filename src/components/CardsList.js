import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import NewCardForm from "./NewCardForm";
import PropTypes from 'prop-types';
import "../styles/CardsList.css";

const CardsList = (props) => {
	const [cardsData, setCardsData] = useState([]);
	const [likesCount, setLikesCount] = useState(0);
	const increaseLikes = () => {
    setLikesCount((likesCount) => likesCount + 1);
  };

	// const plusOneLike = () => {
  //   setLikesCount((likesCount) => likesCount + 1);
	// };

	useEffect(() => {
		axios
			.get(
				`https://inpiration-board-haam.herokuapp.com/boards/${props.board.board_id}/cards`
			)
			.then((response) => {
				setCardsData(response.data.cards);
			})
			.catch((error) => {
				console.log("Error:", error);
				alert("Unable to retrieve cards for this board");
			});
	}, [props.board]);
	
	const deleteCard = (cardId) => {
    axios
			.delete(
				`https://inpiration-board-haam.herokuapp.com/cards/${cardId}`
			)
			.then((response) => {
        const newCardsData = cardsData.filter((deletedCard) => {
					return deletedCard.card_id !== cardId;
				});
				setCardsData(newCardsData);
			})
			.catch((error) => {
				console.log("Error:", error);
				alert("Unable to delete the selected card");
			});
	};

	const plusOneLike = (cardId) => {
    axios
			.patch(
				`https://inpiration-board-haam.herokuapp.com/cards/${cardId}/likes`
			)
			.then((response) => {
        const newCardsData = cardsData.map((existingCard) => {
					console.log(cardId.card_id)
          return existingCard.card_id !== cardId
            ? existingCard
            : { ...cardId, likesCount: cardId.liesCount + 1 };
        });
				setCardsData(newCardsData);
			})
			.catch((error) => {
				console.log("Error:", error);
				alert("Unable to add an additional 'like'");
			});
	};

	//Displays each card with like and delete button
	const cardsList = cardsData.map((card, index) => {
    return (
      <div  className="cardListFlex" key={index}>
        <Card
          card={card}
					plusOneLike={plusOneLike}
					deleteCard={deleteCard}
				></Card>
      </div>
		);
	});


	const createNewCard = (message) => {
		axios
			.post(
				`https://inpiration-board-haam.herokuapp.com/boards/${props.board.board_id}/cards`,
				{ message }
			)
			.then((response) => {
        console.log("Response:", response.data.cards);
        const cards = [...cardsData];
				cards.push(response.data.cards);
				setCardsData(cards);
			})
			.catch((error) => {
				console.log("Error:", error);
				alert("Couldn't create a new card.");
			});
	};
	
  return (
		<section className="lowerGrid">
      <section>
        <h2 className="cardsListHeader">
          Cards for {props.board.title}
        </h2>
				<div className="cardsListInnerGrid">
          {cardsList}
        </div>
      </section>
      <section>  
				<NewCardForm addNewCard={createNewCard}></NewCardForm>
      </section>
		</section>
	);
};

CardsList.propTypes = {
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
  plusOneLike: PropTypes.func,
  deleteCard: PropTypes.func
};


export default CardsList;
