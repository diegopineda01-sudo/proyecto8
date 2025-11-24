import { useState } from "react";
import { useKanban } from "../context/useKanban";
import "../Styles/TaskCard.css"

export default function TaskCard({ task, column }) {
    const { moveTask, updateTask } = useKanban();
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);

    const moveTo = (target) => {
        moveTask(task.id, target);
    };

    const handleSave = () => {
        if (editTitle.trim()) {
            updateTask(task.id, editTitle);
            setIsEditing(false);
        }
    };

    return (
        <div className={`task-card ${column}`}>
            {isEditing ? (
                <div className="edit-container">
                    <input 
                        autoFocus
                        type="text" 
                        value={editTitle} 
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="edit-input"
                    />
                    <div className="edit-actions">
                        <button onClick={handleSave} className="btn-save">OK</button>
                        <button onClick={() => setIsEditing(false)} className="btn-cancel">X</button>
                    </div>
                </div>
            ) : (
                <div className="task-header">
                    <p className="title">{task.title}</p>
                    <button 
                        onClick={() => setIsEditing(true)} 
                        className="btn-edit"
                        title="Edit Task"
                    >
                        ✎
                    </button>
                </div>
            )}

            <div className="task-action">
                {column !== "todo" && (
                    <button className="botones" onClick={() => moveTo("todo")}>
                        Move to To do
                    </button>
                )}

                {column !== "doing" && (
                    <button className="botones" onClick={() => moveTo("doing")}>
                        Move to In-Progress
                    </button>
                )}

                {column !== "done" && (
                    <button className="botones" onClick={() => moveTo("done")}>
                        Move to Done
                    </button>
                )}
            </div>
        </div>
    );
}