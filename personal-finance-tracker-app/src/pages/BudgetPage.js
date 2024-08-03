import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";

function BudgetPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <HeaderComponent />
        <main className="flex-grow container mx-auto px-4 py-8">
          {/* Your main content goes here */}
          <h1 className="text-3xl font-bold mb-4">Budget Page</h1>
          <p>This is where your main application content will go.</p>
        </main>
        <FooterComponent />
      </div>
    </>
  );
}

export default BudgetPage;
