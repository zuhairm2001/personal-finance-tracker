import React, { useState } from "react";
import { Menu, X, Home, CreditCard, PieChart, User, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { name: "Home", icon: Home, link: "/" },
    { name: "Expenses", icon: CreditCard, link: "/expenses" },
    { name: "Investments", icon: PieChart, link: "/investments" },
    { name: "Budget Planning", icon: User, link: "/budget" },
    { name: "Login", icon: LogIn, link: "/login" },
  ];

  return (
    <header className="bg-indigo-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Finance Tracker</div>
        <nav className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <Link to={item.link}>
              <a
                key={item.name}
                href="#"
                className="flex items-center space-x-1 hover:text-indigo-200 transition duration-150 ease-in-out"
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </a>
            </Link>
          ))}
        </nav>
        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-4 pt-2 pb-4 space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href="#"
                className="block py-2 px-4 text-sm hover:bg-indigo-700 rounded transition duration-150 ease-in-out"
              >
                <div className="flex items-center space-x-2">
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </div>
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;
