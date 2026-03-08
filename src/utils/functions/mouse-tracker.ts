export function trackMouse(onMove: (x: number, y: number) => void) {
    const handler = (event: MouseEvent) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        onMove(mouseX, mouseY);
    };

    document.addEventListener('mousemove', handler);

    return () => document.removeEventListener('mousemove', handler);
}