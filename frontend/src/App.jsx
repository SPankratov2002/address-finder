import React, { useState } from "react";
import Login from "./components/Login";
import AddressSearch from "./components/AddressSearch";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const saveToken = (userToken) => {
    localStorage.setItem("token", userToken);
    setToken(userToken);
  };

  return (
    <div>
      {!token ? (
        <Login setToken={saveToken} />
      ) : (
        <AddressSearch token={token} />
      )}
    </div>
  );
}

export default App;
