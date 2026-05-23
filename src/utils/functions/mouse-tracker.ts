export function trackMouse(onMove: (x: number, y: number) => void) {
    let lastX = 0;
    let lastY = 0;

    const moveHandler = (event: MouseEvent) => {
        lastX = event.clientX;
        lastY = event.clientY;
        onMove(lastX, lastY);
    };

    // TODO
    // this is for a "smoother" animation when scrolling a relation in the popover, maybe watch this closer.
    // should only do it while popover is open
    const moveHandlerWithDelay = (event: MouseEvent) => {
        const timedRenderers = [0, 50, 100, 150, 200]
        timedRenderers.forEach((delay) => {
            setTimeout(() => {
                moveHandler(event)
            }, delay);
        })
    };

    const touchHandler = (event: TouchEvent) => {
        const touch = event.touches[0];
        if (!touch) return;
        lastX = touch.clientX;
        lastY = touch.clientY;
        onMove(lastX, lastY);
    };

    const scrollHandler = () => {
        onMove(lastX, lastY);
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('contextmenu', moveHandler);
    document.addEventListener('touchstart', touchHandler);
    document.addEventListener('touchmove', touchHandler);
    document.addEventListener('wheel', moveHandlerWithDelay);
    document.addEventListener('wheel', scrollHandler, true);
    const timedRenders = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
    timedRenders.forEach((delay) => {
        setTimeout(scrollHandler, delay);
    });

    return () => {
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('touchstart', touchHandler);
        document.removeEventListener('touchmove', touchHandler);
        document.removeEventListener('wheel', moveHandlerWithDelay);
        document.removeEventListener('wheel', scrollHandler, true);
    };
}

export function getClosestBorderPoint(rect: DOMRect, { cursorX, cursorY }: { cursorX: number; cursorY: number }) {
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = cursorX - cx
    const dy = cursorY - cy
    const scaleX = dx !== 0 ? rect.width / 2 / Math.abs(dx) : Infinity
    const scaleY = dy !== 0 ? rect.height / 2 / Math.abs(dy) : Infinity
    const scale = Math.min(scaleX, scaleY)
    return { x: cx + dx * scale, y: cy + dy * scale }
}