import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import NewCardForm from "./NewCardForm";
import "../styles/CardsList.css";

const CardsList = (props) => {
	const [cardsData, setCardsData] = useState([]);
	const [likesCount, setLikesCount] = useState(0);

	// const plusOneLike = () => {

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

	const deleteCard = (card) => {
		axios
			.delete(
				`https://inpiration-board-haam.herokuapp.com/boards/${props.board.board_id}/cards/${card}`
			)
			.then((response) => {
				const newCardsData = cardsData.filter((existingCard) => {
					return existingCard.card_id !== card.card_id;
				});
				setCardsData(newCardsData);
			})
			.catch((error) => {
				console.log("Error:", error);
				alert("Unable to delete the selected card");
			});
	};

	const plusOneLike = (card) => {
		axios
			.patch(
				`https://inpiration-board-haam.herokuapp.com/boards/${props.board.board_id}/cards/${card}/likes`
			)
			.then((response) => {
				const newCardsData = cardsData.map((existingCard) => {
					return existingCard.card_id !== card.card_id
						? existingCard
						: setLikesCount((likesCount) => likesCount + 1);
					// : { ...card, likesCount: card.likesCount + 1 };
				});
				setCardsData(newCardsData);
			})
			.catch((error) => {
				console.log("Error:", error);
				alert("Unable to add an additional 'like'");
			});
	};

	console.log("this is the card_id", props.cards);

	// delete this function if using alt return below. Card component built-in to alt return
	// console.log('this is the cardsData', cardsData)
	const cardsList = cardsData.map((card, id) => {
		return (
			<div  className="cardListFlex">
        <Card
					key={id}
					card={card}
					likesCount={card.likesCount}
					message={card.message}
					plusOneLike={plusOneLike}
					deleteCard={deleteCard}
				></Card>
      </div>  
		);
	});

	const addNewCard = (message) => {
		axios
			.post(
				`https://inpiration-board-haam.herokuapp.com/boards/${props.board.board_id}/cards`,
				{ message }
			)
			.then((response) => {
				const cards = [...cardsData];
				cards.push(response.data.card);
				setCardsData(cards);
			})
			.catch((error) => {
				console.log("Error:", error);
				alert("Couldn't create a new card.");
			});
	};

	// "alt return"
	// return (
	//     <div className="gridCardsList">
	//       <section>
	//         <h2 className="cardsList">Cards for {props.board.title}</h2>
	//         {cardsData.map((card, card_id) => (
	//           <Card
	//             message={card.message}
	//             plusOneLike={plusOneLike}
	//             deleteCard={deleteCard}
	//             key={card_id}
	//           />
	//         ))}
	//       </section>
	//       <section>
	//         <NewCardForm addNewCard={addNewCard}></NewCardForm>
	//       </section>
	//     </div>
	//   );
	// };

	return (
		<section className="cardsListOuterGrid">
			<section>
				<h2 className="cardsListHeader">
					Cards for {props.board.title}
				</h2>
				<div className="cardsListInnerGrid">
          {cardsList}
        </div>
			</section>
			<section>
				<NewCardForm addNewCard={addNewCard}></NewCardForm>
			</section>
		</section>
	);
};

export default CardsList;
