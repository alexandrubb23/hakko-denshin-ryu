import type { StudentCategory } from "@hakko/core";

import type { IntlMessageID } from "i18n/messages";

export const STUDENT_CATEGORY_LABEL_IDS: Record<
  StudentCategory,
  IntlMessageID
> = {
  kid: "admin.students.category.kid",
  senior: "admin.students.category.senior",
};
