import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import NewCardForm from "./NewCardForm";
import PropTypes from 'prop-types';
import "../styles/CardsList.css";

const CardsList = (props) => {
	const [cardsData, setCardsData] = useState([]);

	console.log("cards_data", cardsData)

	const onCards = (cardId) => {
		setCardsData(cardsData.map(card => {
			if(card.card_id === cardId) {
					return {...card, likes: card.likes + 1}
			} else {
					return card;
			}
	}));
}

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
				console.log("in the then response", response)
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

	const updateLikes = async (cardId) => {
    try {
        const res = await axios.patch(`https://inpiration-board-haam.herokuapp.com/boards/${props.board.board_id}/cards/${cardId}`);
        onCards(cardId);
    } catch(err) {
        console.error(err);
    }
}

	// const plusOneLike = (cardId) => {
  //   axios
	// 		.patch(
	// 			`https://inpiration-board-haam.herokuapp.com/boards/${props.board.board_id}/cards/${cardId}`
	// 		)
	// 		.then((response) => {
  //       const newCardsData = cardsData.map((existingCard) => {
	// 				console.log("card", cardId.card_id)
  //         return existingCard.card_id !== cardId
  //           ? existingCard
  //           : { ...cardId, likesCount: cardId.likes + 1 };
  //       });
  //       // setCardsData(newCardsData);
	// 			setCardsData(newCardsData);
	// 		})
	// 		.catch((error) => {
	// 			console.log("Error:", error);
	// 			alert("Unable to add an additional 'like'");
	// 		});
	// };

	//Displays each card with like and delete button
	const cardsList = cardsData.map((card, index) => {
    return (
      <div  className="cardListFlex" key={index}>
        <Card
          card={card}
					onCards={onCards}
					updateLikes={updateLikes}
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
  cards: PropTypes.arrayOf(PropTypes.shape({
    likesCount: PropTypes.number,
    message: PropTypes.string,
  })),
	onCards: PropTypes.func,
  deleteCard: PropTypes.func,
	updateLikes: PropTypes.func,
  // deleteOneBoard: PropTypes.func,
  // deleteAllBoards: PropTypes.func
};
  // board


export default CardsList;
