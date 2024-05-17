export interface IPlayer {
  [key: string]: string | number | boolean | Date;
  name: string;
  birthDate: Date;
  jerseyNumber: number;
  position: string;
  teamId: string;
  remoteId: string;
}
