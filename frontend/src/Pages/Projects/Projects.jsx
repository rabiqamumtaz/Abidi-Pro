import React, { useState } from 'react'
import ProjectsTable from '../../Components/ProjectsTable';
import NewProjectDrawer from '../../Components/NewProjectDrawer';

const Projects = () => {
    const dummyProjects = [
  {
    id: 1,
    name: "Website Redesign",
    owner: "Alice",
    users: 5,
    status: "Active",
    startDate: "2024-05-01",
    endDate: "2024-06-30",
  },
  // Add more project objects here...
];
  const [showModal, setShowModal] = useState(false);

  return (
  // MainBody
    <div className='px-4 py-2 '>
      {/* roundercorner main Content */}
      <div className='p-8 rounded-xl bg-primary'>
      <div className='bg-white px-8 py-4 font-semibold rounded-lg'>Projects</div>
       {/* attendance summary card view horizontal */}
       <div className='my-6'>
           <ProjectsTable projects={dummyProjects} />
        </div>
        <NewProjectDrawer  isOpen={showModal} onClose={() => setShowModal(false)}/>
      </div>    
    </div>
  )
}

export default Projects
