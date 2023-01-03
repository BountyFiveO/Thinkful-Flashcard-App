//------------IMPORTS------------
import React from "react";
import "./FlashCard.css";

//----------------START FUNCTION AND DIV ELEMENTS-----------------

function FlashCardStructure() {
	//--------------START RETURN-----------------
	return (
		//-----------------START DIV ELEMENTS-----------------
		<div className="card my-1 front">
			<div className="card-body front">
				<h5 className="card-title animated-bg animated-bg-text">&nbsp;</h5>
				<p className="card-text front-text animated-bg animated-bg-text">
					&nbsp;
				</p>
				<button
					className="btn btn-secondary disabled"
					disabled
				>
					Flip
				</button>
			</div>
		</div>
		//-----------------END DIV ELEMENTS-----------------
	);
	// -----------------END RETURN---------------------
}
//----------------END FUNCTION AND DIV ELEMENTS-----------------

//---------------------EXPORT-----------------
export default FlashCardStructure;
