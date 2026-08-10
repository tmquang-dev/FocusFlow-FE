import '@testing-library/jest-dom/vitest';

class ResizeObserverMock {
    observe(): void {
        // Mock method for ResizeObserver
    }
    unobserve(): void {
        // Mock method for ResizeObserver
    }
    disconnect(): void {
        // Mock method for ResizeObserver
    }
}

class PointerEventMock extends Event {}

Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    value: ResizeObserverMock,
});

Object.defineProperty(window, 'PointerEvent', {
    writable: true,
    value: PointerEventMock,
});
