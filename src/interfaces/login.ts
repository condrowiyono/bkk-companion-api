export type ServerLoginResponse = [
  {
    statuss: number;
    pesan: string;
  }
];

export type ServerLoginRequest = {
  eUsername: string;
  ePassword: string;
};
