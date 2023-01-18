import React, { useEffect, useState } from "react";
import axios, { AxiosHeaders } from "axios";
import CardsList from "./components/CardsList";
import NewBoardForm from "./components/NewBoardForm";
import Board from "./components/Board";
import "./styles/App.css";

function App() {
	const [boardsData, setBoardsData] = useState([]);
	// const [showAddCard, setAddCard] = useState([]);

	const [selectedBoard, setSelectedBoard] = useState({
		title: "",
		owner: "",
		board_id: null,
	});

	useEffect(() => {
		axios
			.get("https://inpiration-board-haam.herokuapp.com/boards", {})
			.then((response) => {
				setBoardsData(response.data);
			});
	}, []);

	const selectBoard = (board) => {
		setSelectedBoard(board);
	};

	const boardsList = boardsData.map((board, index) => {
		return (
			<li key={index}>
				<Board
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
		<div className="mainContainer">
			<section>
				<h1>Inspiration Board</h1>
			</section>
			<section>
				<section className="grid">
					<section>
						<h2>List of Boards</h2>
						<p>Select a board from the list below</p>
						<ul className="listOfBoards">{boardsList}</ul>
					</section>
					<section>
						<h2>Now Viewing:</h2>
						<p className="selectedBoard">
							{selectedBoard.board_id &&
								`${selectedBoard.title} by ${selectedBoard.owner}`}
						</p>
					</section>
					<section>
						<h2>Need a New Board?</h2>
						<p>Enter details below and click Create</p>
						{isBoardFormVisible && (
							<NewBoardForm
								addNewBoard={createNewBoard}
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
				{selectedBoard.board_id && (
					<CardsList board={selectedBoard}></CardsList>
				)}
			</section>
			<footer>
				<h3>
					© 2023 Inspiration Board | Hoku, Alaere, Anika, & Mia | C18
					Snow Leopards
				</h3>
			</footer>
			<script src="./node_modules/axios/dist/axios.min.js"></script>
			<script src="src/index.js"></script>
		</div>
	);
}

export default App;
