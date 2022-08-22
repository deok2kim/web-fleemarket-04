export interface IUserRegion {
  id: number;
  region: {
    name: string;
  };
}

export interface IUser {
  id: number;
  userRegions: IUserRegion[];
}
