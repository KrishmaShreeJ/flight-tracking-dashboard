# Flight Tracking & Operations Dashboard

A responsive aviation operations dashboard built with Angular and Leaflet for monitoring mock flight activity, routes, statuses, and operational details.

## Overview

The Flight Tracking & Operations Dashboard provides an interactive view of flight operations through a Leaflet-based map, KPI summary cards, flight filtering, a flight details panel, and a responsive flight list.

The application uses mock flight and airport data and does not require a backend.

## Features

### Interactive Flight Map

* Leaflet-based interactive map
* 15 mock flights across major Indian airports
* Flight markers with flight numbers
* Click a flight marker to select the flight
* Flight information available through marker popups
* Selected flight marker is visually highlighted

### Flight Route Visualization

* Displays the selected flight's origin and destination route
* Draws a polyline between the two airports
* Automatically centers the map on the selected flight
* Automatically opens the selected flight's popup

### Flight Details Panel

Displays:

* Flight Number
* Callsign
* Aircraft Type
* Origin
* Destination
* Current Status
* Estimated Departure
* Estimated Arrival

### Operations KPIs

The dashboard provides live KPI counts for:

* Total Flights
* Active Flights
* Delayed Flights
* Arrived Flights

KPI values update according to the currently filtered flight set.

### Search & Filtering

Reactive Forms are used to provide:

* Callsign search
* Status filter
* Origin airport filter
* Destination airport filter
* Clear filters action

### Responsive Dashboard

The interface is designed for desktop, tablet, and smaller screens with responsive layouts for:

* KPI cards
* Filter controls
* Map and details panel
* Flight list

## Technology Stack

* Angular 19
* TypeScript
* Reactive Forms
* RxJS
* Angular Routing
* Leaflet
* HTML5
* CSS3

## Architecture

The application follows a feature-oriented Angular structure:

```text
src/app/
├── core/
│   ├── data/
│   ├── models/
│   └── services/
│
├── features/
│   └── flight-operations/
│       ├── components/
│       │   ├── flight-details/
│       │   ├── flight-filters/
│       │   ├── flight-list/
│       │   └── flight-map/
│       │
│       └── pages/
│           └── flight-dashboard/
│
├── layout/
│
└── shared/
    └── ui/
        └── kpi-card/
```

### Key architectural responsibilities

**Core**

Contains application-wide models, mock data, and services.

**Features**

Contains the flight operations functionality and its UI components.

**Shared**

Contains reusable UI components such as KPI cards.

**Routing**

The flight operations dashboard is loaded through Angular routing using a lazy-loaded standalone component.

## Data Model

Flight information is represented using TypeScript interfaces and strongly typed status values.

Mock data is maintained separately from the UI components, allowing the presentation layer to consume structured flight and airport data through the `FlightService`.

## Getting Started

### Prerequisites

* Node.js
* npm
* Angular CLI

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
ng serve
```

Open:

```text
http://localhost:4200/
```

The application will automatically reload when source files are changed.

## Build

To create a production build:

```bash
ng build
```

Build artifacts are generated in the `dist/` directory.

## Testing

Unit tests can be executed with:

```bash
ng test
```

The project currently passes the available unit test suite.

## Mock Data

The application uses local mock data for flights and airports.

Flight data includes:

* Flight number
* Callsign
* Aircraft type
* Origin airport
* Destination airport
* Status
* Estimated departure
* Estimated arrival

No backend or external flight-tracking API is required to run the application.

## Design Approach

The dashboard follows an aviation operations-oriented layout with the map as the primary visual area.

The interface is organized into:

1. Operations header
2. KPI summary cards
3. Search and filter controls
4. Flight tracking map
5. Selected flight details panel
6. Flight operations list

The design uses clear visual hierarchy, consistent spacing, status indicators, responsive layouts, and accessible form labels to keep operational information easy to scan.

## Future Enhancements

Potential future enhancements include:

* Flight animation/playback
* Dark mode
* Airport markers
* Marker clustering
* Weather overlays
* Additional automated tests
* Real-time flight data integration

## Assessment

This project was developed as a Frontend Developer technical assessment demonstrating Angular application development, component-based architecture, reactive forms, routing, services, RxJS, Leaflet integration, responsive UI design, and interactive flight operations functionality.
