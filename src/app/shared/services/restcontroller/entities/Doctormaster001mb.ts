import { BaseEntity } from "./BaseEntity";

export class Doctormaster001mb extends BaseEntity {
    slNo?: number;
    doctorname?: string;
    addressline1?: string;
    addressline2?: string;
    city?: string;
    state?: string;
    pincode?: number;
    country?: string;
    hospitalname?: string;
    contactnumber?: number;
    emailid?: string;
    status?: boolean;
    region?: string;
}
