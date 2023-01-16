import React from "react";
import Header from "../Header.js";
import Home from "../Home.js";
import CreateDeck from "./Decks/CreateDeck";
import DeckRoutes from "./Decks/DeckRoutes";
import NotFound from "./NotFound";
import { Switch, Route } from "react-router-dom";
import "./index.css";
import "../style.css";

function Layout() {
	return (
		<div>
			<Header />
			<div className="container">
				<Switch>
					<Route
						exact={true}
						path="/"
					>
						<Home />
					</Route>
					<Route
						exact={true}
						path="/decks/new"
					>
						<CreateDeck />
					</Route>
					<Route path="/decks/:deckId">
						<DeckRoutes />
					</Route>
					<Route path="/">
						<NotFound />
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default Layout;
