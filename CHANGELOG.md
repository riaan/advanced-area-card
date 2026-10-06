# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

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
