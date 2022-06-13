import './App.css';
import Signup from './component/signup'
import { Routes ,Route } from 'react-router-dom';
import Login from './component/login';
// import Logout from './component/logout';
// import Errorpage from './component/error';
import Landing from './component/landingpage'
import NewCandidate from './component/newcandidate';

const Routing=()=>{
  return(
    <>
      <Routes>
        <Route path="/" element={<Signup/>} />  
        <Route path="/landing" element={<Landing/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/newcandidate' element={<NewCandidate/>}/>
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
