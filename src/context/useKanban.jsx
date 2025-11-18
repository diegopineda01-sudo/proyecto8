import { useContext } from "react";
import { kanbanContext } from "./KanbanContext";

export const useKanban = () => useContext(kanbanContext);