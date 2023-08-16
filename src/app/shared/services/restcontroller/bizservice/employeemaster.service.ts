import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/services/base.service";
import { environment } from "src/environments/environment";
import { Employeemaster001mb } from "../entities/Employeemaster001mb";

@Injectable()
export class EmployeemasterManager extends BaseService {

    private employeeUrl: string = `${environment.apiUrl}/employeemaster`;

    allemployee(username: any) {
        let data: any = {};
        data['username'] = username;
        return this.getCallService(`${this.employeeUrl}` + "/findAll", data);
    }
    saveemployee(employeemaster001mb: Employeemaster001mb) {
        return this.postCallService(`${this.employeeUrl}` + "/save", {}, employeemaster001mb);
    }
    updateemployee(employeemaster001mb: Employeemaster001mb) {
        return this.putCallService(`${this.employeeUrl}` + "/update", {}, employeemaster001mb);
    }
    employeedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.employeeUrl}` + "/delete", data);
    }
}