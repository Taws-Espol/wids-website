import type {
  ATTENDANCE_MODES,
  HEARD_ABOUT_VALUES,
  PARTICIPANT_TYPES,
} from "../constants/registrations.ts";

export type ParticipantType = (typeof PARTICIPANT_TYPES)[number];
export type AttendanceMode = (typeof ATTENDANCE_MODES)[number];
export type HeardAboutValue = (typeof HEARD_ABOUT_VALUES)[number];
