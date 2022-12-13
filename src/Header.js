import React from "react";
import "./style.css";

function Header() {
	return (
		<header className="jumbotron bg-dark">
			<div className="container text-white">
				<h1 className="display-4">Flashcard Study App</h1>
				<p className="lead">by Engineer Patterson</p>
			</div>
		</header>
	);
}

export default Header;
