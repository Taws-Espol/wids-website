import "server-only";

import config from "@payload-config";
import { getPayload } from "payload";

export async function getConferenceRegistrationByAttendanceToken(
  token: string,
) {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "conference-registrations",
    where: { attendanceToken: { equals: token } },
    limit: 1,
    depth: 1,
  });

  return result.docs[0] ?? null;
}
