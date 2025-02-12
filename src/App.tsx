import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import { Provider } from "react-redux";
import { Dashboard } from "./pages/Dashboard";
import { OrderPage } from "./pages/OrderPage";
import { Toaster } from "./components/ui/toaster";
import { store } from "./store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/order/:id" element={<OrderPage />} />
          </Routes>
        </DashboardLayout>
      </Router>
      <Toaster />
    </Provider>
  );
}

export default App;
