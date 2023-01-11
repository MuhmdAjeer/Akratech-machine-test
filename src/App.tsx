import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

function App() {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(users.length || 0);
  const [loading, setLoading] = useState(false);

  const URL = "https://randomuser.me/api/?results=50";

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(URL);
      localStorage.setItem("users", JSON.stringify(data.results));
      setUsers(data.results);
      setCount(data.results.length);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const deleteUser = (id: string) => {
    let users = JSON.parse(localStorage.getItem("users") || "");
    users = users.filter((user: any) => user.login.uuid !== id);
    localStorage.setItem("users", JSON.stringify(users));
    setUsers(users);
    setCount(users.length);
  };

  useEffect(() => {
    setLoading(true);
    let users;
    let data = localStorage.getItem("users") || "";
    if (data) users = JSON.parse(data);
    if (!users) {
      fetchUsers();
    } else {
      setUsers(users);
      setCount(users.length);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <div style={{ marginLeft: "35px" }}>
        <h1>Total Users : {count}</h1>
        <Button variant="contained" size="small" onClick={fetchUsers}>
          Refresh
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          height: "auto",
          maxWidth: "100%",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {users?.map((user: any) => (
          <UserCard delete={deleteUser} user={user} />
        ))}
      </div>
    </>
  );
}

export default App;
