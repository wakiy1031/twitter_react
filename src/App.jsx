import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignUpPage } from "./pages/SignUpPage";
import { UIProvider } from "@yamada-ui/react";

export const App = () => {
  return (
    <UIProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/login" element={<SignUpPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    </UIProvider>
  );
};
