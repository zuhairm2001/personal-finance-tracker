import React from "react";
import FooterComponent from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";

function ExpensesPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <HeaderComponent />
        <main className="flex-grow container mx-auto px-4 py-8">
          {/* Your main content goes here */}
          <h1 className="text-3xl font-bold mb-4">Expenses Page</h1>
          <p>This is where your main application content will go.</p>
        </main>
        <FooterComponent />
      </div>
    </>
  );
}

export default ExpensesPage;
