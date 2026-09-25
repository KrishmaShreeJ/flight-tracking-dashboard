import { Flight } from '../models/flight.model';
import { AIRPORTS } from './airports.data';

const airport = (code: string) =>
  AIRPORTS.find(item => item.code === code)!;

export const FLIGHTS: Flight[] = [
  {
    flightNumber: 'AI101',
    callsign: 'AIC101',
    aircraftType: 'Airbus A320',
    origin: airport('BLR'),
    destination: airport('DEL'),
    status: 'ACTIVE',
    estimatedDeparture: '2026-09-24T08:30:00',
    estimatedArrival: '2026-09-24T11:15:00'
  },
  {
    flightNumber: '6E205',
    callsign: 'IGO205',
    aircraftType: 'Airbus A321',
    origin: airport('DEL'),
    destination: airport('BOM'),
    status: 'DELAYED',
    estimatedDeparture: '2026-09-24T09:00:00',
    estimatedArrival: '2026-09-24T11:10:00'
  },
  {
    flightNumber: 'UK812',
    callsign: 'VTI812',
    aircraftType: 'Airbus A320neo',
    origin: airport('BOM'),
    destination: airport('BLR'),
    status: 'ACTIVE',
    estimatedDeparture: '2026-09-24T09:20:00',
    estimatedArrival: '2026-09-24T11:00:00'
  },
  {
    flightNumber: 'AI440',
    callsign: 'AIC440',
    aircraftType: 'Boeing 787',
    origin: airport('DEL'),
    destination: airport('MAA'),
    status: 'SCHEDULED',
    estimatedDeparture: '2026-09-24T12:00:00',
    estimatedArrival: '2026-09-24T15:00:00'
  },
  {
    flightNumber: '6E601',
    callsign: 'IGO601',
    aircraftType: 'Airbus A320',
    origin: airport('HYD'),
    destination: airport('BLR'),
    status: 'ARRIVED',
    estimatedDeparture: '2026-09-24T06:30:00',
    estimatedArrival: '2026-09-24T07:45:00'
  },
  {
    flightNumber: 'SG321',
    callsign: 'SEJ321',
    aircraftType: 'Boeing 737 MAX',
    origin: airport('CCU'),
    destination: airport('DEL'),
    status: 'ACTIVE',
    estimatedDeparture: '2026-09-24T09:45:00',
    estimatedArrival: '2026-09-24T12:10:00'
  },
  {
    flightNumber: 'AI682',
    callsign: 'AIC682',
    aircraftType: 'Airbus A321',
    origin: airport('COK'),
    destination: airport('BLR'),
    status: 'DELAYED',
    estimatedDeparture: '2026-09-24T10:15:00',
    estimatedArrival: '2026-09-24T11:30:00'
  },
  {
    flightNumber: '6E442',
    callsign: 'IGO442',
    aircraftType: 'Airbus A320neo',
    origin: airport('PNQ'),
    destination: airport('DEL'),
    status: 'SCHEDULED',
    estimatedDeparture: '2026-09-24T13:00:00',
    estimatedArrival: '2026-09-24T15:05:00'
  },
  {
    flightNumber: 'UK955',
    callsign: 'VTI955',
    aircraftType: 'Airbus A320',
    origin: airport('BLR'),
    destination: airport('HYD'),
    status: 'ACTIVE',
    estimatedDeparture: '2026-09-24T10:30:00',
    estimatedArrival: '2026-09-24T11:35:00'
  },
  {
    flightNumber: 'AI512',
    callsign: 'AIC512',
    aircraftType: 'Airbus A320',
    origin: airport('MAA'),
    destination: airport('COK'),
    status: 'ARRIVED',
    estimatedDeparture: '2026-09-24T06:45:00',
    estimatedArrival: '2026-09-24T07:50:00'
  },
  {
    flightNumber: '6E730',
    callsign: 'IGO730',
    aircraftType: 'Airbus A321',
    origin: airport('BOM'),
    destination: airport('HYD'),
    status: 'ACTIVE',
    estimatedDeparture: '2026-09-24T10:00:00',
    estimatedArrival: '2026-09-24T11:25:00'
  },
  {
    flightNumber: 'SG442',
    callsign: 'SEJ442',
    aircraftType: 'Boeing 737',
    origin: airport('BLR'),
    destination: airport('CCU'),
    status: 'SCHEDULED',
    estimatedDeparture: '2026-09-24T14:00:00',
    estimatedArrival: '2026-09-24T16:45:00'
  },
  {
    flightNumber: 'AI334',
    callsign: 'AIC334',
    aircraftType: 'Airbus A320',
    origin: airport('HYD'),
    destination: airport('BOM'),
    status: 'DELAYED',
    estimatedDeparture: '2026-09-24T11:30:00',
    estimatedArrival: '2026-09-24T13:00:00'
  },
  {
    flightNumber: '6E918',
    callsign: 'IGO918',
    aircraftType: 'Airbus A321',
    origin: airport('DEL'),
    destination: airport('COK'),
    status: 'SCHEDULED',
    estimatedDeparture: '2026-09-24T15:00:00',
    estimatedArrival: '2026-09-24T18:15:00'
  },
  {
    flightNumber: 'UK721',
    callsign: 'VTI721',
    aircraftType: 'Airbus A320neo',
    origin: airport('MAA'),
    destination: airport('BOM'),
    status: 'ACTIVE',
    estimatedDeparture: '2026-09-24T11:00:00',
    estimatedArrival: '2026-09-24T13:00:00'
  }
];