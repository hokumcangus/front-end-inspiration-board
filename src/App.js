import React, { useEffect, useState } from "react";
import axios, { AxiosHeaders } from "axios";
import CardsList from "./components/CardsList";
import NewBoardForm from "./components/NewBoardForm";
import Board from "./components/Board";
import "./styles/App.css";

function App() {
	const [boardsData, setBoardsData] = useState([]);
	// const [showAddCard, setAddCard] = useState([]);

	// const [boardsData, setBoardsData] = useState([
	// 	{
	// 		boardId: 1,
	// 		title: "Board1",
	// 		owner: "Hoku & Anika",

	// 		cards: [
	// 			{ cardId: 1, message: "This is card 1" },
	// 			{ cardId: 2, message: "This is card 2" },
	// 		],
	// 	},
	// 	{
	// 		boardId: 2,
	// 		title: "Board2",
	// 		owner: "Alaere & Mia",

	// 		cards: [
	// 			{ cardId: 3, message: "This is card 3" },
	// 			{ cardId: 4, message: "This is card 4" },
	// 		],
	// 	},
	// ]);
  // const URL = "https://inpiration-board-haam.herokuapp.com"

	const [selectedBoard, setSelectedBoard] = useState({
		title: "",
		owner: "",
		boardId: null,
	});

	// useEffect(() => {
	// 	axios
	// 		.get(`${URL}/boards`, {})
	// 		.then((response) => {
	// 			setBoardsData(response.data);
	// 		});
	// }, []);

  const getAllBoards = () => {
    axios
    .get(URL)
    .then((response) => {
      const newBoards = response.data.map((board) => {
        return {
          key: board.board_id,
          board_id: board.board_id,
          title: board.title,
          owner: board.owner,
      };
    });
    setBoardsData(newBoards);
  })
  .catch((error) => {
    console.log(Error);
  });
};

  useEffect(getAllBoards, []);

	const selectBoard = (board) => {
		setSelectedBoard(board);
	};

	const boardsElements = boardsData.map((board) => {
		return (
			<li>
				<Board
					// key={boardId}
					board={board}
					onSelect={selectBoard}
				></Board>
			</li>
		);
	});

	const createNewBoard = (newBoard) => {
		axios
			.post(`${URL}/boards`, newBoard)
			.then((response) => {
				// console.log("Response:", response.data.board);
				// const boards = [...boardsData];
				// boards.push(response.data.board);
				// setBoardsData(boards);
        if (newBoard.title && newBoard.owner) {
          console.log(response);
          getAllBoards();
        }
			})
			.catch((error) => {
				console.log("Error:", error);
				alert("Error creating a new board");
			});
	};

	const [isBoardFormVisible, setIsBoardFormVisible] = useState(true);
	const toggleNewBoardForm = () => {
		setIsBoardFormVisible(!isBoardFormVisible);
	};

	return (
		<div>
			<header>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<h1>Inspiration Board</h1>
			</header>
			<body>
				<section className="grid">
					<section>
						<h2>List of Boards</h2>
						<p>Select a board from the list below</p>
						<ul className="listOfBoards">{boardsElements}</ul>
					</section>
					<section>
						<h2>Now Viewing:</h2>
						<p className="selectedBoard">
							{selectedBoard.boardId &&
								`${selectedBoard.title} by ${selectedBoard.owner}`}
						</p>
					</section>
					<section>
						<h2>Need a New Board?</h2>
						<p>Enter details below and click Create</p>
						{isBoardFormVisible && (
							<NewBoardForm
								createNewBoard={createNewBoard}
							></NewBoardForm>
						)}
						<br />
						<span
							onClick={toggleNewBoardForm}
							className="toggleNewBoardForm"
						>
							{isBoardFormVisible
								? "Hide New Board Form"
								: "Show New Board Form"}
						</span>
					</section>
				</section>
				{selectedBoard.boardId && (
					<CardsList board={selectedBoard}></CardsList>
				)}
			</body>
			<footer>
				<h3>
					© 2023 Inspiration Board | Hoku, Alaere, Anika, & Mia | C18
					Snow Leopards
				</h3>
			</footer>
		</div>
	);
}

export default App;
