import TaskCard from "./TaskCard";

export default function BoardColumn({ title, tasks, columnKey }) {
    return (
        <div className="board-column">
            <h2>
                {title}
            </h2>
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        column={columnKey}
                    />
                ))
            ) : (
                <p className="empty">No hay tareas</p>
            )
            }
        </div>
    )
}