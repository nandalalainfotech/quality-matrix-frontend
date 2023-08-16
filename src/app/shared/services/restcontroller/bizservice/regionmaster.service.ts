import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Regionmaster001mb } from "../entities/Regionmaster001mb";


@Injectable()

export class RegionmasterManager extends BaseService {

    private regionmasterUrl: string = `${environment.apiUrl}/regionmaster`


    allregion(username: any) {
        let data: any = {};
        data['username'] = username;
        return this.getCallService(`${this.regionmasterUrl}` + "/findAll", data);
    }

    saveregion(regionmaster001mb: Regionmaster001mb) {
        console.log("regionmaster001mb", regionmaster001mb);
        return this.postCallService(`${this.regionmasterUrl}` + "/save", {}, regionmaster001mb);
    }
    updateregion(regionmaster001mb: Regionmaster001mb) {
        return this.putCallService(`${this.regionmasterUrl}` + "/update", {}, regionmaster001mb);
    }

    regiondelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.regionmasterUrl}` + "/delete", data);
    }
}