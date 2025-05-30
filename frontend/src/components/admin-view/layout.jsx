import { Outlet } from "react-router-dom";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";

function AdminView() {
    return (
        <div>
            <AdminHeader/>
            <div>
                <AdminSidebar/> 
                <main>
                    <h1>Admin View</h1>
                </main>
            </div>
            <Outlet/>
        </div>
    )
}

export default AdminView;