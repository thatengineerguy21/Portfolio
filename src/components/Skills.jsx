import React from 'react';
import '../styles/Sections.css';

/* ──────────────────────────────────────────────────────
   SkillPill — Reusable skill pill component

   Props:
     name       – Skill name text (required)
     icon       – Inline SVG element or imported SVG component (optional)
                  e.g. <PythonIcon /> or <img src={pythonSvg} />
     hoverColor – CSS color string for hover border/glow (optional)
                  e.g. 'rgba(53, 132, 228, 0.8)'
   ────────────────────────────────────────────────────── */
export const SkillPill = ({ name, icon, hoverColor }) => {
  const style = hoverColor ? { '--pill-hover-color': hoverColor } : {};

  return (
    <span className="skill-pill" style={style} data-cursor-hover>
      {icon && <span className="skill-pill-icon">{icon}</span>}
      {name}
    </span>
  );
};

/* ──────────────────────────────────────────────────────
   SKILLS DATA
   Edit the skills below. To add an icon, import the SVG
   and pass it as the `icon` property. To add a custom
   hover color, pass `hoverColor`.

   Example:
     import pythonSvg from '../assets/icons/python.svg';
     { name: 'Python', icon: <img src={pythonSvg} alt="" />, hoverColor: 'rgba(53, 132, 228, 0.8)' }
   ────────────────────────────────────────────────────── */

import cppIcon from '../assets/icons/cpp.svg';
import htmlIcon from '../assets/icons/html.svg';
import cssIcon from '../assets/icons/css.svg';
import jsIcon from '../assets/icons/js.svg';
import tsIcon from '../assets/icons/ts.svg';
import pythonIcon from '../assets/icons/python.svg';
import javaIcon from '../assets/icons/java.svg';
import reactIcon from '../assets/icons/react.js.svg';
import nodeIcon from '../assets/icons/Node.js.svg';
import expressIcon from '../assets/icons/express.svg';
import tailwindIcon from '../assets/icons/tailwindcss.svg';
import pandasIcon from '../assets/icons/pandas.svg';
import numpyIcon from '../assets/icons/numpy.svg';
import scikitIcon from '../assets/icons/scikitlearn.svg';
import gitIcon from '../assets/icons/git.svg';
import postgresIcon from '../assets/icons/postgressql.svg';
import linuxIcon from '../assets/icons/Linux.svg';
import mongoIcon from '../assets/icons/mongodb.svg';
import gcpIcon from '../assets/icons/gcp.svg';
import vercelIcon from '../assets/icons/vercel.svg';
const SKILL_CATEGORIES = [
  {
    label: 'Languages',
    skills: [
      { name: 'C++', icon: <img src={cppIcon} alt="C++ Icon" style={{ width: '20px', height: '20px' }} />, hoverColor: '#659ad2' },
      { name: 'HTML', icon: <img src={htmlIcon} alt="HTML Icon" style={{ width: '20px', height: '20px' }} />, hoverColor: '#e44d26' },
      { name: 'CSS', icon: <img src={cssIcon} alt="CSS Icon" style={{ width: '20px', height: '20px' }} />, hoverColor: '#1572b6' },
      { name: 'JavaScript', icon: <img src={jsIcon} alt="JavaScript Icon" style={{ width: '20px', height: '20px' }} />, hoverColor: '#f0db4f' },
      { name: 'TypeScript', icon: <img src={tsIcon} alt="TypeScript Icon" style={{ width: '20px', height: '20px' }} />, hoverColor: '#007acc' },
      { name: 'Python', icon: <img src={pythonIcon} alt="Python Icon" style={{ width: '20px', height: '20px' }} />, hoverColor: '#4887ba' },
      { name: 'Java', icon: <img src={javaIcon} alt="Java Icon" style={{ width: '20px', height: '20px' }} />, hoverColor: '#ea2d2e' },
    ],
  },
  {
    label: 'Frameworks and Libraries',
    skills: [
      { name: 'React', icon: <img src={reactIcon} alt="React.js Icon" style={{ width: '20px', height: '20px' }} />, hoverColor: '#61dafb' },
      { name: 'Node.js', icon: <img src={nodeIcon} alt="Node.js Icon" style={{ width: '20px', height: '20px' }} />, hoverColor: '#83cd29' },
      { name: 'Express.js', icon: <img src={expressIcon} alt="Express Icon" style={{ width: '20px', height: '20px' }} />, hoverColor: '#ffffff' },
      { name: 'Tailwind CSS', icon: <img src={tailwindIcon} alt="Tailwind CSS Icon" style={{ width: '20px', height: '20px' }} />, hoverColor: '#38bdf8' },
      { name: 'pandas', icon: <img src={pandasIcon} alt="Pandas Icon" style={{ width: '20px', height: '20px' }} />, hoverColor: '#120654' },
      { name: 'NumPy', icon: <img src={numpyIcon} alt="NumPy Icon" style={{ width: '20px', height: '20px' }} />, hoverColor: '#4c75cf' },
      { name: 'Scikit-Learn', icon: <img src={scikitIcon} alt="Scikit-Learn Icon" style={{ width: '20px', height: '20px' }} />, hoverColor: '#f89939' }

      // { name: 'TensorFlow', icon: null, hoverColor: null },
      // { name: 'Flask', icon: null, hoverColor: null },
      // { name: 'Next.js', icon: null, hoverColor: null },
    ],
  },
  {
    label: 'Tools & Cloud',
    skills: [
      // { name: 'Docker', icon: null, hoverColor: null },
      // { name: 'AWS', icon: null, hoverColor: null },
      { name: 'Git', icon: <img src={gitIcon} alt="Git Icon" style={{ width: '20px', height: '20px' }} />, hoverColor: '#f34f29' },
      { name: 'PostgresSQL', icon: <img src={postgresIcon} alt="PostgresSQL Icon" style={{ width: '20px', height: '20px' }} />, hoverColor: '#336791' },
      { name: 'Linux', icon: <img src={linuxIcon} alt="Linux Icon" style={{ width: '20px', height: '20px' }} />, hoverColor: '#dd4814' },
      { name: 'MongoDB', icon: <img src={mongoIcon} alt="MongoDB Icon" style={{ width: '20px', height: '20px' }} />, hoverColor: '#439934' },
      { name: 'GCP', icon: <img src={gcpIcon} alt="GCP Icon" style={{ width: '20px', height: '20px' }} />, hoverColor: '#4889f4' },
      { name: 'Vercel', icon: <img src={vercelIcon} alt="Vercel Icon" style={{ width: '20px', height: '20px' }} />, hoverColor: '#555558' }
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section-block">
      <h2 className="section-heading">Skills</h2>
      <div className="skills-categories">
        {SKILL_CATEGORIES.map((category) => (
          <div key={category.label} className="skill-category">
            <span className="skill-category-label">{category.label}</span>
            <div className="skill-pills">
              {category.skills.map((skill) => (
                <SkillPill
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  hoverColor={skill.hoverColor}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
