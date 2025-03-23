export type RowPropsTypes = {
    children: JSX.Element[] | JSX.Element;
    class?: string;
    gridTemplateColumns?: string;
    linkTo?: string;
    index?: number;
    isHeadFloat?: boolean;
    style?: {[key: string]: string};
    record?: {[key: string]: any};
}