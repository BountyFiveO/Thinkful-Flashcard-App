//--------------START IMPORTS-----------------

import React from "react";
import { Link, useHistory } from "react-router-dom";
import DeckForm from "./DeckForm";
import { createDeck } from "../../utils/api/index";
//--------------END IMPORTS-----------------

//--------------START FUNCTION AND COMPONENTS-----------------
function CreateDeck() {
	// assign history variable to useHistory hook and create a function called handleSubmit.
	// The handleSubmit function will call the createDeck function from the api/index.js file.
	// The handleSubmit function will also push the user to the deck that was just created.
	const history = useHistory();
	function handleSubmit(deck) {
		const abortController = new AbortController(); // abortController is used to abort the fetch request if the user navigates away from the page before the fetch request is complete.

		async function callCreateDeck() {
			// an async callCreateDeck function will call the createDeck function from the api/index.js file.
			try {
				const deckInfo = await createDeck(deck, abortController.signal); // the deckInfo variable will be assigned to the response from the createDeck function.
				history.push(`/decks/${deckInfo.id}`); // the user will be pushed to the deck that was just created.
			} catch (err) {
				// if the user navigates away from the page before the fetch request is complete, then the abortController will abort the fetch request.
				if (err.name === "AbortError") {
					// if the fetch request is aborted, then the console will log "aborted".
					console.info("aborted"); //console.log the aborted error message.
				} else {
					// if the fetch request is not aborted, but is still an error, then the error will be thrown.
					throw err;
				}
			}
		}
		callCreateDeck(); // call the callCreateDeck function.
		// the useEffect hook will return a function that will abort the fetch request if the user navigates away from the page before the fetch request is complete.
		return () => {
			abortController.abort();
		};
	}
	// create a function called handleCancel that will push the user to the home page.
	function handleCancel() {
		history.push("/");
	}

	//--------------START RETURN-----------------
	return (
		<div>
			{/* breadcrumb navigation, ordered list, list items, links, and buttons */}
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item">
						<Link to="/">
							<span className="oi oi-home"></span> Home
						</Link>
					</li>
					<li
						className="breadcrumb-item active"
						aria-current="page"
					>
						Create Deck
					</li>
				</ol>
			</nav>
			<h1>Create Deck</h1>
			<DeckForm
				handleSubmit={handleSubmit}
				handleCancel={handleCancel}
			/>
		</div>
	);
	//--------------END RETURN-----------------
}
//--------------END FUNCTION AND COMPONENTS-----------------

//--------------EXPORT CreateDeck-----------------
export default CreateDeck;
