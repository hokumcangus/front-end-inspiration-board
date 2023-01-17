import React, { useEffect, useState } from "react";
import axios from "axios";
import CardsList from "./components/CardsList";
import NewBoardForm from "./components/NewBoardForm";
import Board from "./components/Board";
import "./styles/App.css";

function App() {
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

  const [boardsData, setBoardsData] = useState([]);
	// const [showAddCard, setAddCard] = useState([]);
  
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

	const boardsElements = boardsData.map((board, boardId) => {
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
			.post(`${process.env.REACT_APP_BACKEND_URL}/boards`, newBoard)
			.then((response) => {
				console.log("Response:", response.data.board);
				const boards = [...boardsData];
				boards.push(response.data.board);
				setBoardsData(boards);
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
			<section>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<h1>Inspiration Board</h1>
			</section>
			<section>
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

			</section>
			<section>
				<h3>
					© 2023 Inspiration Board | Hoku, Alaere, Anika, & Mia | C18
					Snow Leopards
				</h3>
			</section>
      <script src="./node_modules/axios/dist/axios.min.js"></script>
      <script src="src/index.js"></script>
		</div>
	);
}

export default App;
