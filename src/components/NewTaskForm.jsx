import { useState } from "react";

import { useKanban } from "../context/useKanban";

export default function AddTask(){
    const {title, setTitle} = useState("");
    const { addTask } = useKanban();

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!title.trim()) return; //Evita tareas Vacias
        addTask(title), //Agrega la tarea
        setTitle(""); //Limpia el input
    }

    return(
        <form onSubmit={handleSubmit} className="AddTask">
        <input 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Nueva tarea"
        />
        <button type="submit">Agregar</button> 
        </form>
    );
}