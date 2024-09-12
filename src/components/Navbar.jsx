const Navbar = () => {
  return (
    <nav className=" w-full py-2 px-5 flex items-center justify-between">
      <div className="font-bold text-2xl text-green-400 tracking-wide">
        {"<PassManager/>"}
      </div>
      <div>
        <ul>
          <li className=" font-semibold text-slate-200">Home</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
