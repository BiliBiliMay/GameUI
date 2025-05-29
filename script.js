document.addEventListener('DOMContentLoaded', () => {
    // --- Draggable Windows ---
    const windows = document.querySelectorAll('.morrowind-window');
    let activeWindow = null;
    let highestZIndex = 10; // Keep track of highest z-index

    windows.forEach(win => {
        const titleBar = win.querySelector('.window-title-bar');

        // Set initial z-index
        win.style.zIndex = highestZIndex;

        const bringToFront = () => {
            highestZIndex++;
            win.style.zIndex = highestZIndex;
        };
        
        win.addEventListener('mousedown', bringToFront, true); // Capture phase to bring to front before drag starts


        if (titleBar) {
            titleBar.addEventListener('mousedown', (e) => {
                // Prevent drag from starting on close button
                if (e.target.classList.contains('window-close-button')) {
                    return;
                }
                
                activeWindow = win;
                // Calculate offset from the window's top-left, not the document's
                offsetX = e.clientX - activeWindow.getBoundingClientRect().left;
                offsetY = e.clientY - activeWindow.getBoundingClientRect().top;
                activeWindow.style.cursor = 'grabbing';
            });
        }

        // Close Button Functionality
        const closeButton = win.querySelector('.window-close-button');
        if (closeButton) {
            closeButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent mousedown on title bar from firing
                win.style.display = 'none';
            });
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (activeWindow) {
            e.preventDefault();
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            // Basic boundary checks against viewport
            const container = document.getElementById('morrowind-ui-container');
            const containerRect = container.getBoundingClientRect();
            const windowRect = activeWindow.getBoundingClientRect();

            // Ensure the window's top-left stays within the container
            if (newX < 0) newX = 0;
            if (newY < 0) newY = 0;
            // Ensure the window's bottom-right stays within the container
            if (newX + windowRect.width > containerRect.width) {
                newX = containerRect.width - windowRect.width;
            }
            if (newY + windowRect.height > containerRect.height) {
                newY = containerRect.height - windowRect.height;
            }
            
            activeWindow.style.left = `${newX}px`;
            activeWindow.style.top = `${newY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        if (activeWindow) {
            activeWindow.style.cursor = 'move';
        }
        activeWindow = null;
    });

    // --- Gauges Functionality (Katariah Style) ---
    const gauges = document.querySelectorAll('.gauge.dark'); // Target new gauge style
    gauges.forEach(gaugeElement => {
        const current = parseInt(gaugeElement.dataset.current);
        const max = parseInt(gaugeElement.dataset.max);
        const color = gaugeElement.dataset.color || '#007acc'; // Default color
        const label = gaugeElement.dataset.label !== undefined ? gaugeElement.dataset.label : null; // Optional label from data


        const percentage = (current / max) * 100;
        
        let labelHTML = '';
        if (label) { // If data-label is present, it means it's separate (like encumbrance bar)
             labelHTML = `<span class="gauge-label-external">${label}: </span>`;
        }

        gaugeElement.innerHTML = `
            ${labelHTML} 
            <div class="gauge-bar-fill" style="width: ${percentage}%; background-color: ${color};">
                <span class="gauge-value-text-overlay">${current}/${max}</span>
            </div>
        `;
         // For gauges like encumbrance, ensure the text is outside if no specific overlay style defined.
        if (label) {
            const fillBar = gaugeElement.querySelector('.gauge-bar-fill');
            fillBar.innerHTML = ''; // Remove overlay text if external label is used
            gaugeElement.innerHTML += `<span class="gauge-value-text-external"> ${current}/${max}</span>`;
        }
    });
    
    // --- Inventory Tab Switching (Vertical) ---
    const inventoryWindow = document.getElementById('inventory-window');
    if (inventoryWindow) {
        const tabButtons = inventoryWindow.querySelectorAll('.inventory-tabs.vertical .tab-button');
        const tabContents = inventoryWindow.querySelectorAll('.item-list-container .tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                button.classList.add('active');
                const tabId = button.dataset.tab;
                const activeContent = inventoryWindow.querySelector(`#${tabId}-content`);
                if (activeContent) {
                    activeContent.classList.add('active');
                }
            });
        });
    }
});