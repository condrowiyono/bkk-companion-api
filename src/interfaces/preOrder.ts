import { ApprovalStatus } from "./approval";

export type ServerApprovalResponse = [
  {
    hasil: ApprovalStatus;
    pesan: string;
  }
];

export type PreOrder = {
  statuss: number;
  pesan: string;
  divisi: string;
  jabatan: string;
  PONumber: string;
  PONumber2: string;
  PODate: Date;
  VendorNo: string;
  VendorName: string;
  Delivery: string;
  PersonInCharge: string;
  TermsOfPayment: string;
  OrderedBy: string;
  KodeProd: string;
  KodeDept: string;
  KodeBUdget: string;
  nilai: number;
  app_pic: string;
  app_pm: string;
  app_kuu: string;
  imei: null | string;
};

export type Item = {
  NIK: string;
  PONumber: string;
  PONumber2: string;
  workshop: string;
  kodeprod: string;
  item_code: string;
  item_name: string;
  QTY: number;
  unit: string;
  price: number;
  subTotal: number;
};

export type ServerPreOrderResponse = PreOrder[];
export type ServerPreOrderDetailResponse = [PreOrder];
export type ServerPreOrderItemResponse = Item[];
