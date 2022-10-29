// @ts-ignore
import { hiprint, disAutoConnect } from 'vue-plugin-hiprint';
disAutoConnect()
hiprint.init();
import CONSUMPTION from './consumption.json';
import RECHARGE from './recharge.json';

export interface ConsumptionPrintData {
  orderNum: string;
  createTime: string;
  consumerName: string;
  content: string;
  amount: string;
  balance: string;
}

export function printConsumption(data: ConsumptionPrintData) {
  const printTemplate = new hiprint.PrintTemplate({ template: CONSUMPTION.value.aProviderModule });
  var $html = printTemplate.getHtml(data);
  printTemplate.printByHtml($html);
}


export interface RechargePrintData {
  orderNum: string;
  createTime: string;
  consumerName: string;
  amount: string;
  balance: string;
}

export function printRecharge(data: RechargePrintData) {
  const printTemplate = new hiprint.PrintTemplate({ template: RECHARGE.value.aProviderModule });
  var $html = printTemplate.getHtml(data);
  printTemplate.printByHtml($html);
}