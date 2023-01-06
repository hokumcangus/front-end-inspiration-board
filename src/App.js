import "./styles/App.css";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import CardsList from "./components/CardsList";
import NewBoardForm from "./components/NewBoardForm";
import Board from "./components/Board";

function App() {
  // const [showAddCard, setShowAddCard] = useState([]);
  // const [cards, setCards] = useState([
  //   {
  //     cardId: 1,
  //     message: "Good day",
  //   },
  //   {
  //     cardId: 2,
  //     message: "It is a beautiful day",
  //   },
  // ]);

  // const [boardsData, setBoardsData] = useState([
  //   {
  //     boardId: 1,
  //     title: "Board 1",
  //     owner: "Hoku & Anika",
  //   },
  //   {
  //     boardId: 2,
  //     title: "Board 2",
  //     owner: "Alaere & Mia",
  //   },
  // ]);

  // const addCard = (card) => {
  //   setCards([...cards, card])
  // };

  // const [boardsData, setBoardsData] = useState([]);
  //     'cardId': 1,
  //     'message': 'Good day'
  //   },
  //   {
  //     'cardId': 2,
  //     'message': 'It is a beautiful day'
  //   }
  // ]);
  // const [boardsData, setBoardsData] = useState([
  //   {
  //     'boardId': 1,
  //     'title': 'Board 1',
  //     'owner': 'Hoku & Anika'
  //   },
  //   {
  //     'boardId': 2,
  //     'title': 'Board 2',
  //     'owner': 'Alaere & Mia'
  //   }
  // ]);
  const [boardsData, setBoardsData] = useState([
    {
      boardId: 1,
      title: "board1",
      owner: "Hoku & Anika",

      cards: [
        { cardId: 1, message: "This is card 1" },

        { cardId: 2, message: "This is card 2" },
      ],
    },
    {
      boardId: 2,
      title: "Board2",
      owner: "Alaere & Mia",

      cards: [
        { cardId: 3, message: "This is card 3" },

        { cardId: 4, message: "This is card 4" },
      ],
    },
  ]);
  // console.log(Data[0]);

  // const Card = (props) => {
  //   return (
  //     <div className='card'>
  //       <section>
  //         <p className='card-message'>{props.card.message}</p>
  //         <ul className='card-controls'>
  //           <li><p>{props.card.likes_count} 💕</p></li>
  //           <li><p onClick={() => props.plusOneCardItem(props.card)}>+1</p></li>
  //           <li><p className='card-delete' onClick={() => props.deleteCard(props.card)}>Delete</p></li>
  //         </ul>
  //       </section>
  //   </div>);
  // };

  // const cardElements = cardsData.map((card) => {
  //   return (
  //     <Card
  //       card={card}
  //       plusOneCardItem={plusOneCardItem}
  //       deleteCardItem={deleteCard}
  //     ></Card>
  //   );
  // });

  // const CardsList = () => {
  //   const [cardsData, setCardsData] = useState([
  //     {
  //       boardId: 1,
  //       cardId: 1,
  //       message: "This is card 1",
  //     },
  //     {
  //       boardId: 1,
  //       cardId: 2,
  //       message: "This is card 2",
  //     },
  //     {
  //       boardId: 2,
  //       cardId: 3,
  //       message: "This is card 3",
  //     },
  //     {
  //       boardId: 2,
  //       cardId: 4,
  //       message: "This is card 4",
  //     },
  //   ]);
  // };

  // const [boardsData, setBoardsData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState({
    title: "",
    owner: "",
    boardId: null,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/boards`, {})
      .then((response) => {
        setBoardsData(response.data);
      });
  }, []);

  const selectBoard = (board) => {
    setSelectedBoard(board);
  };

  const boardsElements = boardsData.map((board) => {
    return (
      <li>
        <Board board={board} onBoardSelect={selectBoard}></Board>
      </li>
    );
  });

  const createNewBoard = (newBoard) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/boards`, newBoard)
      .then((response) => {
        console.log("Response:", response.data.board);
        const boards = [...boardsData];
        boards.push(response.data.board);
        setBoardsData(boards);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Couldn't create a new board.");
      });
  };

  const [isBoardFormVisible, setIsBoardFormVisible] = useState(true);
  const toggleNewBoardForm = () => {
    setIsBoardFormVisible(!isBoardFormVisible);
  };

  // const deleteAll = () => {
  //   if (
  //     window.confirm("Are you really sure? Please be gentle with this demo.")
  //   ) {
  //     axios
  //       .delete(`${process.env.REACT_APP_BACKEND_URL}/destroy_all`)
  //       .then((response) => {
  //         console.log("response", response.data);
  //         setBoardsData([response.data.default_board]);
  //         setSelectedBoard({
  //           title: "",
  //           owner: "",
  //           board_id: null,
  //         });
  //       })
  //       .catch((error) => {
  //         console.log("Error:", error);
  //         alert("Something went wrong! :(");
  //       });
  //   }
  // };

  return (
    <div className="parentWrap">
      <header>
        <h1>Inspiration Board</h1>
      </header>
      <body>
        <section className="flexbox">
          <section>
            <h2>List of Boards</h2>
            <p>Select a board from the list below</p>
            <ul className="listOfBoards">{boardsElements}</ul>
          </section>
          <section>
            <h2>Now Viewing:</h2>
            <p>
              {selectedBoard.boardId
                ? `${selectedBoard.title} - ${selectedBoard.owner}`
                : ""}
            </p>
          </section>
          <section>
            <h2>Need a New Board?</h2>
            <p>Enter details below and click Create</p>
            {isBoardFormVisible ? (
              <NewBoardForm createNewBoard={createNewBoard}></NewBoardForm>
            ) : (
              ""
            )}
            <span onClick={toggleNewBoardForm} className="toggleNewBoardForm">
              {isBoardFormVisible
                ? "Hide New Board Form"
                : "Show New Board Form"}
            </span>
          </section>
        </section>
        {selectedBoard.boardId ? (
          <CardsList board={selectedBoard}></CardsList>
        ) : (
          ""
        )}
      </body>
      <footer>
        <h3>
          © 2023 Inspiration Board | Hoku, Alaere, Anika, & Mia | C18 Snow
          Leopards
        </h3>
      </footer>
    </div>
  );
}

export default App;
