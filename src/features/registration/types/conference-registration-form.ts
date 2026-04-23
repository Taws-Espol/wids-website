import type {
  AttendanceMode,
  HeardAboutValue,
  ParticipantType,
} from "@/shared/lib/payload/types/registration";

export type ConferenceRegistrationFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  participantType: ParticipantType;
  universityName?: string;
  major?: string;
  organizationName?: string;
  jobTitle?: string;
  attendanceMode: AttendanceMode;
  receiveNotifications: boolean;
  acceptedTerms: boolean;
  heardAboutEvent: HeardAboutValue;
};
