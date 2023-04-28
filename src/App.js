import './reset.css';
import './index.css';
import './app.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import Single from './components/Single';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/create" element={<Create />}></Route>
      <Route path="/update/:jobID" element={<Create />}></Route>
      <Route path="/single/:jobID" element={<Single />}></Route>
    </Routes>
  );
}

export default App;
