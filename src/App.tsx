import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import GrandLayout from "./layout/GrandLayout";
import RoutesConfig from "./RoutesConfig";

function App() {
  return (
    <Router>
      <GrandLayout>
        <RoutesConfig />
      </GrandLayout>
    </Router>
  );
}

export default App;
