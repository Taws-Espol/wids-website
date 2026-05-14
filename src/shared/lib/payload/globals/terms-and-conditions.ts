import type { GlobalConfig } from "payload";

import { isAdminOrEditor } from "../utils/is-admin-or-editor";
import { LANDING_TAG } from "../../../constants/cache-tags";
import { revalidateCache } from "../../../utils/revalidate-cache";

export const TermsAndConditions: GlobalConfig = {
  slug: "terms-and-conditions",
  label: {
    singular: "Terms and Conditions",
    plural: "Terms and Conditions",
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: "content",
      type: "textarea",
      localized: true,
    },
  ],
  hooks: {
    afterChange: [
      async ({ req }) => {
        await revalidateCache({
          req,
          source: "terms-and-conditions",
          tag: LANDING_TAG,
        });
      },
    ],
  },
};
