import { CreateNewRoom } from "./components/room/createNewRoom";
import { DarkModeToggle } from "./config/theme";
import "./App.css";
function App() {
  return (
    <div className="min-h-screen bg-white  text-black dark:bg-black dark:text-white p-4">
      <div className="absolute top-5 right-5">
        <DarkModeToggle />
      </div>
      <div className="flex items-center min-h-screen max-w-xl mx-auto">
        <CreateNewRoom />
      </div>
    </div>
  );
}
export default App;
