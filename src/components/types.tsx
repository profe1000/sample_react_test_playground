export interface Ilocationitemsprops {
  address: string;
  residentName: string;
  totalEnergy: string;
  genUsage: string;
  gridUsgae: string;
  devices: [Idevice];
}

export type Idevice = {
  id: number;
  type: string;
  onlinestate: string;
};

export interface IuserObeject {
  firstName: string;
  lastName: string;
}
