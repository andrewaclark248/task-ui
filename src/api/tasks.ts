import type { Task } from "../types/Task";

export async function getTasks(token: string): Promise<Task[]> {
  const response = await fetch("http://localhost:8080/api/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get tasks: ${response.status}`);
  }

  return response.json();
}