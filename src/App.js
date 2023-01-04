import './App.css';
import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import CardsList from './components/CardsList';
import NewBoardForm from './components/NewBoardForm';
import Board from './components/Board';

function App() {
  const [showAddCard, setShowAddCard] = useState([]);
  const [cards, setCards] = useState([
    {
      'cardId': 1,
      'message': 'Good day'
    },
    {
      'cardId': 2,
      'message': 'It is a beautiful day'
    }
  ]);

  const [boardsData, setBoardsData] = useState([
    {
      'boardId': 1,
      'title': 'Board 1',
      'owner': 'Hoku & Anika'
    },
    {
      'boardId': 2,
      'title': 'Board 2',
      'owner': 'Alaere & Mia'
    }
  ]);


  

  // const addCard = (card) => {
  //   setCards([...cards, card])
  // };



  
  // const [boardsData, setBoardsData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState({
    title: '',
    owner: '',
    board_id: null
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/boards`, {
    }).then((response) => {
      setBoardsData(response.data);
    })
  }, []);

  const selectBoard = (board) => { setSelectedBoard(board) };

  const boardsElements = boardsData.map((board) => {
    return (<li>
      <Board board={board} onBoardSelect={selectBoard}></Board>
    </li>)
  });

  const createNewBoard = (newBoard) => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/boards`, newBoard).then((response) => {
      console.log("Response:", response.data.board);
      const boards = [...boardsData];
      boards.push(response.data.board);
      setBoardsData(boards);
    }).catch((error) => {
      console.log('Error:', error);
      alert('Couldn\'t create a new board.');
    });
  }

  const [isBoardFormVisible, setIsBoardFormVisible] = useState(true);
  const toggleNewBoardForm = () => {setIsBoardFormVisible(!isBoardFormVisible)}

  
  
  const deleteAll = () => {
    if (window.confirm('Are you really sure? Please be gentle with this demo.')) {
      axios.delete(`${process.env.REACT_APP_BACKEND_URL}/destroy_all`).then((response) => {
        console.log('response', response.data);
        setBoardsData([response.data.default_board]);
        setSelectedBoard({
          title: '',
          owner: '',
          board_id: null
        });
      }).catch((error) => {
        console.log('Error:', error);
        alert('Something went wrong! :(');
      });
    }
  }

  return (
    <div className="page__container">
      <header></header>
      <body className="content__container">
        <section> 
          <h1>2023 Inspiration Board</h1>
          <section className="boards__container">
          {/* </section> */}
            <h2>Boards</h2>
            <ol className="boards__list">
              {boardsElements}
            </ol>
          </section>
          <section>
            <h2>Selected Board</h2>
            <p>{selectedBoard.board_id ? `${selectedBoard.title} - ${selectedBoard.owner}` : 'Select a Board from the Board List!'}</p>
          </section>
          <section className='new-board-form__container'>
            <h2>Create a New Board</h2>
            {isBoardFormVisible ? <NewBoardForm createNewBoard={createNewBoard}></NewBoardForm> : ''}
            <span onClick={toggleNewBoardForm} className='new-board-form__toggle-btn'>{isBoardFormVisible ? 'Hide New Board Form' : 'Show New Board Form'}</span>
          </section>
        </section>
        {selectedBoard.board_id ? <CardsList board={selectedBoard}></CardsList> : ''}
      </body>
      <footer><span></span> Click <span onClick={deleteAll} className="footer__delete-btn">here</span> to delete all boards and cards!</footer>
    </div>
  );
}


export default App;
