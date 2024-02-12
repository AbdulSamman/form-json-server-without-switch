export interface IJob{
    id:string,
    jobTitle:string,
    description:string,
    city:string,
    details:IDetails
}
 interface IDetails {
    remote: boolean,
    fullTime: boolean,
    largeCompany: boolean,
  }