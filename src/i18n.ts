import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      hello_world: "Hello World, I'm Haitham",
      "about_me": "Hey! I'm Haitham, a student at Champlain College St-Lambert, studying Computer Science. I have a strong passion for software development and UX design, and I'm highly curious about AI and machine learning.",
      "hobbies": "Outside of career and academics, I enjoy photography, cinematography, and travelling the world!",
      "skills": "Skills",
      "languages": "Languages",
      "projects": "Projects",
      "update_project": "Update Project",
      "project_name": "Project Name",
      "icon_url": "Icon Url",
      "git_repo": "Git Repository",
      "select_skills": "Select Skills",
      "update_project_success": "Project updated successfully!",
      contactMe: "Contact Me",
      "update_project_failure": "Failed to update project."
    }
  },
  fr: {
    translation: {
      hello_world: "Bonjour le monde, je suis Haitham",
      "about_me": "Salut! Je suis Haitham, étudiant au Champlain College St-Lambert en informatique. J'ai une grande passion pour le développement logiciel et le design UX, et je suis très curieux de l'intelligence artificielle et du machine learning.",
      "hobbies": "En dehors de ma carrière et de mes études, j'aime la photographie, la cinématographie et voyager à travers le monde!",
      "skills": "Compétences",
      "languages": "Langues",
      "projects": "Projets",
      "update_project": "Mettre à jour le projet",
      "project_name": "Nom du projet",
      "icon_url": "URL de l'icône",
      "git_repo": "Dépôt Git",
      "select_skills": "Sélectionner les compétences",
      contactMe: "Contactez-moi",
      "update_project_success": "Projet mis à jour avec succès!",
      "update_project_failure": "Échec de la mise à jour du projet."
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', 
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
