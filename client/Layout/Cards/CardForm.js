//----------------------------------IMPORTS-----------------------------------------

import React, { useEffect, useState } from "react";

//----------------------------------FUNCTION AND PROPS-----------------------------------------

function CardForm({ handleSubmit, handleCancel, card }) {
	// CardForm component takes in handleSubmit, handleCancel, and card as props
	// use state to set cardInfo to card
	const [cardInfo, setCardInfo] = useState(card);
	useEffect(() => {
		// useEffect to set cardInfo to card
		setCardInfo(card);
		// card is dependency array to prevent infinite loop
	}, [card]);
	// updateForm function to update cardInfo
	const updateForm = (event) => {
		// event.target.name and event.target.value are assigned to name and value
		const { name, value } = event.target;
		// setCardInfo copies cardInfo and updates the value of the name to the value
		setCardInfo({ ...cardInfo, [name]: value });
	};
	// submit function to prevent default and call handleSubmit function
	const submit = (event) => {
		event.preventDefault();
		handleSubmit(cardInfo);
		setCardInfo({});
	};
	//----------------------------------RETURN START-----------------------------------------
	// return form with textarea for front and back of the card
	return (
    //----------------------------------FORM START-----------------------------------------
		// form starts here with a onSubmit event handler that calls submit function
		<form onSubmit={submit}>
			{/* div container called form-group */}
			<div className="form-group">
        {/* label for front of card */}
        
				<label htmlFor="front">Front</label>
				{/* textarea for front of card with a value of cardInfo.front and onChange event handler that calls updateForm function */}
				<textarea
					className="form-control"
					type="text"
					id="front"
					name="front"
					placeholder="Front side of card"
					value={cardInfo?.front || ""}
					onChange={updateForm} // onChange event handler that calls updateForm function
					required
				></textarea>
			</div>

			<div className="form-group">
				<label htmlFor="back">Back</label>
				<textarea
					className="form-control"
					name="back"
					id="back"
					placeholder="Back side of card"
					value={cardInfo?.back || ""}
					onChange={updateForm}
					required
				></textarea>
				<button
					className="btn btn-secondary my-2"
					onClick={handleCancel}
				>
					Done
				</button>
				<button
					type="submit"
					className="btn btn-primary my-2"
				>
					Save
				</button>
			</div>
		</form>
	);
}

export default CardForm;
