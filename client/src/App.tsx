import { Room } from "./components/room/room";
import { DarkModeToggle } from "./config/theme";
import "./App.css";
function App() {
  return (
    <div className="min-h-screen bg-white  text-black dark:bg-black dark:text-white p-4">
      <div className="absolute top-5 right-5">
        <DarkModeToggle />
      </div>
      <div className="flex items-center min-h-screen min-w-2xl md:max-w-xl  mx-auto">
        <Room />
      </div>
    </div>
  );
}
export default App;
