import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ExpensesPage from './pages/ExpensesPage';
import InvestmentsPage from './pages/InvestmentsPage';
import BudgetPage from './pages/BudgetPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/expenses",
    element: <ExpensesPage/>,
  },
  {
    path: "/investments",
    element: <InvestmentsPage/>,
  },
  {
    path: "/budget",
    element: <BudgetPage/>,
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);