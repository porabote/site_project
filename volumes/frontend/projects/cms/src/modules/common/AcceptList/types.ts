export type AcceptListType = {
  updateData: Function;
  saveList: Function;
  acceptHandler: Function;
  acceptForPersonHandler: Function;
  declineHandler: Function;
  isReady: boolean;
  isDone: boolean;
  isEditAccess: boolean;
  data: StepRecordType[];
  label: string;
  recordId: number;
  record: {[key: string]: any};
};

export type StepRecordType = {
  id: number;
  user_id: number;
  is_outside: number;
  email: string;
  accepted_at: string;
  user: any;
}