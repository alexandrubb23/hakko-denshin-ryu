import type {
  CreateEventInput,
  EventStatus,
  EventType,
  UpdateEventInput,
  UpsertEventParticipationInput,
} from "@hakko/core";
import { ApiRoutes } from "@lib/routes";

import { Http } from "./http";

export interface Event {
  id: string;
  name: string;
  type: EventType;
  status: EventStatus;
  startDate: string;
  endDate: string | null;
  location: string;
  details: string;
  ticketUrl: string | null;
  image: string | null;
  createdAt: string;
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

class EventsApi extends Http {
  async fetchEvents(): Promise<Event[]> {
    const { data } = await this.http.get(ApiRoutes.events);
    return data.events;
  }

  async fetchEvent(id: string): Promise<Event> {
    const { data } = await this.http.get(ApiRoutes.event(id));
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
}

export const eventsApi = new EventsApi();
