import api from "./api";

export type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export const fetchTodos = async (filter: "all" | "pending" | "completed" = "all"): Promise<Todo[]> => {
    const url = filter === "all" ? "/todos" : `/todos?filter=${filter}`;
    const { data } = await api.get<Todo[]>(url);
    return data;
  };

export const createTodo = async (payload: Omit<Todo, "id">): Promise<Todo> => {
  const { data } = await api.post<Todo>("/todos", payload);
  return data;
};

export const updateTodo = async (id: number, payload: Partial<Todo>): Promise<Todo> => {
  const { data } = await api.patch<Todo>(`/todos/${id}`, payload);
  return data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}`);
};
