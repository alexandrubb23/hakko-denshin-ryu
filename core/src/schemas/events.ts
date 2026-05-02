import { z } from "zod";

export const EventStatusValues = ["draft", "published", "cancelled"] as const;
export type EventStatus = (typeof EventStatusValues)[number];

export const EventTypeValues = ["seminar", "demo", "camp", "other"] as const;
export type EventType = (typeof EventTypeValues)[number];

const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?Z$/;

const isoDateTimeString = z
  .string()
  .regex(
    isoDateTimeRegex,
    "Invalid ISO date-time string (expected UTC ISO 8601)"
  );

const eventBaseSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  type: z.enum(EventTypeValues, { error: "Invalid event type" }),
  status: z
    .enum(EventStatusValues, { error: "Invalid status" })
    .default("draft"),
  startDate: isoDateTimeString,
  endDate: isoDateTimeString.optional(),
  location: z.string().trim().min(2, "Location must be at least 2 characters"),
  details: z.string().trim().min(10, "Details must be at least 10 characters"),
  ticketUrl: z.url("Invalid ticket URL").optional().or(z.literal("")),
});

const endDateRefinement = (data: { startDate?: string; endDate?: string }) => {
  if (!data.endDate || !data.startDate) return true;
  return new Date(data.endDate) > new Date(data.startDate);
};
const endDateRefinementMessage = {
  message: "End date must be after start date",
  path: ["endDate"],
};

export const createEventSchema = eventBaseSchema.refine(
  endDateRefinement,
  endDateRefinementMessage
);

export type CreateEventInput = z.infer<typeof createEventSchema>;

export const updateEventSchema = eventBaseSchema
  .partial()
  .extend({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    startDate: isoDateTimeString,
    location: z
      .string()
      .trim()
      .min(2, "Location must be at least 2 characters"),
    details: z
      .string()
      .trim()
      .min(10, "Details must be at least 10 characters"),
  })
  .refine(endDateRefinement, endDateRefinementMessage);

export type UpdateEventInput = z.infer<typeof updateEventSchema>;

export const upsertEventParticipationSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  attended: z.boolean(),
});

export type UpsertEventParticipationInput = z.infer<
  typeof upsertEventParticipationSchema
>;
