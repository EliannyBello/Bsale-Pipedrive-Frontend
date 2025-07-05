export interface IClient {
  _id: string;
  id: number;
  __v: number;
  accumulatePoints: number;
  activity: string;
  address: string;
  city: string;
  code: string;
  commerciallyBlocked: number;
  company: string;
  companyOrPerson: number;
  email: string;
  facebook: string | null;
  firstName: string;
  hasCredit: number;
  isForeigner: number;
  lastName: string;
  maxCredit: number;
  municipality: string;
  note: string | null;
  phone: string;
  points: number;
  pointsUpdated: string;
  prestashopClienId: number;
  sendDte: number;
  state: number;
  twitter: string | null;
}

export interface IClientResponse extends IClient {
  updatedAt: string;
  createdAt: string;
  status: string;
}
