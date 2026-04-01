export function getDateFromMinutes(minutes: number): Date {
    return new Date(Date.now() + minutes * 60 * 1000);
}
