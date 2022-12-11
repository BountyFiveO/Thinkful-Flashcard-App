//------------------------START IMPORTS------------------------

import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import CardForm from "./CardForm";
import { readCard, readDeck, updateCard } from "../../utils/api/index";
//------------------------END IMPORTS------------------------

//------------------------START FUNCTION EDITCARD------------------------
function EditCard() {
	const history = useHistory();
	const { deckId, cardId } = useParams();
	const [deck, setDeck] = useState({});
	const [card, setCard] = useState({});

	const name = deck.name ? deck.name : "Deck"; // if name is equal to deck.name, then return deck.name, if not, then return "Deck"

	//One useEffect for both loading the deck and the card as they are connected and should both be aborted when leaving this Component
	useEffect(() => {
		const abortController = new AbortController();

		//Load the deck for navbar information
		async function loadDeck() {
			try {
				const deckInfo = await readDeck(deckId, abortController.signal); //assign a variable deckInfo to the result of readDeck once the data is passed in the setDeck the value of deckInfo will be passed in
				setDeck(deckInfo); //this sets the value of deck to deckInfo
			} catch (error) {
				//if error is thrown, then the error will be caught and the error will be thrown
				if (error.name === "AbortError") {
					//if the error name is equal to AbortError, then the console will log aborted
					console.info("aborted"); //if the error name is not equal to AbortError, then the error will be thrown
				} else {
					throw error;
				}
			}
		}

		//load the card for the form and the card information
		async function loadCard() {
			try {
				const cardInfo = await readCard(cardId, abortController.signal);
				setCard(cardInfo);
			} catch (error) {
				if (error.name === "AbortError") {
					console.info("aborted");
				} else {
					throw error;
				}
			}
		}

		loadDeck(); //loads the deck information
		loadCard(); //loads the card information

		return () => abortController.abort(); //returns the abortController to abort the fetch if any of the above functions are not completed
	}, [deckId, cardId]);

	//Updates the card and returns to the deck details screen once the card is updated
	async function handleSubmit(card) {
		try {
			await updateCard(card);
			history.push(`/decks/${deckId}`);
		} catch (err) {
			throw err;
		}
	}

	//Returns to the deck details screen if the user cancels the edit
	function handleCancel() {
		history.push(`/decks/${deckId}`);
	}
	//------------------------START RETURN------------------------
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
						Edit Card {cardId}
					</li>
				</ol>
			</nav>
			<h1>{name}: Add Card</h1>
			<CardForm
				handleSubmit={handleSubmit}
				handleCancel={handleCancel}
				card={card}
			/>
		</div>
	);
	//------------------------END RETURN------------------------
}
//------------------------END FUNCTION EDITCARD------------------------

//------------------------START EXPORT------------------------
export default EditCard;
