import { BaseEntity } from "./BaseEntity";

export class Casemachine001wb extends BaseEntity {
    slno?: number;
    cslno?: number;
    mname?: string | any;
    numofcase?: string | any;
    charge?: string | any;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;
    cslno2?: Casemachine001wb;
}