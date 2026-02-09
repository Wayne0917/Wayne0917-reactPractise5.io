import { Outlet, Link } from "react-router-dom";

export const FrontendLayout = () => {
    return (<>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid  d-flex justify-content-center">
            <ul className="navbar-nav p-4 ">
                <li className="nav-item">
                    <Link className="h4 mt-5 mx-2" to="/">
                        首頁
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="h4 mt-5 mx-2" to="/products">
                        產品
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="h4 mt-5 mx-2" to="/cart">
                        購物車
                    </Link>            
                </li>
                <li className="nav-item text-end">
                    <Link className="h4 mt-5 mx-2" to="/login">
                        登入
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
    
        <main>
            <Outlet />
        </main>
        <footer className="mt-5 text-center sticky-bottom">
            <p>© 2025 我的網站</p>
        </footer>
    </>
    ) 
}

export default FrontendLayout;