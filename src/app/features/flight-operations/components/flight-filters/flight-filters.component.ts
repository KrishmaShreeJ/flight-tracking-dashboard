import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlightStatus } from '../../../../core/models/flight.model';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

export interface FlightFilterValue {
  callsign: string;
  status: FlightStatus | '';
  origin: string;
  destination: string;
}

@Component({
  selector: 'app-flight-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './flight-filters.component.html',
  styleUrl: './flight-filters.component.css'
})
export class FlightFiltersComponent {
  @Input() airports: string[] = [];

  @Output() filtersChanged = new EventEmitter<FlightFilterValue>();
  @Output() filtersCleared = new EventEmitter<void>();
  readonly statuses: FlightStatus[] = [
    'SCHEDULED',
    'ACTIVE',
    'DELAYED',
    'ARRIVED'
  ];

  readonly filterForm = new FormGroup({
    callsign: new FormControl('', { nonNullable: true }),
    status: new FormControl<FlightStatus | ''>('', { nonNullable: true }),
    origin: new FormControl('', { nonNullable: true }),
    destination: new FormControl('', { nonNullable: true })
  });

  constructor() {
    this.filterForm.valueChanges.subscribe(value => {
      this.filtersChanged.emit({
        callsign: value.callsign ?? '',
        status: value.status ?? '',
        origin: value.origin ?? '',
        destination: value.destination ?? ''
      });
    });
  }

  clearFilters(): void {
    this.filterForm.reset({
      callsign: '',
      status: '',
      origin: '',
      destination: ''
    });
      this.filtersCleared.emit();
  }
}
