import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Employeedetails001mb } from "../entities/Employeedetails001mb";

@Injectable()

export class EmployeedetailsManager extends BaseService {

    private employeedetailsUrl: string = `${environment.apiUrl}/employeedetails`;

    allemployeedetails(username: any) {
        let data: any = {};
        data['username'] = username;
        return this.getCallService(`${this.employeedetailsUrl}` + "/findAll", data);
    }

    saveemployeedetails(employeedetails001mb: Employeedetails001mb) {
        return this.postCallService(`${this.employeedetailsUrl}` + "/save", {}, employeedetails001mb);
    }

    updateemployeedetails(employeedetails001mb: Employeedetails001mb) {
        return this.putCallService(`${this.employeedetailsUrl}` + "/update", {}, employeedetails001mb);
    }

    findOne(id: any) {
        console.log('id', id);

        let data: any = {};
        data['id'] = id;
        console.log('data', data);

        return this.getCallService(`${this.employeedetailsUrl}`, data);
    }

    deleteemployeedetails(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.employeedetailsUrl}` + "/delete", data);
    }
}