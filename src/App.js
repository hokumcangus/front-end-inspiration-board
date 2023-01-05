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

  const [boardsData, setBoardsData] = useState([
    {
      boardId: 1,
      title: "Board 1",
      owner: "Hoku & Anika",
    },
    {
      boardId: 2,
      title: "Board 2",
      owner: "Alaere & Mia",
    },
  ]);

  // const addCard = (card) => {
  //   setCards([...cards, card])
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
        {selectedBoard.board_id ? (
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
