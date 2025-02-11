import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProjectForm.css';
import { skillResponseModel } from '../model/projectResponseModel';
import { getAllSkills } from '../axios/getAllSkills';
import { projectRequestModel } from '../model/projectRequestModel';
import { addProject } from '../axios/addProject';

const AddProject: React.FC = (): JSX.Element => {
  const [projectName, setProjectName] = useState<string>('');
  const [iconUrl, setIconUrl] = useState<string>('');
  const [gitRepo, setGitRepo] = useState<string>('');
  const [skills, setSkills] = useState<skillResponseModel[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<skillResponseModel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkills = async (): Promise<void> => {
      try {
        const fetchedSkills = await getAllSkills();
        setSkills(fetchedSkills);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  const handleSkillToggle = (skill: skillResponseModel): void => {
    if (selectedSkills.find((s) => s.skillId === skill.skillId)) {
      setSelectedSkills(selectedSkills.filter((s) => s.skillId !== skill.skillId));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    const newProject: projectRequestModel = {
      projectName,
      iconUrl,
      gitRepo,
      skills: selectedSkills,
    };

    try {
      await addProject(newProject);
      alert('Project added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project.');
    }
  };

  return (
    <div className="add-project-form">
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="iconUrl">Icon Url</label>
          <textarea
            id="iconUrl"
            value={iconUrl}
            onChange={(e) => setIconUrl(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="gitRepo">Git Repository</label>
          <input
            type="text"
            id="gitRepo"
            value={gitRepo}
            onChange={(e) => setGitRepo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Skills</label>
          <div className="skill-logos-container">
            {skills.map((skill) => (
              <img
                key={skill.skillId}
                src={skill.skillLogo}
                alt={skill.skillName}
                className={`skill-logo ${
                  selectedSkills.find((s) => s.skillId === skill.skillId)
                    ? 'selected'
                    : ''
                }`}
                onClick={() => handleSkillToggle(skill)}
              />
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;