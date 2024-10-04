import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import DoctorContextProvider from './contexts/DoctorContextProvider';
import AddDoctor from './pages/AddDoctor';
import Doctors from './pages/Doctors';

function App() {
  return (
    <div className="flex bg-[#3942d8] h-[100vh] w-[100vw]">
      <BrowserRouter>
      <DoctorContextProvider>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/addDoctor' element={<AddDoctor/>}></Route>
          <Route path='/doctors' element={<Doctors/>}></Route>
        </Routes>
        </DoctorContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
