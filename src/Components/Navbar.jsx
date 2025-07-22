import { Link, NavLink } from "react-router-dom"
import { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";

export default function Navbar(){
    const [toggle, setToggle] = useState(false);


    const toggles = () => {
      setToggle(!toggle); 
    };

    return (
        <header className="bg-[#EEE] relative">
          <div className="coustom_container">
               <nav className="flex justify-between items-center py-4">
                   <Link to={"/"} className="text-2xl">E-Commerce <span className="text-blue-400">App</span></Link>
                   <ul className={`${toggle ? "show" : "hidden"} items-center gap-3 md:flex w-[60%] justify-between`}>
                        <div className="flex">
                           <li><NavLink   className={({ isActive }) =>
                           `${isActive ? "bg-white text-blue-400" : ""} p-3 rounded-lg`
                             } to={"/"}>Products</NavLink></li>
                        </div>
                          <div className={`flex items-center gap-4`}>
                            <Link to={"/cart"}><CiShoppingCart size={20}/></Link>
                        </div>
                   </ul>
                   <button onClick={toggles}  className="relative w-10 h-5 bg-white cursor-pointer md:hidden block custom-rounded">
                      <span className={`absolute  transition left-0 h-1 w-full bg-blue-400 rounded-sm ${toggle ? "top-2 rotate-45" : "top-0"}`}></span>
                      <span className={`absolute  transition left-0 h-1 w-full bg-blue-400 rounded-sm ${toggle ? "top-2  opacity-0" : "top-2"}`}></span>
                      <span className={`absolute  transition left-0 h-1 w-full bg-blue-400 rounded-sm ${toggle ? "top-2 -rotate-45" : "top-4"}`}></span>
                   </button>
               </nav>
          </div>
        </header>
    )
}