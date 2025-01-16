import { DarkModeToggle } from "./config/theme";

function App() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-4">
      <div className="absolute top-5 right-5">
        <DarkModeToggle />
      </div>
      <h1> home</h1>
    </div>
  );
}
export default App;
