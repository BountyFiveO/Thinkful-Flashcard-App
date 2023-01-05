import React from "react";
import CardDetails from "./CardDetails";
import CardDetailsStructure from "./CardDetailsStyle";

function CardList({ deck, deleteHandler }) {
  let rows = deck.cards?.map((card) =>
    CardDetails({ ...card, deckId: deck.id, deleteHandler })
  );

  //if the are no cards, then return a default card
  if (!deck.name) {
    rows = [];
    for (let i = 0; i < 3; i++) {
      rows.push(<CardDetailsStructure key={i} />);
    }
  }

  return (
    <div>
      <h2 className='mt-4'>Cards</h2>
      {rows}
    </div>
  );
}

export default CardList;