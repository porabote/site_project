export const setMinutesList = (step: number = 5) => {
    const items = [];
    for (let min = 0; min < 60; min += step) {
        items.push({id: min, name: min.toString().padStart(2, '0')});
    }
    return items;
}

export const setHoursList = () => {
    const items: {id: number, name: string}[] = [];
    new Array(24).fill().forEach((acc, index) => {//.fill()
        items.push({id: index, name: index.toString().padStart(2, '0')});
    })
    return items;
};
