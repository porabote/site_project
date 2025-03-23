export type BalloonPropsType = {
  msgs?: BalloonMessageType[];
}

export type BalloonMessageType = {
  type: string;
  title: string;
  unique: number;
}