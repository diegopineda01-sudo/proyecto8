import { createContext, useState, useEffect } from "react";

const KanbanContext = createContext();

// Proveedor
export function KanbanProvider({ children }) {
  const [columns, setColumns] = useState({
    todo: [],
    doing: [],
    done: [],
  });


  useEffect(() => {
    let isMounted = true;

    const saved = localStorage.getItem("KanbanData");

    if (saved && isMounted) {
      // Hacer setState asíncrono para evitar el warning
      setTimeout(() => {
        if (isMounted) {
          setColumns(JSON.parse(saved));
        }
      }, 0);
      return;
    }

    fetch("https://dummyjson.com/todos?limit=5")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;

        const mapped = {
          todo: [],
          doing: [],
          done: [],
        };

        data.todos.forEach((t) => {
          const task = {
            id: t.id,
            title: t.todo,
          };

          if (t.completed) {
            mapped.done.push(task);
          } else {
            mapped.todo.push(task);
          }
        });

        setColumns(mapped);
      });

    return () => {
      isMounted = false;
    };
  }, []);


  useEffect(() => {
    localStorage.setItem("KanbanData", JSON.stringify(columns))
  }, [columns]);


  // Agregar Tarea 
  const addTask = (title) => {
    const newTask = { id: Date.now(), title };
    setColumns((prev) => ({
      ...prev, // Copia las columnas existentes
      todo: [...prev.todo, newTask], // Agrega una nueva tarea en la columna “todo” sin borrar las anteriores
    }));
  };

  // Mover tarea
  const moveTask = (taskId, toColumn) => {
    setColumns((prev) => {
      let task;
      const updated = { ...prev };

      // quitar tarea
      for (const key in updated) { //recorre todas la propiedades de updated
        updated[key] = updated[key].filter((t) => { // comprabamos que la condicion se cumpla 
          if (t.id === taskId) {
            task = t; //Guardamos la tarea para añadirla despues
            return false; // La quitamos del array actual 
          }
          return true; //Matiene todas la demas tareas
        });
      }

      // agregarla a la nueva columna
      if (task) updated[toColumn].push(task);

      return updated;
    });
  };

  return (
    <KanbanContext.Provider value={{ columns, addTask, moveTask }}>
      {children}
    </KanbanContext.Provider>
  );
}
