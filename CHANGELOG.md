# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.0.0]

First public release.

**Requires Home Assistant 2026.7 or newer.**

### Added

- Advanced Area card (`custom:advanced-area-card`) with area icon and name from the area registry, optional title and icon overrides, `plain` / `boxed` icon style and card-level tap and hold actions.
- Multi-area support: select several areas in one card (`areas`); a legacy single `area` is migrated automatically.
- Summary chips for lights, temperature, humidity, music and lux, resolved through the area, device and entity registries.
  - Per chip: reorder, icon override, all-in-area or custom entity list, tap / hold actions, hide when zero, active / inactive colours, average light colour for lights.
  - Editable threshold tables (value, colour, icon) for temperature, humidity and lux, with built-in defaults, temperature unit conversion and a **Reset to defaults** button.
- **Custom chips** (`type: custom`) for any entities, in or outside the area: either a number (average, sum, minimum, maximum or first of the states or an attribute, with decimals, unit, threshold colours and icons) or a count of entities matching a condition. Add as many as you like.
- Rule-based activity indicators:
  - Smart defaults per entity type (binary sensor device classes, lights, switches, fans, media players, cameras, vacuums, covers, weather, climate, locks, persons, numeric sensors).
  - `state`, `numeric` and `time` rules, `and` / `or` / `not` grouping, extra `and_if` conditions, multi-entity aggregation and a `for` delay.
  - Icon, colour, size, animation (pulse, spin, blink, bounce, shake) with speed, badge, tooltip with `{{entity}}`, `{{state}}`, `{{value}}`, `{{attr.x}}` templates, hide / dim / show when inactive, and value-dependent display overrides.
  - Tap and hold actions per indicator.
- Actions use Home Assistant's own action editor and handler (`hass-action`): more-info, toggle, navigate, URL, perform action (with target and data), assist and none. A chip or indicator whose action is "None" uses the card's action for that gesture. Older `call-service` configs are converted automatically.
- Visual editor built on Home Assistant's own form components, so the card appears in the dashboard "Add card" dialog. Entity pickers offer the entities of the card's areas by default, with a **Show all entities** switch.
- The card and editor follow changes in the area, device and entity registries without a page reload.
- Accessibility: chips, indicators and the card header work with the keyboard (Enter / Space for tap; Shift+Enter, Shift+Space, the context-menu key or Shift+F10 for hold) and screen readers (`aria-label`s); animations are disabled with `prefers-reduced-motion`.
- Sections dashboards: full width by default, resizable down to half a section, height follows content.
- Styling options for title, icon, chips and indicators (colours, sizes, spacing).
- Performance: registry lookups cached once, re-renders only when watched entities change, event delegation and a persistent shadow DOM shell that keeps `card-mod` styles.
- HACS packaging: shipped file in `dist/`, `hacs.json`, validation and release-check workflows, issue templates.
