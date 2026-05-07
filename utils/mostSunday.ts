export const getMostRecentSundayFormatted = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();

    const diff = dayOfWeek;

    const mostRecentSunday = new Date(today.setDate(today.getDate() - diff));

    const day = String(mostRecentSunday.getDate()).padStart(2, '0');
    const month = String(mostRecentSunday.getMonth() + 1).padStart(2, '0');
    const year = mostRecentSunday.getFullYear();

    return `${day}/${month}/${year}`;
};