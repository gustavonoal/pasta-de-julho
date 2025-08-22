document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('map-container');
    const mapinner = document.getElementById('map-inner');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const resetZoomBtn = document.getElementById('reset-zoom');
    const hotspots = document.querySelectorAll('.hotspot');
    let currentZoom = 1;
    const ZOOM_STEP = 0.2;
    const MIN_ZOOM = 1;
    const MAX_ZOOM = 4;
    let isDragging = false;
    let startX, startY;
    let currentPanX = 0, currentPanY = 0;

    function applyZoomAndPan() {
        mapinner.style.transform = `translate(${currentPanX}px, ${currentPanY}px) scale(${currentZoom})`;
    }

    function zoom(direction) {
        let newZoom = currentZoom + (direction * ZOOM_STEP);
        newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
        if (newZoom === currentZoom) return;
        const containerRect = mapContainer.getBoundingClientRect();
        const containerCenterX = containerRect.width / 2;
        const containerCenterY = containerRect.height / 2;
        const mapInnerCenterX = (containerCenterX - currentPanX) / currentZoom;
        const mapInnerCenterY = (containerCenterY - currentPanY) / currentZoom;
        currentPanX = containerCenterX - mapInnerCenterX * newZoom;
        currentPanY = containerCenterY - mapInnerCenterY * newZoom;
        currentZoom = newZoom;
        adjustPanBounds();
        applyZoomAndPan();
    }

    function resetZoom() {
        currentZoom = MIN_ZOOM;
        currentPanX = 0;
        currentPanY = 0;
        applyZoomAndPan();
    }

    function adjustPanBounds() {
        const mapInnerRect = mapinner.getBoundingClientRect();
        const containerRect = mapContainer.getBoundingClientRect();
        const maxPanX = (mapInnerRect.width * currentZoom) - containerRect.width;
        const maxPanY = (mapInnerRect.height * currentZoom) - containerRect.height;
        currentPanX = Math.max(Math.min(currentPanX, 0), -maxPanX);
        currentPanY = Math.max(Math.min(currentPanY, 0), -maxPanY);

        if (mapInnerRect.width * currentZoom < containerRect.width) {
            currentPanX = (containerRect.width - (mapInnerRect.width * currentZoom)) / 2;
        }
    }

    // Adicione os listeners apenas uma vez
    mapContainer.addEventListener('mousedown', (e) => {
        if (currentZoom > MIN_ZOOM) {
            isDragging = true;
            mapContainer.style.cursor = 'grabbing';
            startX = e.clientX - currentPanX;
            startY = e.clientY - currentPanY;
        }
    });

    mapContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        currentPanX = e.clientX - startX;
        currentPanY = e.clientY - startY;
        adjustPanBounds();
        applyZoomAndPan();
    });

    mapContainer.addEventListener('mouseup', () => {
        isDragging = false;
        mapContainer.style.cursor = 'grab';
    });

    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', (e) => {
            e.stopPropagation();
            alert(`Você clicou no hotspot: ${hotspot.id}\n${hotspot.querySelector('.hotspot-tooltip').textContent}`);
        });
    });

    zoomInBtn.addEventListener('click', () => zoom(1));
    zoomOutBtn.addEventListener('click', () => zoom(-1));
    resetZoomBtn.addEventListener('click', resetZoom);

    applyZoomAndPan();
});