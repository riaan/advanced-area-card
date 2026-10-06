# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Fixed

- Indicators with a `for` delay and time-of-day rules no longer get stuck after the card is detached and reattached (view switch, dashboard edit mode): timers are re-armed on reconnect.
- The editor's area list and entity candidates no longer come back empty after the editor is reattached.
- A temporary failure while loading the area, device and entity registries is no longer cached for the whole session; the load is retried after 10 seconds.
- Loading the script twice no longer lists the card twice in the card picker.

### Changed

- Performance: cards with time-of-day indicators only re-render when a watched entity changes or on the 30 s tick, instead of on every Home Assistant state event.
- Performance: fewer allocations per state event (entity count is computed once per update without building key arrays).
- Performance: the editor throttles live indicator preview refreshes and shares a single registry load instead of stacking callbacks.

## [1.0.0]

First public release.

### Added

- Advanced Area card (`custom:advanced-area-card`) with area icon and name from the area registry, optional title and icon overrides, `plain` / `boxed` icon style and card-level tap and hold actions.
- Multi-area support: select several areas in one card (`areas`); a legacy single `area` is migrated automatically.
- Summary chips for lights, temperature, humidity, music and lux, resolved through the area, device and entity registries.
  - Per chip: reorder, icon override, all-in-area or custom entity list, tap / hold actions, hide when zero, active / inactive colours, average light colour for lights.
  - Editable threshold tables (value, colour, icon) for temperature, humidity and lux, with built-in defaults and temperature unit conversion.
- Rule-based activity indicators:
  - Smart defaults per entity type (binary sensor device classes, lights, switches, fans, media players, cameras, vacuums, covers, weather, climate, locks, persons, numeric sensors).
  - `state`, `numeric` and `time` rules, `and` / `or` / `not` grouping, extra `and_if` conditions, multi-entity aggregation and a `for` delay.
  - Icon, colour, size, animation (pulse, spin, blink, bounce, shake) with speed, badge, tooltip with `{{entity}}`, `{{state}}`, `{{value}}`, `{{attr.x}}` templates, hide / dim / show when inactive, and value-dependent display overrides.
  - Tap and hold actions per indicator.
- Styling options for title, icon, chips and indicators (colours, sizes, spacing).
- Visual editor, so the card appears in the dashboard "Add card" dialog.
- Performance: registry lookups cached once, re-renders only when watched entities change, event delegation and a persistent shadow DOM shell that keeps `card-mod` styles.
- HACS packaging: shipped file in `dist/`, `hacs.json`, validation and release-check workflows, issue templates.
