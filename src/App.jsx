import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignUpPage } from "./pages/SignUpPage";
import { UIProvider } from "@yamada-ui/react";
import { HomePage } from "./pages/HomePage";
import { RecoilRoot } from "recoil";
import { useEffect } from "react";

export const App = () => {
  useEffect(() => {
    const element = document.querySelector("html");
    element.style.overflowY = "scroll";
    element.style.overscrollBehaviorY = "none";
  }, []);

  return (
    <RecoilRoot>
      <UIProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SignUpPage />} />
            <Route path="/login" element={<SignUpPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </Router>
      </UIProvider>
    </RecoilRoot>
  );
};
