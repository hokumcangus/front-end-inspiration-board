import "../styles/CardsList.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "./Card";
import NewCardForm from "./NewCardForm";

const CardsList = (props) => {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/boards/${props.board.boardId}/cards`
      )
      .then((response) => {
        setCardsData(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Couldn't get cards for this board.");
      });
  }, [props.board]);

  const deleteCard = (card) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/cards/${card.cardId}`)
      .then((response) => {
        const newCardsData = cardsData.filter((existingCard) => {
          return existingCard.cardId !== card.cardId;
        });
        setCardsData(newCardsData);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Couldn't delete the card.");
      });
  };

  const plusOneCardItem = (card) => {
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/cards/${card.cardId}/like`)
      .then((response) => {
        const newCardsData = cardsData.map((existingCard) => {
          return existingCard.cardId !== card.cardId
            ? existingCard
            : { ...card, likes_count: card.likes_count + 1 };
        });
        setCardsData(newCardsData);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Couldn't +1 the card.");
      });
  };

  const cardElements = cardsData.map((card) => {
    return (
      <Card
        card={card}
        plusOneCardItem={plusOneCardItem}
        deleteCardItem={deleteCard}
      ></Card>
    );
  });

  const addNewCard = (message) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/boards/${props.board.boardId}/cards`,
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

  return (
    <section className="flexbox">
      <section>
        <h2 className="cardsList">Cards for {props.board.title}</h2>
        <div>{cardElements}</div>
      </section>
      <section>
        <h2>Space Holder</h2>
      </section>
      <section>
        <NewCardForm addNewCard={addNewCard}></NewCardForm>
      </section>
    </section>
  );
};

export default CardsList;
