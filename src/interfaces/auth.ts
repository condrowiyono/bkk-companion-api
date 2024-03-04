export type ServerLoginResponse = [
  {
    statuss: number;
    pesan: string;
    NIK: string;
  }
];

export type ServerLoginRequest = {
  eUsername: string;
  ePassword: string;
};

export type AuthPayload = {
  employe_id: string;
  password: string;
};

export type RefreshTokenPayload = {
  employe_id: string;
  refresh_token: string;
};
