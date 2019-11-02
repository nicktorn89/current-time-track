export interface CurrentTask {
  id: number; // task id
  guid: string;
  wid: string; // workspace id
  billable: boolean;
  start: string;
  duration: number;
  description: string;
  duronly: boolean;
  at: string;
  uid: number;
}
