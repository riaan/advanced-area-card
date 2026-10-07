# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.2.0]

### Added

- **Custom chips** (`type: custom`): a chip for any entities, in or outside the area, that shows either a number (average, sum, minimum, maximum or first of the states or an attribute, with decimals, unit, threshold colours and icons) or a count of entities matching a condition. You can add as many as you like; the editor offers an "Add custom chip" button with attribute and value pickers that follow the selected entity.

### Fixed

- Editor: typing a threshold value keeps the focus. Rows no longer re-sort or jump while you type; out-of-order rows are marked and a "Sort by value" button applies the sort when you want it. The editor also no longer swaps its config for a re-sorted copy after every change, which could make a field edit the wrong row. A late echo from Home Assistant is now recognised too, so it no longer re-sorts the table and re-renders the editor in the middle of typing.

### Changed

- Editor: threshold rows show value and color side by side with the icon below, equally spaced, and with more space between rows, so the fields have room and it is clear which belong together.
- Editor: every color field uses Home Assistant's color selector (theme colors, state color, none) through the standard form instead of a bare `ha-color-picker` element.
- Editor: the `attribute` field of rules and display overrides is a picker listing the real attributes of the selected entity (free text until an entity is chosen).
- Editor: for text rules with `equals`, `not equals`, `is one of` and `is not one of`, the value is picked from the entity's actual states (custom values still allowed); `is one of` is a multi-select instead of comma-separated text. `is truthy` / `is falsy` no longer show a value field.

## [1.1.0]

### Added

- Chips and indicators can be activated with the keyboard (Tab to focus, Enter or Space for the tap action) and by screen readers.
- Chips and indicators have an `aria-label` (chip name and value, indicator tooltip or name).
- Indicator animations are disabled when the system asks for reduced motion (`prefers-reduced-motion`).
- Sections dashboards: the card is full width by default, can be resized down to half a section, and its height follows its content (`getGridOptions`).

### Fixed

- Editing a card no longer leaves stale `for` timers or timestamps for removed indicators, and `for` delays of existing indicators are re-armed after a config change.
- A press in progress no longer fires its hold action after the card is removed from the page.

### Changed

- Internal cleanup: removed unused helper functions and constants.
- **Requires Home Assistant 2026.7 or newer** (`hacs.json`). Home Assistant migrated its form components to Web Awesome; older versions stay on v1.0.1.
- Editor: the "Add" buttons use the current `ha-button` size name (`s`) instead of the removed `small`.
- Editor: the threshold "Min value" field is now a standard form number selector instead of the deprecated `ha-textfield` element.

## [1.0.1]

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
