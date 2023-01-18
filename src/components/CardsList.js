import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
// import Board from "./Board";
import NewCardForm from "./NewCardForm";
import "../styles/CardsList.css";

const CardsList = (props) => {
  const [cardsData, setCardsData] = useState([]);
  // const [likesCount, setLikesCount] = useState(0);

  // const plusOneLike = () => {
  //   setLikesCount((likesCount) => likesCount + 1);
  // }

  useEffect(() => {
    axios.get(
        `https://inpiration-board-haam.herokuapp.com/boards/${props.board.boardId}/cards`
      )
      .then((response) => {
        setCardsData(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Unable to retrieve cards for this board");
      });
  }, [props.board]);

  const deleteCard = (card) => {
    axios
      .delete(`https://inpiration-board-haam.herokuapp.com/boards/${props.board.boardId}/cards/${card.cardId}`)
      .then((response) => {
        const newCardsData = cardsData.filter((existingCard) => {
          return existingCard.cardId !== card.cardId;
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
      .put(`https://inpiration-board-haam.herokuapp.com/boards/${props.board.boardId}/cards/${card.cardId}/like`)
      .then((response) => {
        const newCardsData = cardsData.map((existingCard) => {
          return existingCard.cardId !== card.cardId
            ? existingCard
            : { ...card, likesCount: card.likesCount + 1 };
        });
        setCardsData(newCardsData);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Unable to add an additional 'like'.");
      });
  };

  // delete this function is using alt return below. Card component built-in to alt return
  const cardElements = cardsData.map((card) => {
    return (
      <Card
        card={card}
        plusOneLike={plusOneLike}
        deleteCard={deleteCard}
      ></Card>
    );
  });

  const addNewCard = (message) => {
    axios
      .post(
        `https://inpiration-board-haam.herokuapp.com/boards/${props.board.boardId}/cards`,
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
  //         {props.cardsData.map((card, cardId) => (
  //           <Card
  //             message={card.message}
  //             plusOneLike={plusOneLike}
  //             deleteCard={deleteCard}
  //             key={cardId}
  //             boardId={boardId}
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
    <section className="gridCardsList">
      <section>
        <h2 className="cardsList">Cards for {props.board.title}</h2>
        <div>{cardElements}</div>
      </section>
      <section>
        <NewCardForm addNewCard={addNewCard}></NewCardForm>
      </section>
    </section>
  );
};

export default CardsList;
