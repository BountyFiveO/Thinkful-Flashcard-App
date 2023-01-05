//----------------------START IMPORTS-----------------

import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import FlashCard from "../Cards/FlashCard";
import { readDeck } from "../../utils/api/index";
import NotEnoughCards from "../../NotEnoughCards";
import FlashCardStructure from "../Cards/FlashCardStyle";
// ----------------------END IMPORTS-----------------

//----------------------START FUNCTION STUDYDECK-----------------
function StudyDeck() {
	const history = useHistory();
	const { deckId } = useParams(); //assign a variable deckId to the result of useParams
	const [deck, setDeck] = useState({ cards: [] }); //Set placeholder deck before loading to prevent errors when loading
	const [cardId, setCardId] = useState(0);
	const [loaded, setLoaded] = useState(false);

	//Set placeholder deck name before loading
	const name = deck.name ? deck.name : "Deck Name"; //if name is equal to deck.name, then return deck.name, if not, then return "Deck Name"

	// ----------------------START USEEFFECT-----------------
	useEffect(() => {
		const abortController = new AbortController(); //assign a variable abortController to the result of AbortController
		// create an async function called loadDeck that will be called when the useEffect function is called
		async function loadDeck() {
			//Load the deck for navbar information
			try {
				const deckInfo = await readDeck(deckId, abortController.signal); //assign a variable deckInfo to the result of readDeck once the data is passed in the setDeck the value of deckInfo will be passed in
				setDeck(deckInfo);
				setLoaded(true);
			} catch (error) {
				//if there is an error, then console.log the error
				if (error.name === "AbortError") {
					//if the error name is equal to AbortError, then console.log aborted
					console.info("aborted");
				} else {
					//if the error name is not equal to AbortError, then console.log the error
					throw error;
				}
			}
		}

		loadDeck(); //call the loadDeck function

		return () => abortController.abort(); //return the abortController function
	}, [deckId]);
	// ----------------------END USEEFFECT-----------------

	//----------------------START FUNCTION HANDLENEXT-----------------

	function handleNext() {
		//create a function called handleNext
		if (cardId >= deck.cards.length - 1) {
			//if cardId is greater than or equal to the length of the deck.cards array minus 1
			if (window.confirm("Restart cards?")) {
				//if the window.confirm is equal to true, then setCardId to 0
				setCardId(0);
			} else {
				//if the window.confirm is equal to false, then redirect to the home page
				history.push("/");
			}
		} else {
			//if cardId is not greater than or equal to the length of the deck.cards array minus 1, then setCardId to cardId plus 1
			setCardId(cardId + 1);
		}
	}
	//
	const flashCards = //create a variable called flashCards
		deck.cards.length > 2 ? ( //if the length of the deck.cards array is greater than 2, then return the FlashCard component, if not, then return the NotEnoughCards component
			<FlashCard
				handleNext={handleNext}
				deck={deck}
				cardId={cardId}
			/>
		) : (
			<NotEnoughCards deck={deck} />
		);
	const content = loaded ? flashCards : <FlashCardStructure />; //if loaded is equal to true, then return flashCards, if not, then return the FlashCardStructure component
	// -------------------START RETURN-----------------
	return (
		<div>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item">
						<Link to="/">
							<span className="oi oi-home"></span> Home
						</Link>
					</li>
					<li className="breadcrumb-item">
						<Link to={`/decks/${deckId}`}>{name}</Link>
					</li>
					<li
						className="breadcrumb-item active"
						aria-current="page"
					>
						Study
					</li>
				</ol>
			</nav>
			<h1>{name}: Study</h1>
			{content}
		</div>
	);
	// -------------------END RETURN-----------------
}
// ----------------------END FUNCTION STUDYDECK-----------------

// -------------------START EXPORT-----------------
export default StudyDeck;
