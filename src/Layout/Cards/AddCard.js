//--------------------------IMPORTS--------------------------------

import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import CardForm from "./CardForm";
import { createCard, readDeck } from "../../utils/api/index";
import "./AddCard.css";

// --------------------------END IMPORTS----------------------------

//---------------------------FUNCTIONS------------------------------

function AddCard() {
	// assigning variables to useHistory and useParams and setting state for deck
	const history = useHistory();
	const { deckId } = useParams();
	const [deck, setDeck] = useState({});

	useEffect(() => {
		// abort controller to prevent memory leaks
		const abortController = new AbortController();
		// async function to load deck
		async function loadDeck() {
			// try catch to load deck
			try {
				// assigning deckInfo to readDeck function
				const deckInfo = await readDeck(deckId, abortController.signal);
				// setting deck to deckInfo
				setDeck(deckInfo);
			} catch (error) {
				// if error is abort error, console log aborted
				if (error.name === "AbortError") {
					console.info("aborted");
					// else throw error to console
				} else {
					throw error;
				}
			}
		}
		// calling loadDeck function
		loadDeck();
		// return abort controller to prevent memory leaks
		return () => abortController.abort();
		// deckId is dependency array to prevent infinite loop
	}, [deckId]);

	//Creates a new card
	async function handleSubmit(card) {
		// try catch to create card
		try {
			// assigning cardInfo to createCard function
			// createCard function takes in deckId and card and calls showCardSuccessToast function after card is created successfully
			await createCard(deckId, card);
			showCardSuccessToast();
			// catch error and throw error to console
		} catch (err) {
			throw err;
		}
	}

	//if cancel button is clicked, redirect to deck page
	function handleCancel() {
		history.push(`/decks/${deckId}`);
	}
	//function to display toast message when card is created successfully
	function showCardSuccessToast() {
		const toast = document.querySelector(".card-toast");
		toast.classList.add("show");
		// after 2.5 seconds, remove show class from toast
		setTimeout(() => toast.classList.remove("show"), 2500);
	}
	// --------------------------END FUNCTIONS AND HANDLERS------------------

	// --------------------------RETURN STATEMENT----------------------------

	// the return statement renders the breadcrumb navigation, the deck name, the card form, and the toast message
	// the toast message is hidden by default and is displayed when the card is created successfully
	// the below code contains the HTML for the breadcrumb navigation, the deck name, the card form, and the toast message that is displayed when the card is created successfully
	return (
		<div>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item">
						<Link to="/">
							<i className="bi bi-house-door-fill"></i> Home
						</Link>
					</li>
					<li className="breadcrumb-item">
						<Link to={`/decks/${deckId}`}>{deck.name}</Link>
					</li>
					<li
						className="breadcrumb-item active"
						aria-current="page"
					>
						Add Card
					</li>
				</ol>
			</nav>
			<h1>{deck.name}: Add Card</h1>
			<div className="card-toast alert alert-success hidden">Card Added!</div>

			<CardForm
				handleSubmit={handleSubmit}
				handleCancel={handleCancel}
			/>
		</div>
	);
	// -----------------------------END RETURN STATEMENT-------------------------------

	// --------------------------------END FUNCTION------------------------------------
}

// export AddCard function
export default AddCard;
