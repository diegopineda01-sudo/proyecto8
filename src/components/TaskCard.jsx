import { useKanban } from "../context/useKanban";

export default function TaskCard({ task, column }) {
    const { moveTask } = useKanban();


    const moveLeft = () => {
        if (column === "doing") return moveTask(task.id, "todo")
        if (column === "done") return moveTask(task.id, "doing")
    }

    const moveRight = () => {
        if (column === "todo") return moveTask(task.id, "doing")
        if (column === "doing") return moveTask(task.id, "done")
    }

    return (
        <div className="task-card">
            <p>{task.title}</p>
            <div className="task-action">
                {column !== "todo" && (
                    <button onClick={moveLeft}>←</button>
                )}

                {column !== "done" && (
                    <button onClick={moveRight}>→</button>
                )}
            </div>

        </div>
    )
}