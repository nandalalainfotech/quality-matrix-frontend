import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Applanguagesetting001mb } from "../entities/Applanguagesetting001mb";


@Injectable()

export class ApplanguagesettingManager extends BaseService {

    private applanguagesettingUrl: string = `${environment.apiUrl}/applanguage`
    allapplanguagesetting() {

        return this.getCallService(`${this.applanguagesettingUrl}` + "/findAll");
    }

    saveapplanguagesetting(applanguagesetting001mb: Applanguagesetting001mb) {
        return this.postCallService(`${this.applanguagesettingUrl}` + "/save", {}, applanguagesetting001mb);
    }
    updateapplanguagesetting(applanguagesetting001mb: Applanguagesetting001mb) {
        return this.putCallService(`${this.applanguagesettingUrl}` + "/update", {}, applanguagesetting001mb);
    }

    applanguagesettingdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.applanguagesettingUrl}` + "/delete", data);
    }
}