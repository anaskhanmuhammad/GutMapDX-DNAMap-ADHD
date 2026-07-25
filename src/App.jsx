import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Report from "./Report.jsx";
import { GlobalDataProvider } from "./context/GlobalDataProvider";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/:id"
            element={
              <GlobalDataProvider>
                <Report />
              </GlobalDataProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
