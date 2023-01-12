// -------------START IMPORTS-------------
import React from "react";
import "./style.css";
// -------------END IMPORTS-------------

// -------------START COMPONENT-------------
function Header() {
	// -------------START RETURN-------------
	return (
		// this is the header for the app and it contains the logo and the title
		<header className="jumbotron bg-dark">
			<div className="logo-container">
			<a href="https://engineerpatterson.com"><img src="https://engineerpatterson.com/images/ep-logo.png"
					alt="Engineer Patterson Logo"
					className="ep-logo"
					width="428px"
					height="100px"
				/></a>
			</div>
			<div className="container text-white">
				<h1 className="display-4">Flashcard Study App</h1>
				<p className="lead">by Engineer Patterson</p>
			</div>
		</header>
	);
	// -------------END RETURN-------------
}
// -------------END COMPONENT-------------

export default Header;

