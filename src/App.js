import { useState } from 'react';
import './App.css';
import Dashboard from './Pages/Dashboard';
import Resume from './Pages/Resume';
import Preview from './Components/Preview';
import DemoComponent from './DemoComponent';
import LiveScreen from './Components/LiveScreen';
import { Link, Route, Routes } from 'react-router-dom';
import ResumeDetails from './Pages/ResumeDetails';
import { SiHomebridge } from 'react-icons/si';

function App() {
  const [resume, setResume] = useState([]);
  return (
    <div className="bg-[#f0eeeb]">
      <Link to={'/'}>
        <div className="fixed bg-orange-500 rounded-full top-6 left-6  ">
          <SiHomebridge size={50} />
        </div>
      </Link>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/resumeBuild"
          element={<Resume resume={resume} setResume={setResume} />}
        />
        <Route path="/edits/:id" element={<ResumeDetails />} />
      </Routes>

      {/* 
      <div className="mx-20 pt-10">
      <Resume resume={resume} setResume={setResume} />
      </div> */}
    </div>
  );
}

export default App;
