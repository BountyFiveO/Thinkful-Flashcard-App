//------------------IMPORTS--------------------------------

import React from "react";
import "./CardDetails.css";

//----------------- END IMPORTS -----------------------------

//----------------- FUNCTIONS --------------------------------

function CardDetailsStructure() {
	// Constaines the classNames and layout of the CardDetails component
	return (
		<div className="card my-1">
			<div className="card-body">
				<div className="card-content">
					<p className="card-text mx-2 animated-bg animated-bg-text">&nbsp;</p>
					<p className="card-text mx-2 animated-bg animated-bg-text">&nbsp;</p>
				</div>
				<div className="card-buttons">
					<button className="btn btn-secondary disabled">
						<span className="oi oi-pencil"></span> Edit
					</button>
					<button className="btn btn-danger delete-deck disabled">
						<span className="oi oi-trash"></span>
					</button>
				</div>
			</div>
		</div>
	);
}
// ----------------- END FUNCTIONS ----------------------------

// export CardDetailsStructure
export default CardDetailsStructure;
