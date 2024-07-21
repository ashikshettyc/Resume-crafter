import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CgFileAdd } from 'react-icons/cg';
import Preview from '../Components/Preview';

import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const [profile, setProfile] = useState([]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('resumeBuild');
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const posting = await axios.get('/api');

        const Data = posting?.data;
        console.log(Data);
        setProfile(Data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8 pt-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-purple-900">My resumes</h1>
        </div>

        <div className="flex flex-col items-end md:flex md:flex-row gap-6">
          <div
            onClick={handleClick}
            className="flex flex-col items-center justify-center h-80 w-56 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <CgFileAdd className="text-5xl text-pink-500 mb-2" />
            <span className="text-gray-700 font-medium">ADD RESUME</span>
          </div>
          {profile?.map((item, index) => (
            <Link
              to={`/edits/${item.id}`}
              key={item.id}
              className="h-80 w-56 bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <div className="flex-grow overflow-hidden">
                <div className="w-full h-full scale-[0.25] origin-top-left transform">
                  <div className="w-[400%] h-[400%]">
                    <Preview resumeData={item} />
                  </div>
                </div>
              </div>
              <div className="p-4 border-t">
                <h3 className="font-semibold text-gray-800">
                  Resume No. {index + 1}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
