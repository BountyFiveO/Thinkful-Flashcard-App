import React from "react";
import "./style.css";

function Header() {
	return (
		<header className="jumbotron bg-dark">
			<a href="https://engineerpatterson.com"><img src="https://engineerpatterson.com/images/ep-logo.png"
					alt="Engineer Patterson Logo"
					className="ep-logo"
					width="428px"
					height="100px"
				/></a>
			<div className="container text-white">
				<h1 className="display-4">Flashcard Study App</h1>
				<p className="lead">by Engineer Patterson</p>
			</div>
		</header>
	);
}

export default Header;
