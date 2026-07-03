import React from 'react';
import ScrollReveal from './ScrollReveal';
import '../styles/Sections.css';
import { useSanityData } from '../hooks/useSanityData';
import { SKILLS_QUERY } from '../lib/sanityQueries';
import { urlFor } from '../lib/sanityClient';

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

const Skills = React.memo(() => {
  const { data: skillCategories, loading, error } = useSanityData(SKILLS_QUERY);

  if (loading) return null;

  return (
    <section id="skills" className="section-block">
      <h2 className="section-heading">Skills</h2>
      <div className="skills-categories">
        {skillCategories.map((category) => (
          <div key={category._id || category.label} className="skill-category">
            <span className="skill-category-label">{category.label}</span>
            <div className="skill-pills">
              {category.skills?.map((skill, skillIdx) => (
                <ScrollReveal key={skill._key || skill.name} delay={0.1 + (skillIdx * 0.05)} as="div" style={{ display: 'inline-block' }}>
                  <SkillPill
                    name={skill.name}
                    icon={skill.icon ? <img src={urlFor(skill.icon).url()} alt={skill.name} style={{ width: '20px', height: '20px' }} /> : null}
                    hoverColor={skill.hoverColor}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default Skills;
