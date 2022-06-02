import { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FirebaseError } from "firebase/app";

console.log(process.env.REACT_APP_API_KEY);

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? 
      <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> :
      ("Initializing...")
      }
      <footer>
        &copy; {new Date().getFullYear()} Nwitter
      </footer>
    </>
  );
};

export default App;
