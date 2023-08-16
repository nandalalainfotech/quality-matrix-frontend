import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Bookingentry001mb } from "../entities/Bookingentry001mb";


@Injectable()

export class BookingentryManager extends BaseService {

    private bookingentryUrl: string = `${environment.apiUrl}/bookingentry`


    allbooking(username: any) {
        let data: any = {};
        data['username'] = username;
        return this.getCallService(`${this.bookingentryUrl}` + "/findAll", data);
    }

    savebooking(bookingentry001mb: Bookingentry001mb) {
        console.log('bookingentry001mb', bookingentry001mb);

        return this.postCallService(`${this.bookingentryUrl}` + "/save", {}, bookingentry001mb);
    }
    updatebooking(bookingentry001mb: Bookingentry001mb) {

        return this.putCallService(`${this.bookingentryUrl}` + "/update", {}, bookingentry001mb);
    }

    bookingdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.bookingentryUrl}` + "/delete", data);
    }

    getCount() {
        return this.getCallService(`${this.bookingentryUrl}` + "/getCount");
    }
    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.bookingentryUrl}`, data);
    }
}