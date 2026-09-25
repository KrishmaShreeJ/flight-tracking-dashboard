import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Flight } from '../../../../core/models/flight.model';

@Component({
  selector: 'app-flight-list',
  imports: [],
  templateUrl: './flight-list.component.html',
  styleUrl: './flight-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightListComponent {
@Input({ required: true }) flights: Flight[] = [];
  @Input() selectedFlight: Flight | null = null;

  @Output() flightSelected = new EventEmitter<Flight>();

  selectFlight(flight: Flight): void {
    this.flightSelected.emit(flight);
  }
}
