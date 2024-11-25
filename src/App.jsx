import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignUpPage } from "./pages/SignUpPage";
import { UIProvider } from "@yamada-ui/react";
import { HomePage } from "./pages/HomePage";
import { RecoilRoot } from "recoil";
import { useEffect } from "react";
import { PostDetailPage } from "./pages/PostDetailPage";
import { UserPage } from "./pages/UserPage";
import { Provider } from "react-redux";
import { store } from "./app/store";

export const App = () => {
  useEffect(() => {
    const element = document.querySelector("html");
    element.style.overflowY = "scroll";
    element.style.overscrollBehaviorY = "none";
  }, []);

  return (
    <Provider store={store}>
      <RecoilRoot>
        <UIProvider>
          <Router>
            <Routes>
              <Route path="/" element={<SignUpPage />} />
              <Route path="/login" element={<SignUpPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/:username/:postId" element={<PostDetailPage />} />
              <Route path="/users/:id" element={<UserPage />} />
            </Routes>
          </Router>
        </UIProvider>
      </RecoilRoot>
    </Provider>
  );
};
