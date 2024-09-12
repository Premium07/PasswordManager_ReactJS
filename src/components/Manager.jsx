import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyData = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
  });

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  };

  const managePassword = (e) => {
    e.preventDefault();

    if (
      form.site.length > 4 &&
      form.username.length > 4 &&
      form.password.length > 4
    ) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      toast.success("Password Added.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setForm({
        site: "",
        username: "",
        password: "",
      });
    }
  };

  const deletePass = (id) => {
    let c = confirm("Do you really want to delete it?");
    if (c) {
      setPasswordArray(passwordArray.filter((data) => data.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((data) => data.id !== id))
      );
    }
    toast.success("Password Deleted Successfully.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const editPass = (id) => {
    setForm(passwordArray.filter((data) => data.id === id)[0]);
    setPasswordArray(passwordArray.filter((data) => data.id !== id));
  };

  return (
    <section className="container min-h-[83vh] mx-auto sm:w-9/12 mt-2 p-4 text-white">
      <ToastContainer />
      <div className="text-center">
        <h1 className="text-3xl">
          <span className="text-green-400">&lt;</span>
          <span>Pass</span>
          <span className="text-green-400">Manager</span>
          <span className="text-green-400">/&gt;</span>
        </h1>
        <p className="text-green-400 text-lg mt-1">
          Manage your passwords for your own convenience.
        </p>
      </div>
      <form onSubmit={managePassword} className="flex flex-col p-4 mt-2 gap-5">
        <input
          type="text"
          placeholder="Enter website URL"
          name="site"
          value={form.site}
          onChange={handleChange}
          className="bg-transparent border-2 border-green-800 rounded-sm outline-none p-3"
        />
        <div className="flex flex-col md:flex-row gap-5">
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="bg-transparent border-2 border-green-800 rounded-sm outline-none p-3 w-full"
          />
          <div className="relative w-full">
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="Enter Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="bg-transparent border-2 border-green-800 rounded-sm outline-none p-3 w-full"
            />
            <span
              className="absolute right-5 cursor-pointer text-lg top-1/2 -translate-y-1/2"
              onClick={togglePassword}
            >
              {passwordShown ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-fit flex items-center justify-center px-4 py-1 bg-green-400 text-zinc-900 rounded-sm hover:bg-green-500 font-semibold tracking-wide"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#109121"
            ></lord-icon>
            Save Password
          </button>
        </div>
      </form>
      <div className="mt-2">
        <h2 className="text-xl text-green-500">Your Passwords:</h2>
        {passwordArray.length === 0 ? (
          <div className="flex items-center justify-center">
            <h3 className="text-xl text-green-500">No Passwords to Show.</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-2 border-green-400 mt-4 overflow-hidden rounded-md mb-5">
              <thead className="bg-green-500 text-black">
                <tr className="">
                  <th className="py-2 px-2 text-left">Site URL</th>
                  <th className="py-2 px-2 text-left">Username</th>
                  <th className="py-2 px-2 text-left">Password</th>
                  <th className="py-2 px-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-200 text-black">
                {passwordArray.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className="p-2 border border-white">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <a
                            href={data.site}
                            target="_blank"
                            className="truncate max-w-[150px] sm:max-w-[200px]"
                          >
                            {data.site}
                          </a>
                          <div
                            className="mt-1 sm:mt-0 cursor-pointer"
                            onClick={() => copyData(data.site)}
                          >
                            <lord-icon
                              style={{ width: "25px", height: "25px" }}
                              src="https://cdn.lordicon.com/xpgofwru.json"
                              trigger="hover"
                              colors="primary:#16c72e"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 border border-white">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <span className="truncate max-w-[150px]">
                            {data.username}
                          </span>
                          <div
                            className="mt-1 sm:mt-0 cursor-pointer"
                            onClick={() => copyData(data.username)}
                          >
                            <lord-icon
                              style={{ width: "25px", height: "25px" }}
                              src="https://cdn.lordicon.com/xpgofwru.json"
                              trigger="hover"
                              colors="primary:#16c72e"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 border border-white">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <span className="truncate max-w-[150px]">
                            {data.password}
                          </span>
                          <div
                            className="mt-1 sm:mt-0 cursor-pointer"
                            onClick={() => copyData(data.password)}
                          >
                            <lord-icon
                              style={{ width: "25px", height: "25px" }}
                              src="https://cdn.lordicon.com/xpgofwru.json"
                              trigger="hover"
                              colors="primary:#16c72e"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 border border-white">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                          <span
                            className="cursor-pointer"
                            onClick={() => editPass(data.id)}
                          >
                            <lord-icon
                              style={{ width: "25px", height: "25px" }}
                              src="https://cdn.lordicon.com/wkvacbiw.json"
                              trigger="hover"
                              colors="primary:#16c72e"
                            ></lord-icon>
                          </span>
                          <span
                            className="cursor-pointer"
                            onClick={() => deletePass(data.id)}
                          >
                            <lord-icon
                              style={{ width: "25px", height: "25px" }}
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              colors="primary:#16c72e"
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Manager;
