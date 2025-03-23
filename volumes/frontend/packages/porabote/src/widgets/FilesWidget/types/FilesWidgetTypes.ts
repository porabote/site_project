export interface IFile {
  url: string,
  name: string,
}

export type FileRecordType = {
  id?: number;
  basename?: string;
  record_id?: string;
  label?: string;
  size?: number;
  flag?: string;
  title?: string;
  alt?: string;
  parent_id?: string;
  json_data?: string;
};