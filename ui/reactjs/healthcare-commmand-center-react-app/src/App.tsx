import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import CommandCenterPage from "./pages/CommandCenterPage";

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          index
          element={
            <Navigate
              to="/command-center"
              replace
            />
          }
        />

        <Route
          path="command-center"
          element={<CommandCenterPage />}
        />
      </Route>
    </Routes>
  );
};

export default App;