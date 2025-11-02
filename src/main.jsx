import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

import App from "./App.jsx";
import Inventario from "./Inventario.jsx";
import Login from "./pages/Login.jsx";
import Donaciones from "./pages/Donaciones.jsx";
import Certificados from "./pages/Certificados.jsx";
import Panel from "./pages/Panel.jsx";
import NoAuth from "./pages/NoAuth.jsx";
import NotFound from "./pages/NotFound.jsx";
import RegistroUsuarios from "./pages/RegistroUsuarios.jsx";
import Usuarios from "./pages/Usuarios.jsx"
import Prestamos from "./pages/Prestamos.jsx";
import RegistroEmpleados from "./pages/RegistroEmpleados.jsx";

import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/panel"
            element={
              <PrivateRoute roles={["admin", "empleado"]}>
                <Panel />
              </PrivateRoute>
            }
          />

          <Route
            path="/donaciones"
            element={
              <PrivateRoute roles={["admin", "empleado"]}>
                <Donaciones />
              </PrivateRoute>
            }
          />

          <Route
            path="/certificados"
            element={
              <PrivateRoute roles={["admin", "empleado"]}>
                <Certificados />
              </PrivateRoute>
            }
          />

          <Route
            path="/registro_usuarios"
            element={
              <PrivateRoute roles={["admin","empleado"]}>
                <RegistroUsuarios />
              </PrivateRoute>
          }
          />

          <Route
            path="/usuarios"
            element={
              <PrivateRoute roles={["admin","empleado"]}>
                <Usuarios />
              </PrivateRoute>
          }
          />

          <Route
            path="/prestamos"
            element={
              <PrivateRoute roles={["admin","empleado"]}>
                <Prestamos />
              </PrivateRoute>
            }
          />

          <Route
            path="/registro_empleados"
            element={
              <PrivateRoute roles={["admin"]}>
                <RegistroEmpleados />
              </PrivateRoute>
            }
          />

          <Route path="/403" element={<NoAuth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
