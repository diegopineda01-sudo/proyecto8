import { useState } from 'react'
import SearchFilter from './components/SearchFilter'
import Board from './components/Board'

function App() {
  const[filterTerm, setFilterTerm] = useState("");

  return (
    <div className='app-container'>
      <h1>Kanban Board</h1>
      <SearchFilter onFilter={setFilterTerm} />
      <Board filterTerm={filterTerm} />
    </div>
  )
}

export default App;
