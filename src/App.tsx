import { useEffect, useState } from "react";
import type { Task } from "./types/Task";
import { getTasks } from "./api/tasks";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);
  console.log("tasks = ", tasks)

  return (
    <div>
      <h1>Task Manager</h1>
      {tasks.map((task) => (
        <div key={task.id}>
          {task.title}
        </div>
      ))}
    </div>
  );
}

export default App;