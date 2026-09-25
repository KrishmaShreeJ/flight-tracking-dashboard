import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

import { Flight } from '../../../../core/models/flight.model';
import { DatePipe } from '@angular/common'; 

@Component({
  selector: 'app-flight-details',
  standalone: true,
  imports: [DatePipe ],
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightDetailsComponent {
  @Input() flight: Flight | null = null;
}