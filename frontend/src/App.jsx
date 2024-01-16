import {Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import EditTodo from './pages/EditTodo'

const App = () => {

  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />}/>
        <Route path='/' element={<Home />}/>
        <Route path='/edit/:id' element={<EditTodo />}/>
      </Routes>
    </>
    
  )
}

export default App
