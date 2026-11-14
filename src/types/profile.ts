/** A labelled outbound link (social, CV, email). */
export interface ProfileLink {
  label: string;
  href: string;
  /** True when the link leaves the site and should open safely. */
  external: boolean;
}

/** One role or programme in the experience timeline. */
export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  detail: string;
}

/** A named group of skills, shown without proficiency bars. */
export interface SkillGroup {
  name: string;
  items: readonly string[];
}

/** Everything the portfolio says about its owner outside the apps collection. */
export interface Profile {
  name: string;
  title: string;
  location: string;
  bio: string;
  statement: string;
  email: string;
  links: { cv: ProfileLink; github: ProfileLink; linkedin: ProfileLink; email: ProfileLink };
  experience: readonly ExperienceItem[];
  skills: readonly SkillGroup[];
  education: { degree: string; school: string; year: string };
}
