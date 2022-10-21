export class RechargeRecordInfo {
  public id: number;
  public amount: number;
  public createTime: string;
  public consumerName: string;
  public userName: string;
}

export interface RechargeRecordRo {
  list: RechargeRecordInfo[];
  total: number;
}
