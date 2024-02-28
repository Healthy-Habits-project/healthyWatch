export const isNewDay = (pageKey: string): boolean => {
    const today = new Date().toLocaleDateString('en-CA'); // Outputs YYYY-MM-DD in local time zone
    const lastVisitKey = `${pageKey}-lastVisitDate`;
    const lastVisitDate = localStorage.getItem(lastVisitKey);

    console.log(`Today: ${today}, Last Visit: ${lastVisitDate}`);

    if (today !== lastVisitDate) {
        localStorage.setItem(lastVisitKey, today);
        console.log(`It's a new day for ${pageKey}.`);
        return true;
    }

    console.log(`Not a new day for ${pageKey}.`);
    return false;
};
