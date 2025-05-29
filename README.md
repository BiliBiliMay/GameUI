# Morrowind UI Emulator Demo

This project is a web-based demonstration emulating the user interface (UI) of the game *The Elder Scrolls III: Morrowind*. It focuses on recreating the visual aesthetic and a reactive, resizable grid layout for key UI components using HTML, CSS (CSS Grid, Custom Properties), and vanilla JavaScript.

## Features

*   **Reactive Full-Page Grid Layout:** UI panels (Character Stats, Spells, Inventory, Map) are arranged in a grid that fills the browser viewport and adapts to browser window resizing.
*   **Resizable Panels:** Vertical splitter bars allow users to interactively resize the width of the Character Stats, Spells, and Map columns.
*   **Morrowind-Inspired Styling:**
    *   Dark color palette reminiscent of the original game.
    *   Textured panel backgrounds and title bars.
    *   Custom `.ttf` font loading (`MyMorrowindFont.ttf`) for an authentic feel.
*   **Key UI Components Recreated (based on provided screenshots):**
    *   **Character Stats Panel (e.g., "Manani"):** Displays health/magicka/fatigue gauges, level, race, class, attributes, and skills (Major, Minor, Misc).
    *   **Spells Panel (e.g., "Almsivi Intervention"):** Lists powers and spells with their costs/chances.
    *   **Inventory Panel (e.g., "Daedric Spear"):** Features horizontal tabs (All, Weapon, Apparel, Magic, Misc), a placeholder item grid, a paperdoll area, and an encumbrance bar.
    *   **Map Panel (e.g., "Balmora"):** Displays a static map image (`image.png`).
*   **Interactive Elements:**
    *   Dynamic gauges for Health, Magicka, Fatigue, and Encumbrance update based on HTML data attributes.
    *   Functional tabs in the Inventory panel to switch displayed item categories.
*   **Built with Web Standards:** Utilizes HTML5, CSS3, and plain JavaScript (no external libraries for core functionality).

## Visual Preview

*(It's highly recommended to add a screenshot of the UI in action here.)*

Example:
![Morrowind UI Demo Screenshot](placeholder_screenshot.png)
*(Replace `placeholder_screenshot.png` with an actual image if you create one)*

## Technologies Used

*   HTML5
*   CSS3
    *   CSS Grid Layout
    *   CSS Flexbox
    *   CSS Custom Properties (Variables)
*   Vanilla JavaScript (ES6+)

## Project Setup

1.  **Clone or Download:**
    Obtain the project files:
    *   `index.html`
    *   `style.css`
    *   `script.js`

2.  **Add Required Assets:**
    Place the following files in the **same directory** as `index.html`:
    *   `MyMorrowindFont.ttf` (Your custom TrueType Font file)
    *   `image.png` (Your map image file)

3.  **Open in Browser:**
    Open the `index.html` file in a modern web browser (e.g., Google Chrome, Mozilla Firefox, Microsoft Edge).

## Usage

*   Once `index.html` is opened, the Morrowind-style UI will be displayed, filling the browser window.
*   **Resize Browser Window:** Observe how the panels within the grid react and adjust their sizes.
*   **Resize Panels:**
    *   Hover over the vertical bars (splitters) between the "Character Stats" & "Spells" panels, and between the "Spells" & "Map" panels.
    *   The cursor will change to a column-resize icon.
    *   Click and drag these splitters horizontally to interactively adjust the width of the adjacent panels.
*   **Interact with Inventory:**
    *   Click on the tabs ("All", "Weapon", "Apparel", "Magic", "Misc") in the "Inventory" panel to view placeholder content for each category.

## Known Issues & Limitations

*   **Basic Splitter Implementation:** The panel resizing logic is functional but basic. It doesn't include advanced features like saving panel sizes or complex constraints beyond minimum width.
*   **No Horizontal Splitters:** Currently, only vertical resizing of columns is implemented.
*   **Demo Purposes Only:** This is a UI demonstration and does not contain any game logic, data persistence, or advanced interactions beyond what's described.
*   **Placeholder Content:** Item icons and detailed data in the inventory are placeholders.
*   **Static Map:** The map is a static image without zoom, pan, or interactive markers.

## Future Improvements (Potential)

*   Implement horizontal splitters for resizing row heights.
*   Add functionality to save and restore panel sizes (e.g., using `localStorage`).
*   Enhance the map panel with basic zoom/pan capabilities.
*   More detailed placeholder icons and item properties.
*   Allow "closing" or "minimizing" panels within the grid layout (would require more complex grid management).

---
