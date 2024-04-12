export interface IProviderDto {
  id: string;
  name: string;
}

// Interface for CreateKycDto
export interface ICreateKycDto {
  lastName: string;
  firstName: string;
  address: string;
  gender: string;
  provider: IProviderDto;
}
