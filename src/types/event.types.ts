export type EventStatus = "OPEN" | "SOLD_OUT" | "CLOSED";

export interface DevEvent {
  id: string;
  title: string;
  shortDescription: string;
  date: string;
  location: string;
  imageUrl: string;
  status: EventStatus;
  registrationUrl?: string;
}