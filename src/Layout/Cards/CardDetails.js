//---------------------IMPORTS--------------------------------

import React from "react";
import { Link } from "react-router-dom";
// import "./CardDetails.css";

//---------------------END IMPORTS----------------------------

//---------------------FUNCTIONS------------------------------

function CardDetails({ id, front, back, deckId, deleteHandler }) {
	// contains card details and edit and delete buttons for the Card component
	return (
		// div container for the card
		<div
			className="card my-1"
			key={id}
		>
			{/* // div container for the card body */}
			<div className="card-body">
				<div className="card-content">
					<p className="card-text mx-2">{front}</p>
					<p className="card-text mx-2">{back}</p>
				</div>
				<div className="card-buttons">
					<Link
						className="btn btn-secondary"
						to={`/decks/${deckId}/cards/${id}/edit`}
					>
						{/* span class for the Edit button that adds the pencil icon */}
						<span className="oi oi-pencil"></span> Edit
					</Link>
					<button
						// button class for the Delete button that adds the trash icon
						className="btn btn-danger delete-deck"
						onClick={() => deleteHandler(id)}
					>
						<span className="oi oi-trash"></span>
					</button>
				</div>
			</div>
		</div>
	);
}

//---------------------END FUNCTIONS--------------------------

//export CardDetails
export default CardDetails;
