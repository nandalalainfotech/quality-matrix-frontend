import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Doctormaster001mb } from "../entities/Doctormaster001mb";

@Injectable()

export class DoctormasterManager extends BaseService {

    private doctormasterUrl: string = `${environment.apiUrl}/doctormaster`;

    alldoctormaster(username: any) {
        let data: any = {};
        data['username'] = username;
        return this.getCallService(`${this.doctormasterUrl}` + "/findAll", data);
    }

    savedoctormaster(doctormaster001mb: Doctormaster001mb) {
        return this.postCallService(`${this.doctormasterUrl}` + "/save", {}, doctormaster001mb);
    }

    updatedoctormaster(doctormaster001mb: Doctormaster001mb) {
        return this.putCallService(`${this.doctormasterUrl}` + "/update", {}, doctormaster001mb);
    }

    findOne(id: any) {
        console.log('id', id);

        let data: any = {};
        data['id'] = id;
        console.log('data', data);

        return this.getCallService(`${this.doctormasterUrl}`, data);
    }

    deletedoctormaster(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.doctormasterUrl}` + "/delete", data);
    }
}