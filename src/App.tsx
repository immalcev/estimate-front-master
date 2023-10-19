import React from 'react';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import ProjectPage from './pages/ProjectPage';
import { Route, Routes } from "react-router-dom";
import StaffPage from "./pages/StaffPage";
import ProjectRolesPage from "./pages/ProjectRolesPage";
import CreatePage from "./pages/CreatePage";
import { RequireAuth } from 'react-auth-kit';
import CreateUserPage from './pages/CreateUserPage';


function App() {

  const [projects, setProjects] = React.useState([]);

  return (
    <>
      <Routes>
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/" element={<RequireAuth loginPath="/loginpage">
          <MainPage projects={projects} persons={projects} />
        </RequireAuth>} />
        <Route path="/ProjectPage/:id" element={<ProjectPage projects={projects} project={projects}
        />} />
        <Route path="/StaffPage" element={<StaffPage />} />
        <Route path="/CreatePage" element={<CreatePage />} />
        <Route path="/CreateUserPage" element={<CreateUserPage />} />
        <Route path="/ProjectPage/:id/ProjectRolesPage" element={<ProjectRolesPage />} />
      </Routes>
    </>
  );
}

export default App;