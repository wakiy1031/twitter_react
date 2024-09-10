import "./App.css";
import { UIProvider } from "@yamada-ui/react";
import SignUp from "./components/SignUp";

function App() {
  return (
    <UIProvider>
      <SignUp />
    </UIProvider>
  );
}

export default App;
