import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'flight-operations',
        pathMatch: 'full'
    },
    {
        path: 'flight-operations',
        loadComponent: () =>
            import('./features/flight-operations/pages/flight-dashboard/flight-dashboard.component')
                .then(component => component.FlightDashboardComponent)
    },
    {
        path: '**',
        redirectTo: 'flight-operations'
    }
];
