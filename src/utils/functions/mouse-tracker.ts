export function trackMouse(onMove: (x: number, y: number) => void) {
    const handler = (event: MouseEvent) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        onMove(mouseX, mouseY);
    };

    document.addEventListener('mousemove', handler);

    return () => document.removeEventListener('mousemove', handler);
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