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
