import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Flight } from '../models/flight.model';
import { of } from 'rxjs/internal/observable/of';
import { FLIGHTS } from '../data/flights.data';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor() { }
  getFlights(): Observable<Flight[]> {
    return of(FLIGHTS);
  }
}
