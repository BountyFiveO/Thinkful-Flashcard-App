//-------------------START IMPORTS---------------------------

import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import DeckForm from "./DeckForm";
import { readDeck, updateDeck } from "../../utils/api/index";
//-------------------END IMPORTS---------------------------

//-------------------START FUNCTION EDITDECK---------------------------
function EditDeck() {
	const history = useHistory();
	const { deckId } = useParams();
	const [deck, setDeck] = useState({});

	const name = deck.name ? deck.name : "Deck Name"; // if name is equal to deck.name, then return deck.name, if not, then return "Deck Name"

	useEffect(() => {
		//One useEffect for both loading the deck and the card as they are connected and should both be aborted when leaving this Component
		const abortController = new AbortController(); //assign a variable abortController to the result of AbortController

		async function loadDeck() {
			//Load the deck for navbar information
			try {
				//try to load the deck
				const deckInfo = await readDeck(deckId, abortController.signal); //await the result of readDeck and assign it to deckInfo
				setDeck(deckInfo); //set the value of deck to deckInfo
			} catch (error) {
				//if error is thrown, then the error will be caught and the error will be thrown
				if (error.name === "AbortError") {
					//if the error name is equal to AbortError, then the console will log aborted
					console.info("aborted");
				} else {
					//if the error name is not equal to AbortError, then the error will be thrown
					throw error;
				}
			}
		}

		loadDeck(); //call the loadDeck function

		return () => abortController.abort();
	}, [deckId]);

	function handleSubmit(deck) {
		//handleSubmit function that takes in deck as a parameter
		const abortController = new AbortController(); //assign a variable abortController to the result of AbortController
		// create an async function called editDeck that will be called when the handleSubmit function is called
		async function editDeck() {
			try {
				const deckInfo = await updateDeck(deck, abortController.signal); //await the result of updateDeck and assign it to deckInfo
				history.push(`/decks/${deckInfo.id}`);
			} catch (err) {
				if (err.name === "AbortError") {
					//if the error name is equal to AbortError, then the console will log aborted
					console.info("aborted");
				} else {
					throw err; //if the error name is not equal to AbortError, then the error will be thrown
				}
			}
		}
		editDeck(); //call the editDeck function

		return () => {
			//return the abortController.abort function
			abortController.abort(); //abort the controller
		};
	}
	function handleCancel() {
		//handleCancel function that will be called when the cancel button is clicked
		history.push(`/decks/${deckId}`); //push the user to the deck page
	}

	return (
		<div>
			{/* These html elements and classes are the same as the other files.. comments for code is the same */}
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
						Edit Deck
					</li>
				</ol>
			</nav>
			<h1>Edit Deck</h1>
			<DeckForm
				handleSubmit={handleSubmit}
				handleCancel={handleCancel}
				deck={deck}
			/>
		</div>
	);
	// -------------------END RETURN---------------------------
}
//-------------------END FUNCTION EDITDECK---------------------------

//--------------EXPORT-----------------
export default EditDeck;
