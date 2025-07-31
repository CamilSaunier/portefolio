// filepath: /home/famacito/Bureau/Projects/portefolio/src/components/Navbar.jsx
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg fixed top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a href="#about">À propos</a>
            </li>
            <li>
              <a href="#skills">Compétences</a>
            </li>
            <li>
              <a href="#projects">Projets</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Portfolio</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="#about" className="hover:text-[#3b82f6] dark:hover:text-[#f59e42]">
              À propos
            </a>
          </li>
          <li>
            <a href="#skills" className="hover:text-[#3b82f6] dark:hover:text-[#f59e42]">
              Compétences
            </a>
          </li>
          <li>
            <a href="#projects" className="hover:text-[#3b82f6] dark:hover:text-[#f59e42]">
              Projets
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-[#3b82f6] dark:hover:text-[#f59e42]">
              Contact
            </a>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
