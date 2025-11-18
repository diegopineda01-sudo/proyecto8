import { useRef } from "react";

export default function SearchFilter ({ setSearch }) {
    const inputRef = useRef();

    const handleChange = () => {
        setSearch(inputRef.current.value)
    }

    return(
        <div className="search-filter">
            <input type="text" ref={inputRef} onChange={handleChange} placeholder="Buscar Tareas"/>
        </div>
    )
}