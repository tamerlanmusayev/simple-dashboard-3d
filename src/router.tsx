import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import DesignersPage from "./pages/DesignersPage";
import EditorPage from "./pages/EditorPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/designers" replace />} />
        <Route path="/designers" element={<DesignersPage />} />
        <Route path="/editor" element={<EditorPage />} />
      </Route>
    </Routes>
  );
};
