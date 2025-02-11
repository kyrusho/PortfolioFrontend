import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./UpdateProject.css";
import { projectResponseModel, skillResponseModel } from '../model/projectResponseModel';
import { getProject, updateProject } from '../axios/updateProject';
import { getAllSkills } from '../axios/getAllSkills';
import { projectRequestModel } from '../model/projectRequestModel';

const UpdateProjectForm: React.FC = (): JSX.Element => {
  const { projectId } = useParams<{ projectId: string }>();
  const [projectName, setProjectName] = useState<string>('');
  const [iconUrl, setIconUrl] = useState<string>('');
  const [gitRepo, setGitRepo] = useState<string>('');
  const [skills, setSkills] = useState<skillResponseModel[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<skillResponseModel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectAndSkills = async (): Promise<void> => {
      try {
        if (!projectId) return;

        // Fetch project details
        const project: projectResponseModel = await getProject(projectId);
        setProjectName(project.projectName);
        setIconUrl(project.iconUrl);
        setGitRepo(project.gitRepo);
        setSelectedSkills(project.skills || []); // Ensure selectedSkills is always an array

        // Fetch all skills
        const fetchedSkills = await getAllSkills();
        setSkills(fetchedSkills || []); // Ensure skills is always an array
      } catch (error) {
        console.error('Error fetching project or skills:', error);
      }
    };

    fetchProjectAndSkills();
  }, [projectId]);

  const handleSkillToggle = (skill: skillResponseModel): void => {
    if (selectedSkills.find((s) => s.skillId === skill.skillId)) {
      setSelectedSkills(selectedSkills.filter((s) => s.skillId !== skill.skillId));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    if (!projectId) {
      alert('Project ID is missing.');
      return;
    }

    const updatedProject: projectRequestModel = {
      projectName,
      iconUrl,
      gitRepo,
      skills: selectedSkills,
    };

    try {
      await updateProject(projectId, updatedProject);
      alert('Project updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project.');
    }
  };

  return (
    <div className="update-project-form">
      <h2>Update Project</h2>
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
                className={`skill-logo ${selectedSkills.find((s) => s.skillId === skill.skillId) ? 'selected' : ''}`}
                onClick={() => handleSkillToggle(skill)}
              />
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Project
        </button>
      </form>
    </div>
  );
};

export default UpdateProjectForm;
