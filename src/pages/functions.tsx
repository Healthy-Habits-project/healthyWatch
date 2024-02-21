export const calculateCheckedCount = (habits: any) => {
    let count = 0;
    for (const habit in habits) {
        if (habits[habit]) {
        count++;
        }
    }
    return count;
};

export const handleCheckboxChangeTest = (key: string, habits: any, setHabits: any) => {
    setHabits((prevHabits: any) => ({
        ...prevHabits,
        [key]: !prevHabits[key],
    }));
};