import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { TrolleyFormProvider } from "./contexts/TrolleyFormContext";
import { LabelShapesProvider } from "./contexts/LabelShapesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

window.onerror = (msg, url, lineNo, columnNo, error) => {
  console.error("Global error:", { msg, url, lineNo, columnNo, error });
  return false; // Allow default handling too
};

window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
});

root.render(
  <ErrorBoundary>
    <Router>
      <CurrentUserProvider>
        <TrolleyFormProvider>
          <LabelShapesProvider>
            <App />
          </LabelShapesProvider>
        </TrolleyFormProvider>
      </CurrentUserProvider>
    </Router>
  </ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
