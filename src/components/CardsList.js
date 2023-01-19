import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import NewCardForm from "./NewCardForm";
import PropTypes from 'prop-types';
import "../styles/CardsList.css";



const CardsList = (props) => {
	const [cardsData, setCardsData] = useState([]);
	// const [likesCount, setLikesCount] = useState(0);

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
	
  console.log("this is the new cardsData", cardsData);

  const deleteCard = (card_id) => {
    axios
      .delete(`${URL}/${props.board.board_id}/cards/${card_id}`)
      .then((response) => {
        const newCardsData = [];

        for (const card of cardsData) {
          if (card.card_id !== card_id) {
            newCardsData.push(card);
          }
        }
        // const newCardsData = cardsData.filter((existingCard) => {
        //   return existingCard.cardId !== card.cardId;
        // });
        // setCardsData(newCardsData);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Unable to delete the selected card");
      });
  };

	const plusOneLike = (cardId) => {
    axios
			.patch(
				`https://inpiration-board-haam.herokuapp.com/boards/${props.board.board_id}/cards/${cardId}`
			)
			.then((response) => {
        const newCardsData = cardsData.map((existingCard) => {
          return existingCard.card_id !== cardId.cardId
            ? existingCard
            : { ...cardId, likesCount: cardId.likesCount + 1 };
        });
        // setCardsData(newCardsData);
				setCardsData(newCardsData);
			})
			.catch((error) => {
				console.log("Error:", error);
				alert("Unable to add an additional 'like'");
			});
	};

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
  cards: PropTypes.arrayOf(PropTypes.shape({
    likesCount: PropTypes.number,
    message: PropTypes.string,
  })),
  plusOneLike: PropTypes.func,
  deleteCard: PropTypes.func
  // deleteOneBoard: PropTypes.func,
  // deleteAllBoards: PropTypes.func
};
  // board


export default CardsList;
