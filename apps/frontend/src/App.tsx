import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { Dashboard } from "./components/Dashboard";
import { Reservation } from "./components/Reservation";
import { PageMain } from "./components/PageMain";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Admin } from "./components/Admin";
import { ReservationMade } from "./components/ReservationMade";
import { RoomForm } from "./components/EditPage";

function App() {
  return (
    <>
      <section className="flex justify-center min-w-screen min-h-screen">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PageMain />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard">
                <Route index element={<Dashboard />} />
                <Route path="reservations-made" element={<ReservationMade />} />
                <Route
                  path="reservations/:categoryId"
                  element={<Reservation />}
                />
              </Route>
            </Route>
            <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
              <Route path="/admin" element={<Admin />} />
              <Route
                path="/admin/users"
                element={<h2>Gestión de Usuarios</h2>}
              />
              <Route
                path="/admin/edit-room/:roomId"
                element={<RoomForm />}
              />
            </Route>
            <Route path="*" element={<h2>404 Not Found</h2>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </section>
    </>
  );
}

export default App;
