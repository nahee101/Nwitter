import { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

console.log(process.env.REACT_APP_API_KEY);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  console.log(authService.currentUser)
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>
        &copy; {new Date().getFullYear()} Nwitter
      </footer>
    </>
  );
};

export default App;
