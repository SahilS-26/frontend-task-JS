export const QUERY_TYPES = [
  { value: 'projects', label: 'Projects' },
  { value: 'media', label: 'Media' },
  { value: 'career', label: 'Career' },
];

export const QUERY_SUB_OPTIONS = {
  projects: [
    { value: 'project-1', label: 'Project 1' },
    { value: 'project-2', label: 'Project 2' },
    { value: 'project-3', label: 'Project 3' },
    { value: 'project-4', label: 'Project 4' },
    { value: 'project-5', label: 'Project 5' },
    { value: 'project-6', label: 'Project 6' },
  ],
  media: [
    { value: 'press-kit', label: 'Press Kit' },
    { value: 'interview', label: 'Interview Request' },
    { value: 'collab', label: 'Collaboration' },
  ],
  career: [
    { value: 'internship', label: 'Internship' },
    { value: 'full-time', label: 'Full-time Job' },
    { value: 'freelance', label: 'Freelance Work' },
  ],
};

export const SUB_LABELS = {
  projects: 'Select Project',
  media: 'Select Media Option',
  career: 'Select Career Option',
};
