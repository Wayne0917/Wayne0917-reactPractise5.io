import { Link, Outlet } from "react-router-dom";


const AdminLayout = () => {
    return ( <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid  d-flex justify-content-center">
            <ul className="navbar-nav p-4">
                <li className="nav-item">
                    <Link className="h4 mt-5 mx-2" to="products">
                        產品
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="h4 mt-5 mx-2" to="orders">
                        訂單
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
    <Outlet />
    </> );
}

export default AdminLayout;

