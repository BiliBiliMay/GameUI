document.addEventListener('DOMContentLoaded', () => {
    // --- Gauge and Tab Functionality (Keep from previous) ---
    const gauges = document.querySelectorAll('.gauge.dark');
    gauges.forEach(gaugeElement => {
        const current = parseInt(gaugeElement.dataset.current);
        const max = parseInt(gaugeElement.dataset.max);
        const color = gaugeElement.dataset.color || '#007acc';
        const percentage = Math.max(0, Math.min(100, (current / max) * 100));
        gaugeElement.innerHTML = `<div class="gauge-bar-fill" style="width: ${percentage}%; background-color: ${color};"><span class="gauge-value-text-overlay">${current}/${max}</span></div>`;
    });
    
    const inventoryWindow = document.getElementById('inventory-window');
    if (inventoryWindow) {
        const tabButtons = inventoryWindow.querySelectorAll('.inventory-tabs.horizontal .tab-button');
        const tabContents = inventoryWindow.querySelectorAll('.item-grid-container .tab-content');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                button.classList.add('active');
                const tabId = button.dataset.tab;
                const activeContent = inventoryWindow.querySelector(`#${tabId}-content`);
                if (activeContent) activeContent.classList.add('active');
            });
        });
    }

    // --- Resizable Splitters ---
    const container = document.getElementById('morrowind-ui-container');
    const MIN_PANEL_WIDTH = 100; // Minimum width for a panel in pixels

    function makeResizable(splitterId, leftPanelVarName, rightPanelVarName, isRightPanelFr = false) {
        const splitter = document.getElementById(splitterId);
        if (!splitter) return;

        let initialLeftWidth;
        let initialRightWidth; // Only used if rightPanel is not 'fr'
        let startX;
        let isDragging = false;

        splitter.addEventListener('mousedown', (e) => {
            e.preventDefault(); // Prevent text selection
            isDragging = true;
            startX = e.clientX;
            
            initialLeftWidth = parseFloat(getComputedStyle(container).getPropertyValue(leftPanelVarName));

            if (!isRightPanelFr && rightPanelVarName) {
                // If the right panel is also a variable width (not 1fr)
                initialRightWidth = parseFloat(getComputedStyle(container).getPropertyValue(rightPanelVarName));
            } else if (rightPanelVarName && isRightPanelFr) {
                 // If right panel is 1fr, we need its current pixel width to adjust it effectively if we were to make it fixed.
                 // For this implementation, if rightPanel is 'fr', we only adjust the left one, and 'fr' takes care of the rest.
                 // However, if we drag splitter 1 (stats-spells), spells panel (middle one) IS NOT 'fr'.
                 // If we drag splitter 2 (spells-map), map panel IS 'fr'.
            }
            
            document.body.style.cursor = 'col-resize'; // Global cursor change
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();

            const deltaX = e.clientX - startX;
            let newLeftWidth = initialLeftWidth + deltaX;

            if (splitterId === 'splitter-stats-spells') { // Resizing between stats and spells
                // Spells panel is the 'right' panel here, and it's not 'fr'
                let newRightWidth = parseFloat(getComputedStyle(container).getPropertyValue(rightPanelVarName)) - deltaX;

                if (newLeftWidth >= MIN_PANEL_WIDTH && newRightWidth >= MIN_PANEL_WIDTH) {
                    container.style.setProperty(leftPanelVarName, `${newLeftWidth}px`);
                    container.style.setProperty(rightPanelVarName, `${newRightWidth}px`);
                }
            } else if (splitterId === 'splitter-spells-map') { // Resizing between spells and map (map is 1fr)
                 // Here, leftPanelVarName is --spells-col-width
                if (newLeftWidth >= MIN_PANEL_WIDTH) {
                    container.style.setProperty(leftPanelVarName, `${newLeftWidth}px`);
                }
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                document.body.style.cursor = 'default'; // Reset global cursor
            }
        });
    }

    // Initialize resizable splitters
    // Splitter 1: between Stats (--stats-col-width) and Spells (--spells-col-width)
    makeResizable('splitter-stats-spells', '--stats-col-width', '--spells-col-width');

    // Splitter 2: between Spells (--spells-col-width) and Map (1fr column, so no rightPanelVarName needed for direct manipulation)
    makeResizable('splitter-spells-map', '--spells-col-width', null, true); // true indicates right panel is flexible (1fr)

});