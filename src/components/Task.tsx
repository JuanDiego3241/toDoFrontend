import React, { JSX, useEffect, useState } from "react";
import "../index.css";
import { fetchTodos, createTodo, updateTodo, deleteTodo, Todo } from "./services/todos";

export const Task = (): JSX.Element => {
  const [items, setItems] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const loadTodos = async (f: typeof filter) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTodos(f);
      setItems(data);
    } catch (err: any) {
      console.error("Error fetching todos:", err);
      setError(err?.response?.data?.message || "Error cargando tareas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos(filter);
  }, [filter]);

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      console.error("Error deleting todo:", err);
      setError("No se pudo eliminar la tarea");
    }
  };

  const handleEdit = async (id: number) => {
    const item = items.find((it) => it.id === id);
    if (!item) return;
    const newTitle = window.prompt("Editar título:", item.title);
    if (newTitle === null) return;
    const newDesc = window.prompt("Editar descripción:", item.description ?? "");
    if (newDesc === null) return;
    try {
      const updated = await updateTodo(id, { title: newTitle, description: newDesc });
      setItems((prev) => prev.map((it) => (it.id === id ? updated : it)));
    } catch (err: any) {
      console.error("Error updating todo:", err);
      setError("No se pudo editar la tarea");
    }
  };

  const handleComplete = async (id: number) => {
    const item = items.find((it) => it.id === id);
    if (!item) return;
    try {
      const updated = await updateTodo(id, { completed: !item.completed });
      setItems((prev) => prev.map((it) => (it.id === id ? updated : it)));
    } catch (err: any) {
      console.error("Error toggling complete:", err);
      setError("No se pudo actualizar el estado");
    }
  };

  const handleAdd = async () => {
    const title = window.prompt("Título de la nueva tarea:", "Nueva tarea");
    if (!title) return;
    const description = window.prompt("Descripción (opcional):", "");
    try {
      const created = await createTodo({
        title,
        description: description ?? "",
        completed: false,
      });
      setItems((prev) => [created, ...prev]);
    } catch (err: any) {
      console.error("Error creating todo:", err);
      setError("No se pudo crear la tarea");
    }
  };

  const handleClose = () => {
    if (window.confirm("¿Estás seguro de que quieres cerrar la aplicación?")) {
      window.close();
    }
  };

  return (
    <div className="tasks-page">
      <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto 1rem", display: "flex", gap: 12, alignItems: "center", padding: "0 1rem", boxSizing: "border-box" }}>
        <button
          className="btn btn-complete"
          onClick={() => setFilter("all")}
          aria-pressed={filter === "all"}
          aria-label="Ver todas las tareas"
          style={{ opacity: filter === "all" ? 1 : 0.85, transform: filter === "all" ? "scale(1.02)" : "none" }}
        ><span className="btn-label">
          Todas
        </span>
        </button>

        <button
          className="btn btn-complete"
          onClick={() => setFilter("pending")}
          aria-pressed={filter === "pending"}
          aria-label="Ver tareas pendientes"
          style={{ opacity: filter === "pending" ? 1 : 0.85, transform: filter === "pending" ? "scale(1.02)" : "none" }}
        ><span className="btn-label">
          Pendientes
        </span>
        </button>

        <button
          className="btn btn-complete"
          onClick={() => setFilter("completed")}
          aria-pressed={filter === "completed"}
          aria-label="Ver tareas completadas"
          style={{ opacity: filter === "completed" ? 1 : 0.85, transform: filter === "completed" ? "scale(1.02)" : "none" }}
        ><span className="btn-label">
          Completadas
        </span>
        </button>

        <div style={{ flex: 1 }} />

        <button
          className="btn-close"
          onClick={handleClose}
          aria-label="Cerrar aplicación"
        >
          <span className="btn-close-label">X</span>
        </button>
      </div>
      <div className="tasks-stage">
        <main className="tasks-main">
          {loading && <p> Cargando tareas... </p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {items.map((item) => (
            <article
              key={item.id}
              className="task-card"
              aria-labelledby={`task-title-${item.id}`}
            >
              <div className="task-complete" aria-hidden="true">
                <button
                  onClick={() => handleComplete(item.id)}
                  className="btn btn-complete"
                  aria-label={`Marcar completado ${item.title}`}
                >
                  <span className="btn-label">{item.completed ? "Completado" : "Marcar"}</span>
                </button>
              </div>

              <div className="task-content">
                <h2
                  id={`task-title-${item.id}`}
                  className="task-title"
                  style={{ textDecoration: item.completed ? "line-through" : "none", opacity: item.completed ? 0.7 : 1 }}
                >
                  {item.title}
                </h2>

                <p className="task-desc">{item.description}</p>
              </div>

              <div className="task-actions">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn btn-delete"
                  aria-label={`Eliminar ${item.title}`}
                >
                  <span className="btn-label">Eliminar</span>
                </button>

                <button
                  onClick={() => handleEdit(item.id)}
                  className="btn btn-edit"
                  aria-label={`Editar ${item.title}`}
                >
                  <span className="btn-label">Editar</span>
                </button>
              </div>
            </article>
          ))}

          <button onClick={handleAdd} className="btn-add" aria-label="Agregar nuevo elemento">
            <span className="btn-add-symbol">+</span>
          </button>
        </main>
      </div>
    </div>
  );
};

export default Task;