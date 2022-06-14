import './App.css';
import Signup from './component/signup'
import { Routes ,Route } from 'react-router-dom';
import Login from './component/login';
import Landing from './component/landingpage'
import NewCandidate from './component/newcandidate';
import EditCandidate from './component/editcandidate';


const Routing=()=>{
  return(
    <>
      <Routes>
        <Route path="/" element={<Signup/>} />  
        <Route path="/login" element={<Login/>} />
        <Route path="/landing" element={<Landing/>} />
        <Route path='/newcandidate' element={<NewCandidate/>}/>
        <Route path="/editcandidate/:id" element={<EditCandidate/>}/>
      </Routes>
    </>
  )
}


function App() {
  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default App;
