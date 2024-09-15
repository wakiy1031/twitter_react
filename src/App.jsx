import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignUpPage } from "./pages/SignUpPage";
import { UIProvider } from "@yamada-ui/react";
import { HomePage } from "./pages/HomePage";

export const App = () => {
  return (
    <UIProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    </UIProvider>
  );
};
