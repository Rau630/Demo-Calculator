## Modern Calculator (HTML • CSS • JavaScript)

A small, polished, and accessible calculator built with plain HTML, CSS, and vanilla JavaScript. It supports the usual arithmetic operations, percent, decimal input, sign toggle, chaining operations, and basic error handling (e.g., divide by zero).

### Features
- **Clean UI**: Glassy panel, soft shadows, and a responsive layout.
- **Accessible semantics**: Uses `role="application"`, live regions, and clear button labels.
- **Chaining operations**: Enter `12 + 7 − 5 × 3 =` without clearing between steps.
- **Decimal input**: Single decimal per number is enforced.
- **Percent**: Converts current value to a percentage (e.g., `50` → `0.5`).
- **Sign toggle (±)**: Quickly negates the current value.
- **Error state**: Division by zero yields `Error` and safely resets flow on next input.

### Tech Stack
- **HTML**: Semantic structure with ARIA roles.
- **CSS**: Modern, theme-aware styling using CSS variables; responsive grid for keys.
- **JavaScript**: Lightweight state machine driving display and input handling.

### Quick Start
1. Download or clone this folder.
2. Open `index.html` directly in your browser, or use a local server for best results:
   - VS Code: install Live Server → Right-click `index.html` → "Open with Live Server".
   - Node users: `npx serve` (or any static server) in the project directory.

### Project Structure
```
New test/
├─ index.html   # Markup and calculator layout
├─ style.css    # Styles, layout, and theming (dark/light aware)
└─ index.js     # Interaction logic and calculator state
```

### How to Use
- Click number keys to build the current value.
- Click an operator (`+`, `−`, `×`, `÷`) to set/chain operations.
- Click `=` to evaluate.
- Click `AC` to clear all, `DEL` to delete the last digit, `%` for percent, `±` to toggle sign, and `.` for decimal.

### Accessibility
- The main container uses `role="application"` and the display section is an ARIA live region (`aria-live="polite"`) so screen readers announce updates.
- Each key is a real `<button>` with descriptive `aria-label`s for non-text symbols.
- Focus styles are visible for keyboard users.

---

## Code Walkthrough

The logic is intentionally compact and readable. The calculator is driven by three pieces of state and a simple `operate` function.

### Core State (in `index.js`)
- `previousValue`: the last committed operand (string representation until evaluation).
- `currentValue`: the value currently being typed or last computed result (string).
- `operator`: one of `+`, `-`, `*`, `/` or empty when none is selected.
- `noEvent`: a small guard flag used after `=` (so the next number press starts a new entry).

### DOM Hooks
- `displayPrevious`: the expression header (e.g., `12 +`).
- `displayCurrent`: the large main display (e.g., `7`).
- Button groups: function keys (`AC`, `DEL`, `%`), operators, number keys, `.` (decimal), `=` (equals), and `±` (sign toggle).

### Event Handling Overview
- **Function keys (`AC`, `DEL`, `%`)**
  - `AC` resets state and displays `0`.
  - `DEL` removes the last digit from `currentValue` and shows `0` if empty.
  - `%` sets `currentValue = Number(currentValue) / 100`.

- **Number keys**
  - If `noEvent` is set (user just pressed `=`), the next number press resets entries and starts fresh.
  - Appends the digit to `currentValue` and updates `displayCurrent`.

- **Operator keys (`+`, `-`, `*`, `/`)**
  - If the user switches operators without typing a new number, the operator updates in place.
  - If `previousValue`, `currentValue`, and `operator` are all present, it computes immediately to allow chaining (e.g., `12 + 7 −` computes the `+` before setting `−`).
  - Stores the selected operator, moves the number into `previousValue`, clears `currentValue`, and updates the header.

- **Equals (`=`)**
  - If all inputs are present, computes the result with `operate`, updates `displayCurrent`, clears the header, and sets `noEvent = true` so the next number press begins a new entry.

- **Decimal (`.`)**
  - If `noEvent` is set, starts a new `currentValue` as `0`.
  - Adds a single decimal point to `currentValue` if not already present.

- **Sign toggle (±)**
  - Negates `currentValue` if present.

### The `operate` Function
Responsible for the four basic operations and basic guard rails:
- Parses `a` and `b` with `Number(...)`.
- `+`, `-`, `*` compute normally.
- `/` returns `"Error"` if dividing by zero; otherwise computes `a / b`.

This function returns numbers for valid math or the string `"Error"` when a guard triggers. The UI treats the return value as the new `displayCurrent` and adjusts subsequent state transitions accordingly.

### Edge Cases & Notes
- **Multiple decimals**: prevented by checking `currentValue.includes('.')`.
- **Operator replacement**: tapping operators back-to-back updates the operator without computing until a number is provided.
- **Post-`=` input**: the `noEvent` flag ensures the next digit starts a fresh calculation.
- **Delete to empty**: `DEL` shows `0` when `currentValue` becomes empty.
- **Divide by zero**: results in `Error`. Pressing a number afterwards starts fresh.

---

## Customize
- Tweak the CSS variables in `:root` inside `style.css` for colors and shadows.
- Adjust fonts by changing the Google Fonts link in `index.html`.
- Add keyboard support by mapping `keydown` events to the same handlers used by the buttons.

## License
This project is open-source under the MIT License. Do whatever you like, but attribution is appreciated.


