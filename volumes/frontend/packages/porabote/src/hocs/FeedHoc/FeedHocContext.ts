import {createContext} from "react";
import {PropsType} from "./FeedHocTypes";

const initialState: PropsType = {
    fetchData: (): [] => {
        return []
    },
    dicts: {},
    setFilter: () => {},
    getFilterValue: (name: string) => {},
    records: [],
    filterMap: [],
    greedMap: [],
    formMap: [],
    isDictsLoaded: false,
    modelName: 'test',
    record: null,
};

export default createContext(initialState);