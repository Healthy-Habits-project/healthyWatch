export const isNewDay = (): boolean => {
const today: string = new Date().toDateString();
const lastVisitDate: string | null = localStorage.getItem('lastVisitDate');

console.log('Today:', today, 'Last Visit:', lastVisitDate);

if (today !== lastVisitDate) {
    localStorage.setItem('lastVisitDate', today);
    return true; // It's a new day
}

return false; // Not a new day
}
export default isNewDay
