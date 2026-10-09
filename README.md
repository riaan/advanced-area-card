# Advanced Area Card

A Home Assistant dashboard card that shows **one or more areas at a glance**: the area icon and name, live **summary chips** (lights on, temperature, humidity, music, lux, or your own numbers and counts for any entities) and **activity indicators** that light up when something is going on (motion, open doors and windows, heating, running fans, …).

![Advanced Area Card preview](docs/preview.png)

- **Everything from the visual editor.** Add the card from the dashboard "Add card" dialog and configure it with Home Assistant's own pickers. No YAML needed (but supported).
- **Knows your areas.** Entities are found through the area, device and entity registries: add a light to the area in Home Assistant and the card follows, without a reload.
- **Chips for any entity.** Besides the five ready-made chips, build your own: average CO2, total power, number of open windows, … from any entities.
- **Rule-based indicators.** Show an icon only when a rule is true, with optional delay, animation, badge, tooltip and value-dependent looks.
- **Home Assistant actions.** Tap and hold actions use Home Assistant's own action editor and handler (more-info, toggle, navigate, URL, perform action, assist), so confirmations and service targets behave like on built-in cards.
- **Fits your dashboard.** Follows your theme (light / dark), works with `card-mod`, and resizes in the Sections view.
- **Light and accessible.** One JavaScript file with no dependencies, re-renders only when something the card watches changes, works with the keyboard and screen readers, and respects "reduce motion".

## Requirements

Home Assistant **2026.7 or newer**. On older versions use release [v1.0.1](https://github.com/riaan/advanced-area-card/releases/tag/v1.0.1).

## Installation

### HACS (recommended)

[![Open your Home Assistant instance and add this repository to HACS.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=riaan&repository=advanced-area-card&category=plugin)

1. In Home Assistant open HACS → ⋮ (top right) → **Custom repositories**.
2. Add `https://github.com/riaan/advanced-area-card` with category **Dashboard**, then **Add**.
3. Search for *Advanced Area Card* in HACS → **Download**. HACS adds the dashboard resource for you.
4. Hard refresh the browser (clear the app cache in the mobile companion app).

### Manual

1. Download `advanced-area-card.js` from the [latest release](https://github.com/riaan/advanced-area-card/releases/latest) (or from `dist/`) and copy it to `/config/www/advanced-area-card.js`.
2. Settings → Dashboards → ⋮ → **Resources** → Add resource
   URL `/local/advanced-area-card.js?v=1`, type **JavaScript module**. (Enable *Advanced mode* in your user profile if you don't see Resources.)
3. Hard refresh the browser. Bump `?v=` after every update.

### Updating

HACS shows an update when a new release is published here. Download it from HACS, then hard refresh the browser (or clear the app cache on mobile) so the new file is loaded.

## Getting started

1. Edit a dashboard → **Add card** → search **Advanced Area**.
2. Pick one or more **areas**.
3. Add **chips** (lights, temperature, humidity, music, lux, or a custom chip) and **activity indicators** (pick an entity and you get a sensible default rule, icon and colour).
4. Open **Card actions** and **Advanced styling** if you want to change what a tap does or how the card looks.

## Features

### Header

- Area **icon and name** come from the area registry. Override either with `icon` / `title`.
- **Multiple areas** in one card (`areas`): chips and indicators combine all selected areas. The name and icon come from the first area unless overridden.
- `icon_style`: `plain` or `boxed`.
- Card-level `tap_action` and `hold_action`, see [Actions](#actions).

### Summary chips

Small pills under the header that summarise the area. Five are ready-made:

| Chip          | Shows                                                                          | Colour                                          |
| ------------- | ------------------------------------------------------------------------------ | ----------------------------------------------- |
| `lights`      | number of lights that are `on`                                                 | active / inactive colour, or the average light colour (`use_light_color`) |
| `temperature` | average of temperature sensors and `climate` entities with `current_temperature` | threshold colours and icons, unit conversion    |
| `humidity`    | average of humidity sensors and `climate` entities with `current_humidity`     | threshold colours and icons                     |
| `music`       | number of media players that are `playing`, `buffering` or `on`                | active / inactive colour                        |
| `lux`         | average of illuminance sensors                                                 | threshold colours and icons                     |

**Options for every chip**

- reorder it and override its **icon**;
- take its entities from **the area** or from a **custom entity list** (`use_custom_entities`, `entity_ids`). The five ready-made chips can do both;
- set **tap** and **hold** actions (default: more-info), see [Actions](#actions);
- **hide it when zero** (`hidden_when_zero`; lights, music, lux and custom chips);
- override the **active / inactive colours** (`active_color`, `inactive_color`; lights, music and custom chips);
- edit the **threshold table** (value → colour → optional icon) of temperature, humidity, lux and numeric custom chips. Sensible defaults are built in. When rows end up out of order, the editor marks them and offers a **Sort by value** button. The temperature, humidity and lux tables have a **Reset to defaults** button that restores the built-in rows.

#### Custom chips

A **custom chip** (`type: custom`, add as many as you like) works with **any entities**, inside or outside the area, and shows either:

- a **number** (`mode: numeric`): the `avg`, `sum`, `min`, `max` or `first` of the entities' states, or of an `attribute`, with `decimals`, an optional `unit` (defaults to the entity's own unit) and optional threshold colours and icons; or
- a **count** (`mode: count`) of the entities that match a condition (`count_operator`: `truthy`, `falsy`, `eq`, `ne`, `in`, `not_in`, `contains`, `gt`, `gte`, `lt`, `lte`, with `count_value`). With the default `truthy` it counts entities that are on / open / active.

```yaml
chips:
  - type: custom
    name: CO2
    icon: mdi:molecule-co2
    entity_ids: [sensor.living_room_co2, sensor.kitchen_co2]
    mode: numeric
    aggregation: max
    decimals: 0
    thresholds:
      - { value: 0, color: "#43b581" }
      - { value: 1000, color: "#ff9800" }
      - { value: 1500, color: "#f44336" }
  - type: custom
    name: Open windows
    icon: mdi:window-open
    entity_ids: [binary_sensor.window_1, binary_sensor.window_2]
    mode: count
    hidden_when_zero: true
```

In the editor, the attribute and value pickers follow the first selected entity, so you choose from its real attributes and states.

**Entity pickers.** Once you have chosen an area, every entity picker in the editor (chips, indicators, rules, actions) lists the entities of that area first, plus anything you already selected. Turn on **Show all entities** under a picker to choose from every Home Assistant entity, for example a garage door sensor in another area, or `weather` and `sun`. The switch is per picker and is not stored in the card config.

### Activity indicators

Small icons in the top-right that appear when something is going on. Each indicator is driven by a **rule**, so it can do much more than "entity is on".

- **Smart defaults** from the entity picked in the editor: binary sensor device classes (motion, door, window, moisture, smoke, gas, CO, plug, power, …), lights, switches, fans (spinning icon), media players, cameras, vacuums, covers, weather, climate (heating / cooling), locks, persons / device trackers and numeric sensors.
- **Rules** (`when`, plus extra `and_if` conditions):
  - `state` — operators `eq`, `ne`, `in`, `not_in`, `contains`, `matches`, `truthy`, `falsy`. In the editor the value is picked from the entity's real states.
  - `numeric` — `gt`, `gte`, `lt`, `lte` on the state or an attribute
  - `time` — only between `after` and `before` (HH:MM, overnight windows work)
  - `and` / `or` / `not` — combine rules
  - several entities per rule with aggregation `any`, `all`, `none`, `sum`, `avg`, `min`, `max`, `count`, `first`
  - `for` / `for_duration` — only show after the condition has held for N seconds
- **Display**: icon, colour, size and icon size, animation (`none`, `pulse`, `spin`, `blink`, `bounce`, `shake`, with speed), a badge with text and colour, a tooltip, and what to do when inactive (`hide`, `dim` with opacity, or `show`).
- **Display overrides** — change icon, colour, animation, … depending on the value, e.g. a fan that spins faster with its percentage or a temperature sensor that turns red above 25 °C.
- Tooltip and badge text support `{{entity}}`, `{{state}}`, `{{value}}` and `{{attr.name}}`.
- Tap and hold actions per indicator, reorderable in the editor.

### Actions

The card, every chip and every indicator can have a **tap** and a **hold** action. They are edited with Home Assistant's own action editor and run by Home Assistant itself, so they work like on built-in cards: `more-info`, `toggle`, `navigate`, `url`, `perform-action` (with target and data), `assist` and `none`.

- `more-info` and `toggle` on a chip or indicator act on its first entity. You can choose another entity in the editor.
- **"None" means "use the card's action".** If a chip's or indicator's tap or hold action is `none`, a press on it runs the card's tap or hold action instead (tap and hold are decided separately). So a card that navigates to a room dashboard also navigates when you tap one of its chips, unless the chip has an action of its own. Note that this includes hold: a card hold action also runs when you hold a chip that has no hold action of its own.
- Confirmations (`confirmation:` in YAML) are supported because Home Assistant runs the action.
- Configs written for older versions (`call-service` with `service`, `service_data`, `entity_id`) keep working and are converted when loaded.

### Styling

Under `styling` you can hide the title or icon, set their colours and tweak sizes and spacing in pixels: title size, icon size, chip margin / gap / padding / min width / radius / icon and text size, indicator gap / size / radius / icon size. Anything you leave empty uses the built-in default.

### Dashboards and accessibility

- **Sections view**: the card is full width by default, can be resized down to half a section, and its height follows its content.
- **Keyboard and screen readers**: Tab to a chip or indicator and press Enter or Space for its tap action. Chips and indicators have accessible names. When the card has a tap or hold action, the header (area icon and name) becomes focusable too: press Enter or Space on it to run the card's tap action (or its hold action when that is the only one).
- **Reduced motion**: indicator animations are switched off when your system asks for reduced motion.

## Configuration

Use the visual editor for anything beyond the basics. A minimal YAML configuration:

```yaml
type: custom:advanced-area-card
areas:
  - woonkamer
chips:
  - type: lights
  - type: temperature
  - type: humidity
  - type: music
  - type: lux
    hidden_when_zero: true
activity_indicators:
  - name: Movement
    when:
      type: state
      entity_id: binary_sensor.living_room_motion
      operator: in
      value: ["on", "detected"]
    display:
      icon: mdi:motion-sensor
      color: "#ff9800"
```

A fan that spins faster as the speed goes up:

```yaml
activity_indicators:
  - name: Fan
    when:
      type: state
      entity_id: fan.living_room
      operator: eq
      value: "on"
    display:
      icon: mdi:fan
      color: "#43b581"
      animation: spin
      display_overrides:
        - match: { entity_id: fan.living_room, attribute: percentage, operator: gte, value: 66 }
          animation_speed: 3
```

A card that opens a room dashboard, where the chips follow that action unless they have their own:

```yaml
type: custom:advanced-area-card
areas: [woonkamer]
tap_action:
  action: navigate
  navigation_path: /dashboard-woonkamer/home
chips:
  - type: lights
  - type: music            # tap = card action (navigate)
  - type: temperature
    tap_action: { action: more-info }
```

### Card options

| Option                | Description                                                          |
| --------------------- | -------------------------------------------------------------------- |
| `areas`               | List of area ids. (A single `area: id` from older configs still works.) |
| `title`, `icon`       | Override the area name / icon.                                       |
| `icon_style`          | `plain` (default) or `boxed`.                                        |
| `tap_action`, `hold_action` | Home Assistant action config, see [Actions](#actions).         |
| `chips`               | List of chips, see below.                                            |
| `activity_indicators` | List of indicators, see below.                                       |
| `styling`             | Sizes, colours and visibility of title and icon, chips and indicators. |

### Chip options

| Option                        | Applies to  | Description                                                          |
| ----------------------------- | ----------- | -------------------------------------------------------------------- |
| `type`                        | all         | `lights`, `temperature`, `humidity`, `music`, `lux` or `custom`.     |
| `icon`                        | all         | Override the icon.                                                   |
| `entity_ids`, `use_custom_entities` | presets | Use a fixed entity list instead of the area's entities.            |
| `entity_ids`                  | `custom`    | The entities to show (any entity, also outside the area).            |
| `hidden_when_zero`            | lights, music, lux, `custom` | Hide the chip when its value is zero / nothing is active. |
| `active_color`, `inactive_color` | lights, music, `custom` | Override the colours.                                  |
| `use_light_color`             | `lights`    | Use the average colour of the lights that are on.                    |
| `thresholds`                  | temperature, humidity, lux, numeric `custom` | List of `{ value, color, icon }`, lowest first. |
| `name`, `mode`, `aggregation`, `attribute`, `unit`, `decimals`, `count_operator`, `count_value` | `custom` | See [Custom chips](#custom-chips). |
| `tap_action`, `hold_action`   | all         | Actions, see [Actions](#actions).                                    |

### Indicator options

| Option                | Description                                                                    |
| --------------------- | ------------------------------------------------------------------------------ |
| `name`                | Label (also the default tooltip).                                              |
| `when`                | The rule that makes the indicator show, see [Activity indicators](#activity-indicators). |
| `and_if`              | Extra rules that must also be true.                                            |
| `for_duration`        | Seconds the rule must hold before the indicator shows.                         |
| `display`             | Icon, colour, size, animation, badge, tooltip, inactive behaviour and `display_overrides`. |
| `tap_action`, `hold_action` | Actions, see [Actions](#actions).                                        |

## Troubleshooting

- **Card not in the picker** — hard refresh; check the resource is listed under Settings → Dashboards → Resources as *JavaScript module*.
- **Editor fields look wrong or are missing** — this version needs Home Assistant 2026.7 or newer. On older versions install release v1.0.1.
- **A chip shows `--`** — no matching entity is in the area (or in the custom list), or the entities have no numeric value. Assign the entities or their device to the area in Home Assistant, or check the entity list of a custom chip.
- **Tapping a chip does nothing** — its action is `none` and the card has no tap action either. Give the chip or the card an action.
- **Holding a chip triggers the card's hold action** — that is the "None means the card's action" rule. Give the chip its own hold action to change it.
- **Console banner** — the browser console prints `ADVANCED-AREA-CARD <version>` when the file is loaded; include it in bug reports.

## Development

```bash
npm install
npm run lint
npm run check:version -- vX.Y.Z   # release tag vs VERSION in the JS and CHANGELOG
```

The shipped file is `dist/advanced-area-card.js`. HACS reads releases, so the release tag (`vX.Y.Z`) must match `const VERSION = "X.Y.Z"` in that file.

## License

[MIT](LICENSE)
