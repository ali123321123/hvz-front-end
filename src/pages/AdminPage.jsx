import React from "react";
<<<<<<< HEAD
import AdminGameList from "../components/admin-pages/admin-gameCard/AdminGameList";

function AdminPage() {
  return <AdminGameList />;
=======
import AdminDashboard from "../components/admin-pages/admin-dashboard/AdminDashboard";
import AdminForm from "../components/admin-pages/AdminForm";
import Main from "../components/main/Main";

function AdminPage() {
  return (
    <Main>
      <AdminDashboard />
    </Main>
  );
>>>>>>> hvz-69-login-register-form
}

export default AdminPage;
