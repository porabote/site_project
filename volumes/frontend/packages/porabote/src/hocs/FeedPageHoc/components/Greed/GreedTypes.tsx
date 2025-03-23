export type greedPropsType = {
    children?: React.ReactNode;
    class?: string;
    gridTemplateColumns: string;
    map?: {[key: string]: any}
    records?: any[];
    onClickByRow?: Function;
}