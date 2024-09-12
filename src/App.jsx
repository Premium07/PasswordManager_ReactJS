import Footer from "./components/Footer";
import Manager from "./components/Manager";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <main className="w-full min-h-screen">
      {/* <div className="relative h-screen w-full bg-slate-950">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
          {" "}
          <Navbar />
        <Manager />
        </div>
      </div> */}
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      <Navbar />

      <Manager />

      <Footer />
    </main>
  );
};

export default App;
