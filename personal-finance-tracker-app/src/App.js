import logo from "./logo.svg";
import "./App.css";
import header from "./components/headerComponent";
import FooterComponent from "./components/footerComponent";
import HeaderComponent from "./components/headerComponent";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <HeaderComponent />
        <main className="flex-grow container mx-auto px-4 py-8">
          {/* Your main content goes here */}
          <h1 className="text-3xl font-bold mb-4">
            Welcome to Finance Tracker
          </h1>
          <p>This is where your main application content will go.</p>
        </main>

        <FooterComponent />
      </div>
    </>
  );
}

export default App;
