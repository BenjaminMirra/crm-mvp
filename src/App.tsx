import { Routes, Route } from "react-router-dom";
import HomeView from "./views/HomeView";
import SalesView from "./views/SalesView";
import ExpensesView from "./views/ExpensesView";
import MainLayout from "./views/MainLayout";
import NotFoundView from "./views/NotFoundView";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomeView />} />
        <Route path="ventas" element={<SalesView />} />
        <Route path="gastos" element={<ExpensesView />} />
        <Route path="*" element={<NotFoundView />} />
      </Route>
    </Routes>
  );
}

export default App;
