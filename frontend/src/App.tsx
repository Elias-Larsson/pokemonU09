import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  interface User {
    displayName: string;
    profilePhoto: string;
  }

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3020/api/GoogleUser", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="p-4 flex flex-col gap-4">
      {user ? (
        <>
          <p>Välkommen, {user.displayName}</p>
          <img
            src={user.profilePhoto}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <a
            href="http://localhost:3020/auth/logout"
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Logga ut
          </a>
        </>
      ) : (
        <a
          href="http://localhost:3020/auth/google"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Logga in med Google
        </a>
      )}
    </div>
  );
}

export default App;
