import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  EventEmitter,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
  inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Flight } from '../../../../core/models/flight.model';

@Component({
  selector: 'app-flight-map',
  standalone: true,
  imports: [],
  templateUrl: './flight-map.component.html',
  styleUrl: './flight-map.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightMapComponent
  implements AfterViewInit, OnChanges, OnDestroy {

  @Input() flights: Flight[] = [];
  @Input() selectedFlight: Flight | null = null;

  @Output() flightSelected = new EventEmitter<Flight>();

  @ViewChild('mapContainer', { static: true })
  private readonly mapContainer!: ElementRef<HTMLDivElement>;

  private readonly platformId = inject(PLATFORM_ID);

  private leaflet: typeof import('leaflet') | null = null;

  private map: import('leaflet').Map | null = null;
  private markerLayer: import('leaflet').LayerGroup | null = null;
  private routeLayer: import('leaflet').LayerGroup | null = null;

  private readonly markers =
    new Map<string, import('leaflet').Marker>();

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.leaflet = await import('leaflet');

    this.initializeMap();
    this.renderFlights();

    setTimeout(() => {
      this.map?.invalidateSize();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.map || !this.leaflet) {
      return;
    }

    if (changes['flights']) {
      this.renderFlights();
    }

    if (changes['selectedFlight']) {
      this.updateMarkerIcons();
      this.renderSelectedFlight();
    }
  }

  ngOnDestroy(): void {
    this.map?.remove();

    this.map = null;
    this.markerLayer = null;
    this.routeLayer = null;

    this.markers.clear();
  }

  private initializeMap(): void {
    if (!this.leaflet) {
      return;
    }

    const L = this.leaflet;

    this.map = L.map(
      this.mapContainer.nativeElement,
      {
        center: [20.5937, 78.9629],
        zoom: 5,
        zoomControl: true
      }
    );

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; OpenStreetMap contributors'
      }
    ).addTo(this.map);

    this.markerLayer =
      L.layerGroup().addTo(this.map);

    this.routeLayer =
      L.layerGroup().addTo(this.map);
  }

  private renderFlights(): void {
    if (
      !this.leaflet ||
      !this.map ||
      !this.markerLayer
    ) {
      return;
    }

    const L = this.leaflet;

    this.markerLayer.clearLayers();
    this.markers.clear();

    for (const flight of this.flights) {
      const markerPosition =
        this.getFlightMarkerPosition(flight);

      const marker = L.marker(
        markerPosition,
        {
          icon: this.createFlightIcon(flight)
        }
      );

      marker.bindPopup(
        this.createPopupContent(flight)
      );

      marker.on('click', () => {
        this.flightSelected.emit(flight);
      });

      marker.addTo(this.markerLayer);

      this.markers.set(
        flight.flightNumber,
        marker
      );
    }

    this.renderSelectedFlight();
  }

  private renderSelectedFlight(): void {
    if (
      !this.leaflet ||
      !this.map ||
      !this.routeLayer
    ) {
      return;
    }

    const L = this.leaflet;

    this.routeLayer.clearLayers();

    if (!this.selectedFlight) {
      return;
    }

    const origin: L.LatLngExpression = [
      this.selectedFlight.origin.latitude,
      this.selectedFlight.origin.longitude
    ];

    const destination: L.LatLngExpression = [
      this.selectedFlight.destination.latitude,
      this.selectedFlight.destination.longitude
    ];

    const route = L.polyline(
      [origin, destination],
      {
        color: '#2563eb',
        weight: 4,
        opacity: 0.9,
        dashArray: '8 8'
      }
    );

    route.addTo(this.routeLayer);

    const bounds =
      L.latLngBounds([
        origin,
        destination
      ]);

    this.map.fitBounds(bounds, {
      padding: [60, 60],
      maxZoom: 7
    });

    this.openSelectedFlightPopup();
  }

  private openSelectedFlightPopup(): void {
    if (!this.selectedFlight) {
      return;
    }

    const marker = this.markers.get(
      this.selectedFlight.flightNumber
    );

    marker?.openPopup();
  }

  private updateMarkerIcons(): void {
    if (!this.leaflet) {
      return;
    }

    for (const flight of this.flights) {
      const marker =
        this.markers.get(flight.flightNumber);

      if (!marker) {
        continue;
      }

      marker.setIcon(
        this.createFlightIcon(flight)
      );
    }
  }

  private getFlightMarkerPosition(
    flight: Flight
  ): [number, number] {
    const latitude =
      (flight.origin.latitude +
        flight.destination.latitude) / 2;

    const longitude =
      (flight.origin.longitude +
        flight.destination.longitude) / 2;

    return [latitude, longitude];
  }

  private createFlightIcon(
    flight: Flight
  ): import('leaflet').DivIcon {
    if (!this.leaflet) {
      throw new Error(
        'Leaflet has not been initialized.'
      );
    }

    const isSelected =
      this.selectedFlight?.flightNumber ===
      flight.flightNumber;

    return this.leaflet.divIcon({
      className: '',
      html: `
        <div class="flight-marker ${isSelected ? 'selected' : ''}">
          <span class="flight-marker-dot"></span>
          <span class="flight-marker-label">
            ${flight.flightNumber}
          </span>
        </div>
      `,
      iconSize: [110, 34],
      iconAnchor: [55, 17]
    });
  }

  private createPopupContent(
    flight: Flight
  ): string {
    return `
      <div class="flight-popup">
        <div class="popup-title">
          ${flight.flightNumber}
        </div>

        <div class="popup-row">
          <span>Callsign</span>
          <strong>${flight.callsign}</strong>
        </div>

        <div class="popup-row">
          <span>Route</span>
          <strong>
            ${flight.origin.code} → ${flight.destination.code}
          </strong>
        </div>

        <div class="popup-row">
          <span>Status</span>
          <strong>${flight.status}</strong>
        </div>
      </div>
    `;
  }
}