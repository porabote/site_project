export const generateUniqueKey = (min = 0, max = 1000000) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}