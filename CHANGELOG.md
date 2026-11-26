# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Fahrenheit support for the temperature chip (issue #1). The chip now shows and colours the temperature in Home Assistant's unit system (Settings → System → General), converting every sensor to it. The built-in colour table exists in both units (-4 / 14 / 32 / 41 / 50 / 59 / 68 / 86 °F next to the °C one), and the one matching the unit is used while the table is not edited. Cards saved with the old built-in °C table switch to the °F table automatically; edited tables are never changed and are read in the displayed unit.
- New chip option `temperature_unit` (`auto`, `°C` or `°F`, default `auto`) to show one chip in a different unit than Home Assistant. In the editor: "Temperature unit". The threshold section names the unit, and "Reset to defaults" restores the table for it.
- The default rule of a new temperature indicator is "above 77" for a sensor reporting °F (still 25 for °C). Existing indicators are unchanged.

### Fixed

- A temperature chip whose first sensor reported °F was compared with the °C colour table, so every reading looked hot. The unit now comes from Home Assistant (or `temperature_unit`), not from the first sensor.

**Behaviour change:** if you edited the temperature thresholds in °C and later switch Home Assistant to °F, those rows are read as °F values; edit them or use "Reset to defaults".

## [1.0.2]

### Changed

- README: installation now leads with searching for the card in HACS (Settings → Marketplace on Home Assistant 2026.11 and newer); the custom repository steps are a fallback.

### Fixed

- Touch screens: tapping the card could also "tap" the page it navigated to. The tap action ran on release, so the browser's follow-up click landed on whatever the new page showed under the finger (a light card, the more-info dialog of a graph or lock, ...), often only on the first tap after the app started. The tap action now runs from that click itself, so nothing follows it, and the click that trails a hold action is swallowed. A tap also always runs the action of what the finger went down on, even when the card re-renders during the press, and a finger that moves more than 10 px (scrolling) no longer counts as a tap.

## [1.0.1]

### Changed

- No changes to the card. Release for the HACS listing: the repository now has its topics and description set, so the HACS validation passes on this tag.

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
