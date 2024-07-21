import React from 'react';
import { CgWebsite } from 'react-icons/cg';
import { FaStar } from 'react-icons/fa';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function LiveScreen({
  personalDetails,
  summary,
  education,
  professionalExperience,
  project,
  skills,
}) {
  const ratingStar = (rating) => {
    let star = [];
    for (let i = 1; i <= rating; i++) {
      star.push(<FaStar key={i} className="text-yellow-500" />);
    }
    return star;
  };
  const capitalFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="p-8 bg-white">
      {/* Personal Section */}
      {personalDetails && (
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">
            {personalDetails.name.toUpperCase()}
          </h1>
          <p
            className={`text-xl font-semibold  ${
              personalDetails.name && 'border-b-2'
            }`}
          >
            {capitalFirst(personalDetails.title)}
          </p>
          <div className="flex flex-col item-start space-x-4 text-gray-600 mt-2">
            <div className="flex flex-col  flex-1 justify-start gap-y-4">
              {personalDetails.email && (
                <div className="flex items-center space-x-1">
                  <FaEnvelope />
                  <span>{personalDetails.email}</span>
                </div>
              )}
              {personalDetails.phoneNumber && (
                <div className="flex items-center space-x-1">
                  <FaPhone />
                  <span>{personalDetails.phoneNumber}</span>
                </div>
              )}
              {personalDetails.address && (
                <div className="flex items-center space-x-1">
                  <FaMapMarkerAlt />
                  <span>{personalDetails.address}</span>
                </div>
              )}
              {personalDetails.website && (
                <div className="flex items-center space-x-1">
                  <CgWebsite />
                  <span>{personalDetails.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2">
            Summary
          </h2>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}

      {/* Skills */}
      {skills[0].skill && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2">
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex justify-start items-center gap-x-2 ">
                  <span>{skill.skill}</span>
                  <span className="flex">{ratingStar(skill.skillLevel)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education[0].degree && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">{edu.degree}</p>
              <p>{edu.school}</p>
              <p className="text-gray-700">
                <span>{edu.startDate}</span> - <span>{edu.endDate}</span>
              </p>
              <p className="text-gray-700">{edu.education_description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Professional Experience */}
      {professionalExperience[0].jobTitle && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2">
            Professional Experience
          </h2>
          {professionalExperience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{exp.jobTitle}</h3>
              <p>{exp.employer}</p>
              <p>{exp.location}</p>
              <p className="text-gray-700">
                <span>{exp.startDate}</span> - <span>{exp.endDate}</span>
              </p>
              <p className="text-gray-700">{exp.professional_description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {project[0].projectTitle && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2">
            Projects
          </h2>
          {project.map((pro, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{pro.projectTitle}</h3>
              <a
                href={pro.url}
                className="text-blue-500 hover:underline"
                alt="link"
              >
                Link
              </a>
              <p className="text-gray-700">
                <span>{pro.startDate}</span> - <span>{pro.endDate}</span>
              </p>
              <p className="text-gray-700">{pro.project_Description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LiveScreen;
