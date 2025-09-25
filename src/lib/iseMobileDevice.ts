export function isMobileDevice(userAgent: string): boolean {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent);
}
