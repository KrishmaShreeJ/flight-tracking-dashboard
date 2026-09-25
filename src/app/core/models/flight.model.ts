import { Airport } from './airport.model';

export type FlightStatus =
  | 'SCHEDULED'
  | 'ACTIVE'
  | 'DELAYED'
  | 'ARRIVED';

export interface Flight {
  flightNumber: string;
  callsign: string;
  aircraftType: string;
  origin: Airport;
  destination: Airport;
  status: FlightStatus;
  estimatedDeparture: string;
  estimatedArrival: string;
}