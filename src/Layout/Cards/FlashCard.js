//--------------IMPORTS-----------------

import React, { useState } from "react";
import classNames from "../../utils/class-names";
// import "./FlashCard.css";


//--------------FUNCTION AND COMPONENTS-----------------
function FlashCard({ handleNext, deck = { cards: [] }, cardId = 0 }) {
  const { cards } = deck;
  const card = cards[cardId] || {};
  const [side, setSide] = useState(true);
// flipCard function will set the side to the opposite of what it is. If side is true, then it will be false. If side is false, then it will be true.
  function flipCard() {
    setSide(!side);
  }
// assign nextButton variable to a button element. If side is false, then the button will be displayed. Otherwise, it will be an empty string.
  const nextButton = !side ? (
    <button
      className='btn btn-primary btn-next'
      onClick={() => {
        setSide(true);
        handleNext();
      }}
    >
      Next
    </button>
  ) : (
    ""
  );
  //--------------RETURN-----------------
  return (
    <div className='card my-1 front'>
      <div
        className={classNames({ "card-body": true, front: side, back: !side })}
      >
        <h5 className='card-title'>
          Card {cardId + 1} of {cards.length}
        </h5>
        <p className='card-text front-text'>{card.front}</p>
        <p className='card-text back-text'>{card.back}</p>
        <button className='btn btn-secondary' onClick={flipCard}>
          Flip
        </button>
        {nextButton}
      </div>
    </div>
  );
  //-----------------END RETURN---------------------
}
//------------END FUNCTION AND COMPONENTS-----------------

//---------------------EXPORT-----------------


export default FlashCard;