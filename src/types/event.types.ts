export type EventStatus = "OPEN" | "SOLD_OUT" | "CLOSED";

export interface DevEvent {
  id: string;
  title: string;
  shortDescription: string;
  date: string; // Em um projeto real com banco de dados, usaríamos Date. Aqui usaremos string ISO para facilitar.
  location: string;
  imageUrl: string;
  status: EventStatus; // Aqui aplicamos a regra de negócio que restringe os estados!
  registrationUrl?: string; // Opcional (?), pois se estiver encerrado, pode não ter link.
}