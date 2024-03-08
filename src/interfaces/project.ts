import { ApprovalStatus } from "./approval";

export type ServerApprovalResponse = [
  {
    hasil: ApprovalStatus;
    pesan: string;
  }
];

export type ServerProjectsResponse = [
  {
    NIK: string;
    kode_prod: string;
    nama_prod: string;
    segmen_name: string;
    customer: string;
    tgl_mulai: string;
    tgl_akhir: string;
    tgl_kontrak: string;
    nilai_prod_rp?: string;
    no_kontrak: string;
  }
];

export type ServerProjectDetailResponse = ServerProjectsResponse;
export type ServerProjectHistoryResponse = ServerProjectsResponse;
