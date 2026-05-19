import { KidaMark } from "./KidaMark";

export function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-logo">
          <span className="mark">
            <KidaMark size={26} />
          </span>
          <span>Kiɗa</span>
        </a>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#marketplace">Library</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="nav-cta">
          {/* <a className="sign-in" href="#">
            Sign in
          </a> */}
          <a className="btn btn-primary btn-sm" href="#download">
            Get Kiɗa
          </a>
        </div>
      </div>
    </nav>
  );
}
