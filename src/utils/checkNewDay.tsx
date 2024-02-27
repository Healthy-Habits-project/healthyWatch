// utils/checkNewDay.ts
export const isNewDay = (): boolean => {
    const simulatedToday: string = new Date('2024-02-28').toDateString(); // Set this to a date that is after the lastVisitDat
const today: string = new Date().toDateString();
const lastVisitDate: string | null = localStorage.getItem('lastVisitDate');

console.log('Today:', today, 'Last Visit:', lastVisitDate); // Add this line for debugging

if (today !== lastVisitDate) {
    localStorage.setItem('lastVisitDate', today);
    return true; // It's a new day
}

return false; // Not a new day
}
export default isNewDay