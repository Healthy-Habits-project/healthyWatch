// Function to calculate the number of checked habits on the page
export const calculateCheckedCount = (habits: any) => {
    let count = 0;
    for (const habit in habits) {
        if (habits[habit]) {
        count++;
        }
    }
    return count;
};

// Function to handle the change of a checkbox
export const handleCheckboxChange = (key: string, habits: any, setHabits: any) => {
    setHabits((prevHabits: any) => ({
        ...prevHabits,
        [key]: !prevHabits[key],
    }));
};

// Function to determine the color based on the checkedCount and totalCheckboxes using a ratio
export const getColorBasedOnCount = (checkedCount: number, totalCheckboxes: number) => {
    const ratio = checkedCount / totalCheckboxes;
    if (ratio <= 0) return '#ff0000';
    if (ratio <= 0.25) return '#ff8000';
    if (ratio <= 0.5) return '#ffff00';
    if (ratio <= 0.75) return '#80ff00';
    return '#00ff00';
};
