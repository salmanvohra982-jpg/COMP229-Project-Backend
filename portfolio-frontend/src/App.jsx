import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import ProjectsList from "./pages/ProjectsList.jsx";
import ProjectForm from "./pages/ProjectForm.jsx";
import UsersList from "./pages/UsersList.jsx";
import UserForm from "./pages/UserForm.jsx";
import "./App.css";

function App() {
  const navClass = ({ isActive }) =>
    "nav-link" + (isActive ? " nav-link--active" : "");

  return (
    <div className="app">
      <header className="navbar">
        <div className="navbar-brand">Portfolio Admin</div>
        <nav className="navbar-links">
          <NavLink to="/projects" className={navClass}>
            Projects
          </NavLink>
          <NavLink to="/users" className={navClass}>
            Users
          </NavLink>
        </nav>
      </header>

      <main className="content">
        <Routes>
          {/* Projects */}
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/projects/new" element={<ProjectForm />} />
          <Route path="/projects/edit/:id" element={<ProjectForm />} />

          {/* Users */}
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/:id/edit" element={<UserForm />} />

          {/* Default */}
          <Route path="*" element={<Navigate to="/projects" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Krish Singh – Portfolio Admin</span>
      </footer>
    </div>
  );
}

export default App;
