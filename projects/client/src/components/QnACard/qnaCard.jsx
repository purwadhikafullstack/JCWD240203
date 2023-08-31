import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const QnaCard = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col w-full md:w-[600px] h-[175px] md:h-[125px]">
      <div className="flex justify-between items-center">
        <div className="question flex items-center gap-10 text-lg cursor-pointer" onClick={toggleAnswer}>
          <div className="mr-4">{question}</div>
          <div className="arrow-icon items-end">
            {showAnswer ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        </div>
      </div>
      <div className={`${(showAnswer)? 'h-full' : 'h-[0px]'} transition-all duration-400 overflow-hidden text-base mt-4`}>
        {answer}
      </div>
    </div>
  );
};

export default QnaCard;
