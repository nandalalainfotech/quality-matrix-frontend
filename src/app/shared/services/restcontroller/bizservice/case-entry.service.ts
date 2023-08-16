import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Caseentry001mb } from "../entities/Caseentry001mb";

@Injectable()
export class CaseEntryManager extends BaseService {

    private caseEntryUrl: string = `${environment.apiUrl}/caseentry`

    allorders(username:any) {
        let data: any = {};
        data['username'] = username;
        return this.getCallService(`${this.caseEntryUrl}` + "/findAll",data);
    }

    casesave(caseentry001mb: Caseentry001mb) {
        return this.postCallService(`${this.caseEntryUrl}` + "/save", {}, caseentry001mb);
    }

    caseupdate(caseentry001mb: Caseentry001mb) {
        return this.putCallService(`${this.caseEntryUrl}` + "/update", {}, caseentry001mb);
    }

    casedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.caseEntryUrl}` + "/delete", data);
    }

    caseEntryPdf() {
        return this.getCallService1(`${this.caseEntryUrl}` + "/pdf");
    }

    pdfId(id: any,) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService1(`${this.caseEntryUrl}` + "/pdf", data)
    }

}
