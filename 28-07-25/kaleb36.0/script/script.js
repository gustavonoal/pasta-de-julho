document.addEventListener('DOMContentLoaded', () => {
    const reactionArea = document.getElementById('reaction-area');
    const numElements = 150;
    const elements = [];
    const reactionDelay = 70;
    const reactionRadius = 150;

    function createElements() {
        for (let i = 0; i < numElements; i++) {
            const element = document.createElement('div');
            element.classList.add('reaction-element');

            const x = Math.random() * (reactionArea.offsetWidth - 30);
            const y = Math.random() * (reactionArea.offsetHeight - 30);

            element.style.left = `${x}px`;
            element.style.top = `${y}px`;


            element.dataset.x = x;
            element.dataset.y = y;

            reactionArea.appendChild(element);
            elements.push(element);
        }
    }

    function getDistance(x1, y1, x2, y2) {
        const dx = x1 - x2;
        const dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function startReaction(centerX, centerY) {

        let clickedElement = null;
        let minDistance = Infinity;

        elements.forEach(el => {
            const elX = parseFloat(el.dataset.x);
            const elY = parseFloat(el.dataset.y);
            const dist = getDistance(centerX, centerY, elX, elY);
            if (dist < minDistance) {
                minDistance = dist;
                clickedElement = el;
            }
        });
        if (clickedElement) {
            activateElement(clickedElement);
            propagateReaction(centerX, centerY, 0);
        }
    }

    function activateElement(element) {
        element.classList.add('active');


        setTimeout(() => {
            element.classList.remove('active');
        }, 800);
    }

    function propagateReaction(originX, originY, currentDelay) {

        const reactiveElements = elements.filter(el => {
            const elX = parseFloat(el.dataset.x);
            const elY = parseFloat(el.dataset.y);
            const dist = getDistance(originX, originY, elX, elY);

            return dist <= reactionRadius && !el.classList.contains('active');
        });
        if (reactiveElements.length === 0) {
            return;
        }

        reactiveElements.sort((a, b) => {
            const distA = getDistance(originX, originY,
                parseFloat(a.dataset.x), parseFloat(a.dataset.y));
            const distB = getDistance(originX, originY,
                parseFloat(b.dataset.x), parseFloat(b.dataset.y));
            return distA - distB;
        });
        reactiveElements.forEach((el, index) => {
            setTimeout(() => {
                activateElement(el);

                propagateReaction(parseFloat(el.dataset.x),
            parseFloat(el.dataset.y), reactionDelay / 2);
            }, currentDelay + (index * (reactionDelay /
                reactiveElements.length)));
        });
    }

    reactionArea.addEventListener('click', (e) => {

        const clickX = e.clientX - reactionArea.
        getBoundingClientRect().left;
        const clickY = e.clientY - reactionArea.
        getBoundingClientRect().top;
        startReaction(clickX, clickY);
    });

    createElements();



    window.addEventListener('resize', () => {
        elements.forEach(el => el.remove());
        elements.length = 0;
        createElements();
    });
});