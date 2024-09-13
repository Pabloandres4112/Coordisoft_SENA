import { ChevronFirst, ChevronLast, Power, ChevronDown, ChevronUp } from "lucide-react";
import logo from "../assets/inventarioslogo.png";
import { createContext, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ModalLogout } from "../configs/ModalLogout";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <aside className="h-screen bg-white text-black shadow-md border-r-1">
      <nav className="h-full flex flex-col justify-between">
        <div>
          <div className="px-4 py-3 flex justify-between items-center bg-gradient-to-r from-orange-500 to-red-500">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                className={`overflow-hidden duration-500 ease-out rounded-full ${
                  expanded ? "w-20" : "w-0"
                }`}
                alt="Logo"
              />
            </div>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-2 rounded-lg bg-white text-orange-500 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-200">
            <span className="ml-3 h-8 flex items-center text-gray-600">MENU</span>
            <SidebarContext.Provider value={{ expanded, setExpanded }}>
              <ul className="flex-1 px-2 mt-4 py-6 border-b border-gray-200">
                {children}
              </ul>
            </SidebarContext.Provider>
          </div>
        </div>
        <div className="flex p-3 bottom-5 w-full cursor-pointer border-t-[1px] border-opacity-45 border-gray-200">
          <Power className="ml-1 text-gray-600" size={20} />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-48 ml-3" : "w-0"
            }`}
          >
            <ModalLogout />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ nav, icon, text, alert }) {
  const { expanded } = useContext(SidebarContext);
  const { pathname } = useLocation();

  const isActive = pathname.startsWith(nav);

  return (
    <Link to={nav}>
      <li
        className={`relative flex items-center py-2 ${
          expanded ? "px-5" : "pl-4"
        } my-1 font-medium rounded-md cursor-pointer group ${
          isActive
            ? "bg-orange-500 text-white"
            : "hover:bg-orange-400 hover:text-white text-gray-700"
        }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all duration-300 ${
            expanded ? "w-48 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded-full bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          ></div>
        )}
        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-50 text-indigo-900 text-sm invisible opacity-0 transform -translate-x-3 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}

export function SidebarAccordion({ icon, text, children }) {
  const { expanded, setExpanded } = useContext(SidebarContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordionClick = () => {
    if (!expanded) {
      setExpanded(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="w-full">
      <div
        onClick={handleAccordionClick}
        className={`flex items-center justify-between cursor-pointer py-2 ${
          expanded ? "px-5" : "pl-4"
        } my-1 font-medium rounded-md bg-orange-100 hover:bg-orange-200 text-gray-700`}
      >
        <div className="flex items-center">
          {icon}
          {expanded && <span className="ml-3">{text}</span>}
        </div>
        {expanded && (isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />)}
      </div>
      <div
        className={`pl-8 overflow-hidden transition-max-height duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
