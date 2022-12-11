//-------------------START IMPORTS-----------------

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeckInfoCard from "./home/DeckInfoCard";
import { listDecks, deleteDeck } from "./utils/api/index";
import StructureInfoCard from "./home/DeckInfoCardStructure";
import "./style.css";
//-------------------END IMPORTS-----------------

//-------------------START FUNCTION HOME-----------------
function Home() {
	const [decks, setDecks] = useState([]);
	const [loaded, setLoaded] = useState(false);

	//Loads deck information. Triggers a re-render when they are loaded
	useEffect(() => {
		setDecks([]);
		const abortController = new AbortController(); //assign a variable abortController to the result of AbortController

		async function loadDecks() {
			//create an async function called loadDecks that will be called when the useEffect function is called
			try {
				let _decks = await listDecks(abortController.signal); //await the result of listDecks and assign it to _decks
				setDecks(_decks);
				setLoaded(true);
			} catch (error) {
				if (error.name === "AbortError") {
					//if the error name is equal to AbortError, then console.log aborted
					console.info("Aborted");
				} else {
					//if the error name is not equal to AbortError, then the error will be thrown
					throw error;
				}
			}
		}
		loadDecks(); //call the loadDecks function
		return () => {
			//return a function that will abort the controller
			console.info("aborting");
			abortController.abort();
		};
	}, []);

	async function handleDeleteDeck(id) {
		//create a function called handleDeleteDeck that takes in an id as a parameter
		if (
			//if the window.confirm returns true, then the deleteDeck function will be called with the id as a parameter
			window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
		) {
			await deleteDeck(id); //await the result of deleteDeck and assign it to _decks
			setDecks(() => decks.filter((deck) => deck.id !== id)); //set the decks state to the result of the filter function
		}
	}

	//use the map function to create a new array of deck info cards from the decks array and pass the handleDeleteDeck function as a prop
	const rows = decks.map((deck) => DeckInfoCard({ ...deck, handleDeleteDeck }));

	//Before loading, add skeleton deck info cards
	if (!loaded) {
		for (let i = 0; i < 3; i++) {
			//for loop that will run 3 times
			rows.push(<StructureInfoCard key={i + 10} />); //push a skeleton deck info card to the rows array
		}
	}
	//--------------------START RETURN-----------------
	return (
		//return the following JS
			<div className="row">
				<Link
					to="/decks/new"
					className="btn btn-secondary"
				>
					<i className="bi bi-plus-lg"></i> Create Deck
				</Link>
			
			<div className="row my-4">{rows}</div>
			</div>
	
	);
	//-------------------END RETURN-----------------
}
//-------------------END FUNCTION HOME-----------------

//-------------------EXPORT HOME-----------------
export default Home;
