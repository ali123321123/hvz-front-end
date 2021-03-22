import React from "react";
import AdminDashboard from "../components/admin-pages/admin-dashboard/AdminDashboard";
import AdminForm from "../components/admin-pages/AdminForm";
import Main from "../components/main/Main";

function AdminPage() {
  return (
    <Main>
      <AdminDashboard />
    </Main>
  );
}

export default AdminPage;
