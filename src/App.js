import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

const cardImages = [
	{ src: "/img/card/ant.png", isMatched: false },
	{ src: "/img/card/bell.png", isMatched: false },
	{ src: "/img/card/clock.png", isMatched: false },
	{ src: "/img/card/flash.png", isMatched: false },
	{ src: "/img/card/flask.png", isMatched: false },
	{ src: "/img/card/screw.png", isMatched: false },
];

function App() {
	const [cards, setCards] = useState([]);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [isWin, setIsWin] = useState(false);


	useEffect(() => {
		newGame();
	}, []);

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			if (choiceOne.src === choiceTwo.src) {
				console.log("match");
				const newCards = [...cards];
				newCards.find(
					(card) => card.id === choiceOne.id
				).isMatched = true;
				newCards.find(
					(card) => card.id === choiceTwo.id
				).isMatched = true;
				setCards(newCards);
				setChoiceOne(null);
				setChoiceTwo(null);

				if (newCards.every((card) => card.isMatched)) {
					setIsWin(true);
				}
			} else {
				setTimeout(() => {
					setChoiceOne(null);
					setChoiceTwo(null);
				}, 700);
			}
		}
	}, [choiceOne, choiceTwo, cards]);

	const newGame = () => {
		const newCards = cardImages
			.concat(cardImages)
			.map((card, index) => ({ ...card, id: index }))
			.sort(() => Math.random() - 0.5);
		setCards(newCards);
		setChoiceOne(null);
		setChoiceTwo(null);
		setIsWin(false);
	};

	const handleChoice = (card) => {
		choiceOne != null ? setChoiceTwo(card) : setChoiceOne(card);
	};

	return (
		<div className="App">
			<h1 className="text-4xl font-bold my-3">Memory Game</h1>
			<button
				onClick={() => newGame()}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3"
			>
				New Game
			</button>
			<div className="flex justify-center items-center">
				<div className="h-5/6 w-5/6  grid grid-cols-4 grid-rows-3 gap-2 p-5 border-2 border-black">
					{cards.map((card, index) => {
						return (
							<Card
								key={card.id}
								src={card}
								handleChoice={handleChoice}
								flipped={
									card.id === choiceOne?.id ||
									card.id === choiceTwo?.id ||
									card.isMatched
								}
							/>
						);
					})}
				</div>
			</div>
			{isWin && (
				<div className="text-2xl font-bold my-3">🎉🥳 You Won!</div>
			)}
		</div>
	);
}

export default App;
