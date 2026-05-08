export const PARTICIPANT_TYPE_OPTIONS = [
  {
    label: "Student",
    value: "student",
  },
  {
    label: "Professional",
    value: "professional",
  },
] as const;

export const ATTENDANCE_MODE_OPTIONS = [
  {
    label: "In person",
    value: "in-person",
  },
  {
    label: "Virtual",
    value: "virtual",
  },
] as const;

export const HEARD_ABOUT_OPTIONS = [
  {
    label: "A friend",
    value: "friend",
  },
  {
    label: "Flyer",
    value: "flyer",
  },
  {
    label: "Social media",
    value: "social-media",
  },
  {
    label: "Email",
    value: "email",
  },
  {
    label: "Website",
    value: "website",
  },
  {
    label: "University",
    value: "university",
  },
  {
    label: "Workplace",
    value: "workplace",
  },
  {
    label: "Other",
    value: "other",
  },
] as const;

export const PARTICIPANT_TYPES = PARTICIPANT_TYPE_OPTIONS.map(
  (option) => option.value,
);
export const ATTENDANCE_MODES = ATTENDANCE_MODE_OPTIONS.map(
  (option) => option.value,
);
export const HEARD_ABOUT_VALUES = HEARD_ABOUT_OPTIONS.map(
  (option) => option.value,
);

export const SEX_OPTIONS = [
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Male",
    value: "male",
  },
] as const;

export const COLLEGE_YEAR_OPTIONS = [
  {
    label: "Freshman",
    value: "freshman",
  },
  {
    label: "Sophomore",
    value: "sophomore",
  },
  {
    label: "Junior",
    value: "junior",
  },
  {
    label: "Senior",
    value: "senior",
  },
  {
    label: "Graduate",
    value: "graduate",
  },
  {
    label: "Other",
    value: "other",
  },
] as const;
