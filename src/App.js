import React, { useEffect, useState } from "react";
import axios from "axios";
import CardsList from "./components/CardsList";
import NewBoardForm from "./components/NewBoardForm";
import Board from "./components/Board";
import "./styles/App.css";

function App() {
	const [boardsData, setBoardsData] = useState([]);

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

  const resetSelectBoard = () => {
    setSelectedBoard(
      {
        title: "",
        owner: "",
        board_id: null,
      }
    )
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
    console.log("new board", newBoard)
    axios
			.post(
				"https://inpiration-board-haam.herokuapp.com/boards", newBoard
        )
			.then((response) => {
				console.log("Response:", response.data.boards);
				const boards = [...boardsData];
				boards.push(response.data.boards);
				setBoardsData(boards);
			})
			.catch((error) => {
				console.log("Error:", error);
				alert("Error creating a new board");
			});
	};

	const [isBoardFormShowing, setIsBoardFormShowing] = useState(true);
	const toggleNewBoardForm = () => {
		setIsBoardFormShowing(!isBoardFormShowing);
	};  

  const deleteOneBoard = (board_id) => {
    axios
      .delete(
        `https://inpiration-board-haam.herokuapp.com/boards/${board_id}`
      )
      .then((response) => {
        const newBoardsData = boardsData.filter((deletedBoard) => {
          return deletedBoard.board_id !== board_id;
        });
        setBoardsData(newBoardsData);
        resetSelectBoard();
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Unable to delete this board");
    });
  };

  const deleteAllBoards = (boards) => {
    axios
    .delete(
      `https://inpiration-board-haam.herokuapp.com/${boards}`
    )
    .then((response) => {;
      setBoardsData(response.data.boards)
      resetSelectBoard();
    })
    .catch((error) => {
      console.log("Error:", error);
      alert("Unable to delete all boards");
    });
  };

	return (
		<main className="mainContainer">
			<section>
				<h1>Inspiration Board</h1>
			</section>
			<section>
				<section className="upperGrid">
					<section>
						<h2 className="noBottomMargin">List of Boards</h2>
            <div className="deleteBoards"
              onClick={(event) => deleteAllBoards(boardsList)}>
                Delete All Boards
            </div>
						<p>Select a board to view from the list below</p>
						<ul className="listOfBoards">{boardsList}</ul>
					</section>
					<section>
						<h2 className="noBottomMargin">Now Viewing:</h2>
            <div className="deleteBoards"
              onClick={(event) => deleteOneBoard(selectedBoard.board_id)}>
              {selectedBoard.board_id 
                  ? "Delete This Board"
                  : ""}
            </div>
						<p className="selectedBoard">
							{selectedBoard.board_id &&
								`${selectedBoard.title} by ${selectedBoard.owner}`}
            </p>
					</section>
					<section>
						<h2>Need a New Board?</h2>
						<p>Enter details below and click Create</p>
						{isBoardFormShowing && (
							<NewBoardForm
								addNewBoard={createNewBoard}
							></NewBoardForm>
						)}
						<br />
						<div
							onClick={toggleNewBoardForm}
							className="toggleNewBoardForm"
						>
							{isBoardFormShowing
								? "Hide New Board Form"
								: "Show New Board Form"}
						</div>
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
		</main>
	);
}

export default App;
