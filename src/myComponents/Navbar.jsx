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
      <Link to="/hero" className="flex text-l font-bold mt-5 mb-10 text-offwhite justify-center cursor-pointer" onClick={() => handleButtonClick("Dashboard")}>
        <img src={logo} className="w-8 mr-2" alt="Logo" />
        <span className="text-xl">wattthetrade</span>
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
        <Link to="/trading" onClick={() => handleButtonClick("Trading")}>
          <Button
            falogoName={faMoneyBillTrendUp}
            buttonName="Trading"
            tColor={selectedButton === "Trading" ? "text-gray-300" : "text-offwhite"}
            colorClass={selectedButton === "Trading" ? "bg-gray-800" : ""}
          />
        </Link>
        <Link to="/trade-log" onClick={() => handleButtonClick("Trade Log")}>
          <Button
            falogoName={faClockRotateLeft}
            buttonName="Trade Log"
            tColor={selectedButton === "Trade Log" ? "text-gray-300" : "text-offwhite"}
            colorClass={selectedButton === "Trade Log" ? "bg-gray-800" : ""}
          />
        </Link>
        <Link to="/roi-dashboard" onClick={() => handleButtonClick("ROI DashB")}>
          <Button
            falogoName={faFileInvoice}
            buttonName="ROI DashB"
            tColor={selectedButton === "ROI DashB" ? "text-gray-300" : "text-offwhite"}
            colorClass={selectedButton === "ROI DashB" ? "bg-gray-800" : ""}
          />
        </Link>
        <Link to="/incentives" onClick={() => handleButtonClick("Incentives")}>
          <Button
            falogoName={faPiggyBank}
            buttonName="Incentives"
            tColor={selectedButton === "Incentives" ? "text-gray-300" : "text-offwhite"}
            colorClass={selectedButton === "Incentives" ? "bg-gray-800" : ""}
          />
        </Link>
        <Link to="/analytics" onClick={() => handleButtonClick("Analytics")}>
          <Button
            falogoName={faChartLine}
            buttonName="Analytics"
            tColor={selectedButton === "Analytics" ? "text-gray-300" : "text-offwhite"}
            colorClass={selectedButton === "Analytics" ? "bg-gray-800" : ""}
          />
        </Link>
        
        <div className="mt-48">
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
