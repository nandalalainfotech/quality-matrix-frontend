import { BaseEntity } from "./BaseEntity";


export class User001mb extends BaseEntity {
    personId?: number;
    // domain?: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    password?: string | null;
    status?: string;
    email?: string;
    mobileno?: string;
    rolename?: string;
    theme?: string | null;
    language?: Number | null;
    language2?: any | null;
    user001mbs?: any | null;
}