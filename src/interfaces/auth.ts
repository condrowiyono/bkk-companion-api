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
  username: string;
  password: string;
};

export type RefreshTokenPayload = {
  employe_id: string;
  refresh_token: string;
};
