//-------------------START IMPORTS-----------------

import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api";
import classNames from "../../utils/class-names";
import NotFound from "../../NotFound";
import CardList from "../Cards/CardList";
import "../../data/db.json";
//-------------------END IMPORTS-----------------

//-------------------START FUNCTION AND COMPONENTS-----------------
function DeckDetails() {
	const [deckInfo, setDeckInfo] = useState({});
	const { deckId } = useParams();
	const { name, description } = deckInfo;
	const { url } = useRouteMatch();
	const history = useHistory();

	//Set placeholder for deck name before it's loaded
	const navName = name ? name : "View Deck";

	//Loads deck information. If deck isn't found, display not found
	const getDeckDetails = useCallback(async () => {
		try {
			const deck = await readDeck(deckId);
			setDeckInfo(deck);
		} catch (error) {
			setDeckInfo({ name: "Not Found" });
		}
	}, [deckId]);

	//Load deck information on any change to deck id.
	//getDeckDetails is required as a dependancy since it is defined outside useEffect
	useEffect(() => {
		getDeckDetails();
	}, [deckId, getDeckDetails]);

	//Deletes card and re-loads deck information
	async function deleteHandler(id) {
		if (
			window.confirm("Delete this card?\n\nYou will not be able to recover it.")
		) {
			await deleteCard(id);
			getDeckDetails();
		}
	}

	//Handle incorrect deckId
	if (name === "Not Found") return <NotFound />;

	//Deletes deck and goes back to home page
	async function handleDeleteDeck() {
		if (
			window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
		) {
			await deleteDeck(deckId);
			history.push("/");
		}
	}

	//-------------------START RETURN-----------------
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
					<li
						className="breadcrumb-item active"
						aria-current="page"
					>
						{navName}
					</li>
				</ol>
			</nav>
			<h3 className={classNames({ "animated-bg animated-bg-text": !name })}>
				{name}
			</h3>
			<p className={classNames({ "animated-bg animated-bg-text": !name })}>
				{description}
			</p>
			<div className="deck-card-buttons">
				<Link
					className={classNames({
						btn: true,
						"btn-secondary": true,
						disabled: !name,
					})}
					to={`${url}/edit`}
				>
					<span className="oi oi-pencil"></span> Edit
				</Link>
				<Link
					className={classNames({
						btn: true,
						"btn-primary": true,
						disabled: !name,
					})}
					to={`${url}/study`}
				>
					<span className="oi oi-book"></span> Study
				</Link>
				<Link
					className={classNames({
						btn: true,
						"btn-primary": true,
						disabled: !name,
					})}
					to={`${url}/cards/new`}
				>
					<span className="oi oi-plus"></span> Add Cards
				</Link>
				<button
					className="btn btn-danger delete-deck"
					onClick={handleDeleteDeck}
					disabled={!name}
				>
					<span className="oi oi-trash"></span>
				</button>
			</div>

			<CardList
				deck={deckInfo}
				deleteHandler={deleteHandler}
			/>
		</div>
	);
	// -------------------END RETURN-----------------
}
//-------------------END FUNCTION AND COMPONENTS-----------------

//-------------------EXPORT DeckDetails-----------------
export default DeckDetails;
