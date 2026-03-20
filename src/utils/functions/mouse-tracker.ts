export function trackMouse(onMove: (x: number, y: number) => void) {
    let lastX = 0;
    let lastY = 0;

    const moveHandler = (event: MouseEvent) => {
        lastX = event.clientX;
        lastY = event.clientY;
        onMove(lastX, lastY);
    };

    const scrollHandler = () => {
        onMove(lastX, lastY);
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('wheel', scrollHandler, true);

    return () => {
        document.removeEventListener('mousemove', moveHandler);
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