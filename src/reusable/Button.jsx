import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = ({ falogoName, buttonName, colorClass, tColor, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center w-36 ml-1 rounded-xl p-3 ${tColor} ${colorClass} cursor-pointer`}
    >
      <FontAwesomeIcon icon={falogoName} className="text-2xl hover:text-inherit" />
      <div className="ml-3 hover:text-inherit">
        {buttonName}
      </div>
    </div>
  );
};

export default Button;