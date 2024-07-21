import axios from 'axios';
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import { v4 as uuidv4 } from 'uuid';
import LiveScreen from '../Components/LiveScreen';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';

import { useNavigate, useParams } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { RiProfileFill } from 'react-icons/ri';
import { FaBriefcase, FaFolderOpen, FaGraduationCap } from 'react-icons/fa';
import { FaUserGear } from 'react-icons/fa6';
function Resume({ resume, setResume }) {

  const {id} = useParams()

const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
        resume:"Resume name",
      personalDetails: {
        name: '',
        title: '',
        email: '',
        phoneNumber: '',
        address: '',
        website: '',
      },
      summary: '',
      education: [
        {
          degree: '',
          school: '',
          startDate: '',
          endDate: '',
          education_description: '',
        },
      ],
      professionalExperience: [
        {
          jobTitle: '',
          employer: '',
          startDate: '',
          endDate: '',
          location: '',
          professional_description: '',
        },
      ],
      project: [
        {
          projectTitle: '',
          url: '',
          startDate: '',
          endDate: '',
          project_Description: '',
        },
      ],
      skills: [
        {
          skill: '',
          skillLevel: '',
        },
      ],
    },
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = form;

  const {
    fields: educationFields,
    append: educationAppend,
    remove: educationRemove,
  } = useFieldArray({
    name: 'education',
    control,
  });

  const {
    fields: professionalFields,
    append: professionalAppend,
    remove: professionalRemove,
  } = useFieldArray({
    name: 'professionalExperience',
    control,
  });

  const {
    fields: projectFields,
    append: projectAppend,
    remove: projectRemove,
  } = useFieldArray({
    name: 'project',
    control,
  });

  const {
    fields: skillFields,
    append: skillAppend,
    remove: skillRemove,
  } = useFieldArray({
    name: 'skills',
    control,
  });
  const onSubmit = (data) => {
    const getData = async () => {
      try {
        const posting = await axios.post(
          '/api',
          { id: uuidv4(),data },
          {
            header: {
              'Content-type': 'application/json',
            },
          },
        
        );
        setResume(posting);
navigate("/")
        console.log(resume)
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  };
const personalDetails = watch("personalDetails")
const summary = watch("summary")
const education = watch("education")
const professionalExperience = watch("professionalExperience")
const project = watch("project")
const skills = watch("skills")


const [isOpen, setIsOpen] = useState({
    personalInfo: false,
    summary: false,
    education: false,
    professionalExperience: false,
    projects: false,
    skills: false,
  });

  const handleAccordion = (section) => {
    setIsOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // const handleDelete = async() => {
  //   try {
  //     axios.delete(`/api/${id}`)
  //   } catch (error) {
      
  //   }
  // }
  return (
    <div className='md:flex gap-x-4 mx-16 pt-10 '>
   {/* <div onClick={handleDelete} className='fixed bottom-10 right-10 bg-red-700 rounded-full p-5'>
  <RiDeleteBinFill color='white' size={40} />
</div> */}
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:w-[40%] flex flex-col gap-y-2  p-6  space-y-2"
    >
      <div>
      <input
                 {...register('resume', {
                   defaultValues: 'Resume 1',
                 })}
                 className="w-full px-3 py-2 border-2 border-gray-300 rounded-md outline-none"
               />
      </div>
       
      <div className="space-y-4 border-2 bg-white shadow-sm shadow-slate-700 p-4 rounded-3xl">
        <div className='flex justify-between items-center '>
        <h1 className="text-2xl pt-2 flex justify-center items-center gap-2 font-bold mb-4"><span><CgProfile/></span>Personal Info </h1>
<p className='bg-red-300 p-1 rounded-full' onClick={() => handleAccordion('personalInfo')}>{isOpen.personalInfo ?  <BiSolidUpArrow/> : <BiSolidDownArrow />}</p>
        </div>
      {
        isOpen.personalInfo && (
            <div>
            <div >
               <label className="block font-semibold mb-1">Full name:</label>
               <input
                 {...register('personalDetails.name', {
                   required: 'Name is required',
                 })}
                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
               />
               {errors.personalDetails?.name && (
                 <span className="text-red-500">
                   {errors.personalDetails.name.message}
                 </span>
               )}
             </div>
             <div>
               <label className="block font-semibold mb-1">Job title:</label>
               <input
                 {...register('personalDetails.title', {
                   required: 'Job title is required',
                 })}
                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
               />
               {errors.personalDetails?.title && (
                 <span className="text-red-500">
                   {errors.personalDetails.title.message}
                 </span>
               )}
             </div>
             <div>
               <label className="block font-semibold mb-1">Email:</label>
               <input
                 {...register('personalDetails.email', {
                   required: 'Email is required',
                 })}
                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
               />
               {errors.personalDetails?.email && (
                 <span className="text-red-500">
                   {errors.personalDetails.email.message}
                 </span>
               )}
             </div>
             <div>
               <label className="block font-semibold mb-1">Phone number:</label>
               <input
                 {...register('personalDetails.phoneNumber', {
                   required: 'Number is required',
                 })}
                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
               />
               {errors.personalDetails?.phoneNumber && (
                 <span className="text-red-500">
                   {errors.personalDetails.phoneNumber.message}
                 </span>
               )}
             </div>
             <div>
               <label className="block font-semibold mb-1">Address:</label>
               <input
                 {...register('personalDetails.address', {
                   required: 'Address is required',
                 })}
                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
               />
               {errors.personalDetails?.address && (
                 <span className="text-red-500">
                   {errors.personalDetails.address.message}
                 </span>
               )}
             </div>
             <div>
               <label className="block font-semibold mb-1">
                 Website (optional):
               </label>
               <input
                 {...register('personalDetails.website')}
                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
               />
             </div>
            </div>
        )
      }
      
      </div>

      {/* summary */}


      <div className="space-y-4 border-2 bg-white shadow-sm shadow-slate-700 p-4 rounded-3xl">
        <div className='flex justify-between items-center '>
        <h1 className="text-2xl pt-2 flex justify-center items-center gap-2 font-bold mb-4"><span><RiProfileFill/></span>Summary</h1>
        <p className='bg-red-300 p-1 rounded-full' onClick={() => handleAccordion('summary')}>{isOpen.summary ?  <BiSolidUpArrow/> : <BiSolidDownArrow />}</p>
        </div>
       
       {
        isOpen.summary && (
            <textarea
            {...register('summary', { required: 'Summary is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          ></textarea>
        )
       }
        {errors?.summary && (
          <span className="text-red-500">{errors.summary.message}</span>
        )}
      </div>

  

      {/* Education */}
      <div className="space-y-4 border-2 bg-white shadow-sm shadow-slate-700 p-4 rounded-3xl">
        <div className='flex justify-between items-center '>
        <h1 className="text-2xl pt-2 flex justify-center items-center gap-2 font-bold mb-4"><span><FaGraduationCap/></span>Education</h1>
        <p className='bg-red-300 p-1 rounded-full' onClick={() => handleAccordion('education')}>{isOpen.education ?  <BiSolidUpArrow/> : <BiSolidDownArrow />}</p>
        </div>
       
        
            {
                isOpen.education && (
                  <div>
                    {educationFields.map((field, index) => {
          return (
            <div className="form data" key={field.id}>
              <div>
                <label className="block font-semibold mb-1">Degree:</label>
                <input
                  {...register(`education.${index}.degree`, {
                    required: 'Degree is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.education?.[index]?.degree && (
                  <span className="text-red-500">
                    {errors.education[index].degree.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">School:</label>
                <input
                  {...register(`education.${index}.school`, {
                    required: 'School is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.education?.[index]?.school && (
                  <span className="text-red-500">
                    {errors.education[index].school.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Start-Date:</label>
                <input
                  type="date"
                  {...register(`education.${index}.startDate`, {
                    required: 'Date is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.education?.[index].startDate && (
                  <span className="text-red-500">
                    {errors.education[index].startDate.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">End-Date:</label>
                <input
                  type="date"
                  {...register(`education.${index}.endDate`, {
                    required: 'Date is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.education?.[index]?.endDate && (
                  <span className="text-red-500">
                    {errors.education[index].endDate.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Description:</label>
                <textarea
                  {...register(`education.${index}.education_description`, {
                    required: 'Description is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                ></textarea>
                {errors.education?.[index].education_description && (
                  <span className="text-red-500">
                    {errors.education[index].education_description.message}
                  </span>
                )}
              </div>
              {index > 0 && (
                <button
                  type="button"
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                  onClick={() => educationRemove(index)}
                >
                  {' '}
                  Remove
                </button>
              )}
            </div>
          );
        })}
        <button
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded-md"
          onClick={() =>
            educationAppend({
              degree: '',
              school: '',
              startDate: '',
              endDate: '',
              education_description: '',
            })
          }
        >
          {' '}
          Add Education
        </button>
                  </div>

                )
            }
        
        
      </div>

      {/* professional experience */}
      <div className="space-y-4 border-2 bg-white shadow-sm shadow-slate-700 p-4 rounded-3xl">
        <div className='flex justify-between items-center '>
        <h1 className="text-2xl pt-2 flex justify-center items-center gap-2 font-bold mb-4"><span><FaBriefcase/></span>Professional Experience</h1>
       <p className='bg-red-300 p-1 rounded-full' onClick={() => handleAccordion('professionalExperience')}>{isOpen.professionalExperience ?  <BiSolidUpArrow/> : <BiSolidDownArrow />}</p>
        </div>
       
       {
        isOpen.professionalExperience && (
            <div>
  {professionalFields.map((field, index) => {
          return (
            <div key={field.id}>
              <div>
                <label className="block font-semibold mb-1">Job Title</label>
                <input
                  {...register(`professionalExperience.${index}.jobTitle`, {
                    required: 'JobTitle is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.professionalExperience?.[index]?.jobTitle && (
                  <span className="text-red-500">
                    {errors.professionalExperience[index].jobTitle.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Employer</label>
                <input
                  {...register(`professionalExperience.${index}.employer`, {
                    required: 'Employer is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.professionalExperience?.[index].employer && (
                  <span className="text-red-500">
                    {errors.professionalExperience[index].employer.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Start-Date:</label>
                <input
                  type="date"
                  {...register(`professionalExperience.${index}.startDate`, {
                    required: 'Date is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors?.professionalExperience?.[index].startDate && (
                  <span className="text-red-500">
                    {errors.professionalExperience[index].startDate.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">End-Date:</label>
                <input
                  type="date"
                  {...register(`professionalExperience.${index}.endDate`, {
                    required: 'Date is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.professionalExperience?.[index].endDate && (
                  <span className="text-red-500">
                    {errors.professionalExperience[index].endDate.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Location</label>
                <input
                  type="Location"
                  {...register(`professionalExperience.${index}.location`, {
                    required: 'Location is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.professionalExperience?.[index].location && (
                  <span className="text-red-500">
                    {errors.professionalExperience[index].location.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Description:</label>
                <textarea
                  {...register(
                    `professionalExperience.${index}.professional_description`,
                    {
                      required: 'Description is required',
                    }
                  )}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                ></textarea>
                {errors.professionalExperience?.[index]
                  .professional_description && (
                  <span className="text-red-500">
                    {
                      errors.professionalExperience[index]
                        .professional_description.message
                    }
                  </span>
                )}
              </div>
              {index > 0 && (
                <button
                  type="button"
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                  onClick={() => professionalRemove(index)}
                >
                  {' '}
                  Remove
                </button>
              )}
            </div>
          );
        })}
        <button
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded-md"
          onClick={() =>
            professionalAppend({
              jobTitle: '',
              employer: '',
              startDate: '',
              endDate: '',
              location: '',
              professional_description: '',
            })
          }
        >
          {' '}
          Add Professional
        </button>
            </div>
        )
       }

      
      </div>

      {/* Projects */}

      <div className="space-y-4 border-2 bg-white shadow-sm shadow-slate-700 p-4 rounded-3xl">
        <div className='flex justify-between items-center '>
        <h1 className="text-2xl pt-2 flex justify-center items-center gap-2 font-bold mb-4"><span><FaFolderOpen/></span>Projects</h1>
   <p className='bg-red-300 p-1 rounded-full' onClick={() => handleAccordion('projects')}>{isOpen.projects ?  <BiSolidUpArrow/> : <BiSolidDownArrow />}</p>
        </div>


        {
            isOpen.projects && (
                <div>
 {projectFields.map((field, index) => {
          return (
            <div key={field.id}>
              <div>
                <label className="block font-semibold mb-1">Title</label>
                <input
                  {...register(`project.${index}.projectTitle`, {
                    required: 'Title is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.project?.[index].projectTitle && (
                  <span className="text-red-500">
                    {errors.project[index].projectTitle.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">URL</label>
                <input
                  {...register(`project.${index}.url`, {
                    required: 'URL is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.project?.[index].projectTitle && (
                  <span className="text-red-500">
                    {errors.project[index].projectTitle.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Start-Date:</label>
                <input
                  type="date"
                  {...register(`project.${index}.startDate`, {
                    required: 'Date is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.project?.[index].startDate && (
                  <span className="text-red-500">
                    {errors.project[index].startDate.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Start-Date:</label>
                <input
                  type="date"
                  {...register(`project.${index}.endDate`, {
                    required: 'Date is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.project?.[index].endDate && (
                  <span className="text-red-500">
                    {errors.project[index].endDate.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block font-semibold mb-1">Description:</label>
                <textarea
                  {...register(`project.${index}.project_Description`, {
                    required: 'Description is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                ></textarea>
                {errors.project?.[index].project_Description && (
                  <span className="text-red-500">
                    {errors.project[index].project_Description.message}
                  </span>
                )}
              </div>
              {index > 0 && (
                <button
                  type="button"
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                  onClick={() => projectRemove(index)}
                >
                  {' '}
                  Remove
                </button>
              )}
            </div>
          );
        })}
        <button
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded-md"
          onClick={() =>
            projectAppend({
              projectTitle: '',
              url: '',
              startDate: '',
              endDate: '',
              project_Description: '',
            })
          }
        >
          {' '}
          Add Project
        </button>
                </div>
            )
        }
       
      </div>

      {/* skills */}

      <div className="space-y-4 border-2 bg-white shadow-sm shadow-slate-700 p-4 rounded-3xl">
        <div className='flex justify-between items-center '>
        <h1 className="text-2xl pt-2 flex justify-center items-center gap-2 font-bold mb-4"><span><FaUserGear/></span>Skills</h1>
     <p className='bg-red-300 p-1 rounded-full' onClick={() => handleAccordion('skills')}>{isOpen.skills ?  <BiSolidUpArrow/> : <BiSolidDownArrow />}</p>
        </div>


         {
            isOpen.skills && (
                <div>
 {skillFields.map((field, index) => {
          return (
            <div key={field.id}>
              <div>
                <label className="block font-semibold mb-1">Skill</label>
                <input
                  {...register(`skills.${index}.skill`, {
                    required: 'skill is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.skills?.[index].skill && (
                  <span className="text-red-500">
                    {errors.skills[index].skill.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Skill level</label>
                <input
                  {...register(`skills.${index}.skillLevel`, {
                    required: 'skill-level is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.skills?.[index].skillLevel && (
                  <span className="text-red-500">
                    {errors.skills[index].skillLevel.message}
                  </span>
                )}
              </div>
              {index > 0 && (
                <button
                  type="button"
                  className="px-4 w-full py-2 my-4 bg-red-600 text-white rounded-md"
                  onClick={() => skillRemove(index)}
                >
                  {' '}
                  Remove
                </button>
              )}
            </div>
          );
        })}
        <button
          type="button"
          className="px-4 py-2 mt-2 bg-green-600 text-white rounded-md"
          onClick={() =>
            skillAppend({
              skill: '',
              skillLevel: '',
            })
          }
        >
          {' '}
          Add Skills
        </button>
                </div>
            )
         }
       
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="px-10 py-2  bg-blue-600 text-white font-semibold rounded-md"
        >
          Submit
        </button>
      </div>
    </form>
    <div className='w-[60%]'>
              <LiveScreen personalDetails={personalDetails} summary={summary} education={education} professionalExperience={professionalExperience} project={project} skills={skills}/>

    </div>
    </div>
  );
}

export default Resume;
