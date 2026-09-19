import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import type { Task } from "./types/Task";
import { getTasks } from "./api/tasks";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    isLoading,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const loadTasks = async () => {
      try {
        const token = await getAccessTokenSilently();

        const tasks = await getTasks(token);
        console.log("tasks = ", tasks)
        setTasks(tasks);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };

    loadTasks();
  }, [isAuthenticated, getAccessTokenSilently]);
  console.log("isAuthenticated = ", isAuthenticated)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Task Manager</h1>

      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>
          Log In
        </button>
      ) : (
        <>
          <p>Logged in as {user?.email}</p>

          <button
            onClick={() =>
              logout({
                logoutParams: {
                  returnTo: window.location.origin,
                },
              })
            }
          >
            Log Out
          </button>

          {tasks.map((task) => (
            <div key={task.id}>
              {task.title}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;