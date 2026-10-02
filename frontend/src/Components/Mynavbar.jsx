import { Link } from "react-router-dom";
import "./Mynavbar.css";

export default function Mynavbar() {
  return (
    <header className="bk-navbar">
      <div className="bk-nav-inner">

        {/* BRAND */}
        <div className="bk-brand">
        <Link to="/"><img src="/PennyLogo.png" alt="/logo" /></Link>  
          <span>PennyPocket</span>
        </div>

        {/* LINKS */}
        <nav className="bk-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Login</Link>
          <Link to="/register" className="bk-cta">
            Get started free
          </Link>
        </nav>

      </div>
    </header>
  );
}
