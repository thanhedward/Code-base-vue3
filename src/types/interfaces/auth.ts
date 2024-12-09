export interface AuthUser {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  org: EOrganizationType;
  tenant: ITenant;
  is_representative: boolean;
}

export enum EOrganizationType {
  SUPPLIER = "SUPPLIER",
  DISTRIBUTOR = "DISTRIBUTOR"
}


export interface ITenant {
  id: string;
  type: string;
}