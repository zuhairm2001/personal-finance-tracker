import React from 'react';
import { Github, X , Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Finance Tracker</h2>
            <p className="text-sm mt-2">Empowering your financial decisions</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-indigo-400 transition duration-150 ease-in-out">
              <Github size={24} />
            </a>
            <a href="#" className="hover:text-indigo-400 transition duration-150 ease-in-out">
              <X size={24} />
            </a>
            <a href="#" className="hover:text-indigo-400 transition duration-150 ease-in-out">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-center">
          <p>&copy; {currentYear} Finance Tracker. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-indigo-400 transition duration-150 ease-in-out">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400 transition duration-150 ease-in-out">Terms of Service</a>
            <a href="#" className="hover:text-indigo-400 transition duration-150 ease-in-out">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
