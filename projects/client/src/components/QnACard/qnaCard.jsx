import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const QnaCard = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer((prevState) => !prevState);
  };

  return (
    <div className="qnaCard px-48 py-4">
      <div className="flex justify-between items-center">
        <div className="question flex items-center gap-10 text-lg cursor-pointer" onClick={toggleAnswer}>
          <div className="mr-4">{question}</div>
          <div className="arrow-icon items-end">
            {showAnswer ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        </div>
      </div>
      {showAnswer && (
        <div className="text-base mt-4 ml-4">
          {answer}
        </div>
      )}
    </div>
  );
};

export default QnaCard;
