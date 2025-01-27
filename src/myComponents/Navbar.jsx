import React from 'react';
import { Link } from 'react-router-dom';
import { faUserCircle, faPiggyBank, faFileInvoice, faChartLine, faTableColumns, faClockRotateLeft, faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';
import Button from '../reusable/Button';
import logo from '../assets/logo.svg';

const Navbar = ({ setShowSignin, isLoggedIn }) => {
  const [selectedButton, setSelectedButton] = React.useState("Dashboard");

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div className="bg-offblack h-screen w-52 flex flex-col py-5">
      <Link to="/hero" className="flex text-l font-bold mt-5 mb-10 text-offwhite justify-left ml-8 cursor-pointer" onClick={() => handleButtonClick("Dashboard")}>
        <img src={logo} className="w-8 mr-2" alt="Logo" />
        <span className="text-xl">UniPlan</span>
      </Link>
      <nav className="flex flex-col font-semibold gap-3 items-start ml-4">
        <Link to="/hero" onClick={() => handleButtonClick("Dashboard")}>
          <Button
            falogoName={faTableColumns}
            buttonName="Dashboard"
            tColor={selectedButton === "Dashboard" ? "text-gray-300" : "text-offwhite"}
            colorClass={selectedButton === "Dashboard" ? "bg-gray-800" : ""}
          />
        </Link>
        <Link to="/todo" onClick={() => handleButtonClick("Todo")}>
          <Button
            falogoName={faClockRotateLeft}
            buttonName="Todo"
            tColor={selectedButton === "Todo" ? "text-gray-300" : "text-offwhite"}
            colorClass={selectedButton === "Todo" ? "bg-gray-800" : ""}
          />
        </Link>
        <div className='ml-1'>
        <Link to="/degree" onClick={() => handleButtonClick("Degree")}>
          <Button
            falogoName={faFileInvoice}
            buttonName="Degree"
            tColor={selectedButton === "Degree" ? "text-gray-300" : "text-offwhite"}
            colorClass={selectedButton === "Degree" ? "bg-gray-800" : ""}
          />
        </Link>
        </div>
        <Link to="/finances" onClick={() => handleButtonClick("Finances")}>
          <Button
            falogoName={faPiggyBank}
            buttonName="Finances"
            tColor={selectedButton === "Finances" ? "text-gray-300" : "text-offwhite"}
            colorClass={selectedButton === "Finances" ? "bg-gray-800" : ""}
          />
        </Link>
        <Link to="/internships" onClick={() => handleButtonClick("Internships")}>
          <Button
            falogoName={faChartLine}
            buttonName="Internships"
            tColor={selectedButton === "Internships" ? "text-gray-300" : "text-offwhite"}
            colorClass={selectedButton === "Internships" ? "bg-gray-800" : ""}
          />
        </Link>
        
        <div className="mt-72">
          {isLoggedIn ? (
            <Button
              falogoName={faUserCircle}
              buttonName="My Profile"
              tColor="text-white"
              colorClass="bg-gray-800"
              onClick={() => handleButtonClick("My Profile")}
            />
          ) : (
            <Button
              falogoName={faUserCircle}
              buttonName="Sign In"
              tColor="text-offblack justify-center"
              colorClass="bg-offwhite"
              onClick={() => {
                handleButtonClick("Sign In");
                setShowSignin(true);
              }}
            />
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
