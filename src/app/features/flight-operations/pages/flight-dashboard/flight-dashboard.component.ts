import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

import {
  Flight,
  FlightStatus
} from '../../../../core/models/flight.model';

import { FlightService } from '../../../../core/services/flight.service';

import { KpiCardComponent } from '../../../../shared/ui/kpi-card/kpi-card.component';
import {
  FlightFilterValue,
  FlightFiltersComponent
} from '../../components/flight-filters/flight-filters.component';
import { FlightListComponent } from '../../components/flight-list/flight-list.component';
import { FlightMapComponent } from '../../components/flight-map/flight-map.component';
import { FlightDetailsComponent } from '../../components/flight-details/flight-details.component';

@Component({
  selector: 'app-flight-dashboard',
  standalone: true,
  imports: [
    KpiCardComponent,
    FlightFiltersComponent,
    FlightMapComponent,
    FlightDetailsComponent,
    FlightListComponent
  ],
  templateUrl: './flight-dashboard.component.html',
  styleUrl: './flight-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightDashboardComponent implements OnInit {

  flights: Flight[] = [];
  filteredFlights: Flight[] = [];

  selectedFlight: Flight | null = null;

  airportCodes: string[] = [];

  totalFlights = 0;
  activeFlights = 0;
  delayedFlights = 0;
  arrivedFlights = 0;

  private currentFilters: FlightFilterValue = {
    callsign: '',
    status: '',
    origin: '',
    destination: ''
  };

  constructor(
    private readonly flightService: FlightService
  ) { }

  ngOnInit(): void {
    this.loadFlights();
  }

  onFiltersChanged(filters: FlightFilterValue): void {
    this.currentFilters = filters;
    this.applyFilters();
  }

  onFlightSelected(flight: Flight): void {
    this.selectedFlight = flight;
  }

  private loadFlights(): void {
    this.flightService.getFlights().subscribe({
      next: (flights) => {
        this.flights = flights;
        this.filteredFlights = flights;

        this.airportCodes = this.getAirportCodes(this.filteredFlights);

        this.calculateKpis(flights);

        this.selectedFlight = flights[0] ?? null;
      }
    });
  }

  private applyFilters(): void {
    const {
      callsign,
      status,
      origin,
      destination
    } = this.currentFilters;

    const searchTerm = callsign.trim().toLowerCase();

    this.filteredFlights = this.flights.filter(flight => {
      const matchesCallsign =
        !searchTerm ||
        flight.callsign.toLowerCase().includes(searchTerm);

      const matchesStatus =
        !status ||
        flight.status === status;

      const matchesOrigin =
        !origin ||
        flight.origin.code === origin;

      const matchesDestination =
        !destination ||
        flight.destination.code === destination;

      return (
        matchesCallsign &&
        matchesStatus &&
        matchesOrigin &&
        matchesDestination
      );
    });
    this.calculateKpis(this.filteredFlights);
    this.updateSelectedFlightAfterFiltering();
  }

  private updateSelectedFlightAfterFiltering(): void {
    if (!this.selectedFlight) {
      return;
    }

    const selectedStillVisible = this.filteredFlights.some(
      flight =>
        flight.flightNumber === this.selectedFlight?.flightNumber
    );

    if (!selectedStillVisible) {
      this.selectedFlight = this.filteredFlights[0] ?? null;
    }
  }

  private calculateKpis(flights: Flight[]): void {
    this.totalFlights = flights.length;

    this.activeFlights = this.countByStatus(
      flights,
      'ACTIVE'
    );

    this.delayedFlights = this.countByStatus(
      flights,
      'DELAYED'
    );

    this.arrivedFlights = this.countByStatus(
      flights,
      'ARRIVED'
    );
  }

  private countByStatus(
    flights: Flight[],
    status: FlightStatus
  ): number {
    return flights.filter(
      flight => flight.status === status
    ).length;
  }

  private getAirportCodes(flights: Flight[]): string[] {
    const codes = new Set<string>();
    for (const flight of flights) {
      codes.add(flight.origin.code);
      codes.add(flight.destination.code);
    }
    return Array.from(codes).sort();
  }

  onFiltersCleared(): void {
    this.filteredFlights = [...this.flights];
    this.calculateKpis(this.filteredFlights);
    this.selectedFlight = this.flights[0] ?? null;
  }
}