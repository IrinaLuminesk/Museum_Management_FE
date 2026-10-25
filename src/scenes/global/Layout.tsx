import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout() {
    return (
        <div className="app">
            <Sidebar />

            <main className="content">
                <Topbar />
                {/* Where the page will get render */}
                <Outlet />
            </main>
        </div>
    );
}