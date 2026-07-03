// ── Centralized GROQ queries for all Sanity data ──

// All projects for the /projects page (excludes full caseStudy for performance)
export const ALL_PROJECTS_QUERY = `
  *[_type == "project"] | order(sortOrder asc) {
    name,
    "slug": slug.current,
    description,
    impact,
    tags,
    image,
    liveUrl,
    repoUrl,
    youtubeDemoUrl,
    hackathonUrl,
    bento,
    hoverColor,
    "hasCaseStudy": defined(caseStudy)
  }
`

// Single project with full case study for /projects/:slug
export const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug][0]
`

// Featured projects for the homepage
export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && isFeatured == true] | order(sortOrder asc) {
    name,
    "slug": slug.current,
    "description": coalesce(featuredDescription, description),
    impact,
    "tags": coalesce(featuredTags, tags),
    image,
    liveUrl,
    repoUrl,
    youtubeDemoUrl,
    hackathonUrl,
    hoverColor,
    "hasCaseStudy": defined(caseStudy)
  }
`

// Career entries
export const CAREER_QUERY = `
  *[_type == "career"] | order(sortOrder asc)
`

// Education entries
export const EDUCATION_QUERY = `
  *[_type == "education"] | order(sortOrder asc)
`

// Positions of Responsibility
export const POR_QUERY = `
  *[_type == "por"] | order(sortOrder asc)
`

// Skill categories with nested skills
export const SKILLS_QUERY = `
  *[_type == "skillCategory"] | order(sortOrder asc) {
    label,
    skills[] { name, icon, hoverColor }
  }
`

// Social links
export const SOCIALS_QUERY = `
  *[_type == "socialLink"] | order(sortOrder asc)
`
