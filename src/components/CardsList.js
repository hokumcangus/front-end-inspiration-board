import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import NewCardForm from "./NewCardForm";
import "../styles/CardsList.css";



const CardsList = (props) => {
  const [cardsData, setCardsData] = useState([]);

  
  
  // useEffect(() => {
  //   axios
  //     .get(
  //       `${URL}/boards/${props.board.board_id}/cards`
  //     )
  //     // This response data is a nested object
  //     .then((response) => {
  //       // setCardsData(response.data);
  //       const newCardData = response.data["cards"].map((card) => {
  //         return {
  //           key: card.card_id,
  //           board_id: card.board_id,
  //           card: card.card_id,
  //           message: card.message,
  //           likes_count: card.likesCount
  //         };
  //       });
  //       setCardsData(newCardData);
  //     })
  //     .catch((error) => {
  //       console.log("Error:", error);
  //       alert("Unable to retrieve cards for this board");
  //     });
  // }, [props.board.board_id]);  

  const getAllCards = () => {
    axios
      .get(
        `${URL}/boards/${props.board.board_id}/cards`
      )
      // This response data is a nested object
      .then((response) => {
        // setCardsData(response.data);
        const newCardData = response.data["cards"].map((card) => {
          return {
            key: card.card_id,
            board_id: card.board_id,
            card: card.card_id,
            message: card.message,
            likes_count: card.likesCount
          };
        });
        setCardsData(newCardData);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Unable to retrieve cards for this board");
      });
  }

  useEffect(getAllCards, [props.board.board_id]);

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

  const plusOneLike = (card_id) => {
    axios
      .patch(`${URL}/${props.board.board_id}/cards/${card_id}/like`)
      .then(() => {
        const newCardData = [];

        for (const card of cardsData) {
          const likedCard = {...card};

          if (likedCard.card_id === card_id) {
            likedCard.likes_count += 1;
          }
          newCardData.push(likedCard);
        }
        setCardsData(newCardData);
      })
      // .then((response) => {
      //   const newCardsData = cardsData.map((existingCard) => {
      //     return existingCard.cardId !== card_id.cardId
      //       ? existingCard
      //       : { ...card_id, likesCount: card_id.likesCount + 1 };
      //   });
      //   setCardsData(newCardsData);
      // })
      .catch((error) => {
        console.log("Error:", error);
        alert("Unable to add an additional 'like'.");
      });
  };

  // delete this function is using alt return below. Card component built-in to alt return
  const cardElements = cardsData.map((card) => {
    return (
      <Card
        key={card.card_id}
        card={card}
        plusOneLike={plusOneLike}
        deleteCard={deleteCard}
      ></Card>
    );
  });

  const addNewCard = (cardData) => {
    axios
      .post(
        `${URL}/${props.board.board_id}/cards`,
        // { message }
        {
          board_id: props.board.board_id,
          message: cardData,
        }
      )
      .then((response) => {
        // const cards = [...cardsData];
        // cards.push(response.data.card);
        // setCardsData(cards);
        if (cardData.message) console.log(response);
        getAllCards();
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Couldn't create a new card.");
      });
  };

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
