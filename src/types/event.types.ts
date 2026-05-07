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

export type EventFormErrors = Partial<
  Record<"title" | "shortDescription" | "date" | "location" | "imageUrl", string[]>
>;

export type EventFormState = {
  errors?: EventFormErrors;
  message?: string;
};