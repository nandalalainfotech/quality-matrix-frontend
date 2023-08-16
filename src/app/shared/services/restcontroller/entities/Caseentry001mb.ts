import { BaseEntity } from "./BaseEntity";
import { Casemachine001wb } from "./Casemachine001wb";

export class Caseentry001mb extends BaseEntity {
    caseentryId?: number;
    hospname?: string;
    status?: boolean;
    doctorname?: string;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;
    Casemachine001wbs?: Casemachine001wb[] | any;
    appointmentNo?: number;

}