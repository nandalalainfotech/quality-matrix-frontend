import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Casemachine001wb } from "../entities/Casemachine001wb";

@Injectable()
export class CaseMachineManager extends BaseService {

    private caseMachineUrl: string = `${environment.apiUrl}/casemachine`

    allcasemachine(username: any) {
        let data: any = {};
        data['username'] = username;
        return this.getCallService(`${this.caseMachineUrl}` + "/findAll", data);
    }

    casemachinesave(casemachine001wb: Casemachine001wb) {
        console.log('casemachine001wb', casemachine001wb);
        return this.postCallService(`${this.caseMachineUrl}` + "/save", {}, casemachine001wb);
    }

    casemachineupdate(casemachine001wb: Casemachine001wb) {
        return this.putCallService(`${this.caseMachineUrl}` + "/update", {}, casemachine001wb);
    }

    casmachinedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.caseMachineUrl}` + "/delete", data);
    }

}
