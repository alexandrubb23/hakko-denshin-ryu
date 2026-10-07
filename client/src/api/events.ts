import type {
  CreateEventInput,
  EventStatus,
  EventType,
  UpdateEventInput,
  UpsertEventParticipationInput,
} from "@hakko/core";
import { ApiRoutes } from "@lib/routes";

import { Http } from "./http";

/** One day/time slot of an event */
export interface EventSession {
  id: string;
  startsAt: string;
  endsAt: string | null;
}

export interface Event {
  id: string;
  name: string;
  /** URL-safe name, unique across events: /events/:slug */
  slug: string;
  type: EventType;
  status: EventStatus;
  startDate: string;
  endDate: string | null;
  location: string;
  details: string;
  ticketUrl: string | null;
  image: string | null;
  createdAt: string;
  sessions: EventSession[];
}

export interface EventParticipant {
  id: string;
  userId: string;
  attended: boolean;
  user: {
    name: string;
    email: string;
    image: string | null;
  };
}

export interface StudentEvent {
  id: string;
  name: string;
  type: EventType;
  status: EventStatus;
  startDate: string;
  endDate: string | null;
  location: string;
  attended: boolean | null;
}

class EventsApi extends Http {
  async fetchEvents(): Promise<Event[]> {
    const { data } = await this.http.get(ApiRoutes.events);
    return data.events;
  }

  /** A published event, by its slug; 404 when there is none */
  async fetchEvent(slug: string): Promise<Event> {
    const { data } = await this.http.get(ApiRoutes.event(slug));
    return data.event;
  }

  async fetchAdminEvents(): Promise<Event[]> {
    const { data } = await this.http.get(ApiRoutes.adminEvents);
    return data.events;
  }

  async createEvent(payload: CreateEventInput): Promise<Event> {
    const { data } = await this.http.post(ApiRoutes.adminEvents, payload);
    return data.event;
  }

  async updateEvent(id: string, payload: UpdateEventInput): Promise<Event> {
    const { data } = await this.http.put(ApiRoutes.adminEvent(id), payload);
    return data.event;
  }

  async deleteEvent(id: string): Promise<void> {
    await this.http.delete(ApiRoutes.adminEvent(id));
  }

  async uploadEventImage(id: string, file: File): Promise<string> {
    return this.uploadImage(ApiRoutes.adminEventImage(id), file);
  }

  async fetchEventParticipants(eventId: string): Promise<EventParticipant[]> {
    const { data } = await this.http.get(
      ApiRoutes.adminEventParticipants(eventId)
    );
    return data.participants;
  }

  async upsertEventParticipation(
    eventId: string,
    payload: UpsertEventParticipationInput
  ): Promise<EventParticipant> {
    const { data } = await this.http.post(
      ApiRoutes.adminEventParticipants(eventId),
      payload
    );
    return data.participation;
  }

  async fetchStudentEvents(studentId: string): Promise<StudentEvent[]> {
    const { data } = await this.http.get(
      ApiRoutes.adminStudentEvents(studentId)
    );
    return data.events;
  }
}

export const eventsApi = new EventsApi();
