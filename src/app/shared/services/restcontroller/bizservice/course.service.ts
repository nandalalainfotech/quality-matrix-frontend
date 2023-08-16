import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Regionmaster001mb } from "../entities/Regionmaster001mb";
import { Course001mb } from "../entities/course001mb";


@Injectable()

export class CourseManager extends BaseService {

    private courseUrl: string = `${environment.apiUrl}/course`


    allcourse(username: any) {
        let data: any = {};
        data['username'] = username;
        return this.getCallService(`${this.courseUrl}` + "/findAll", data);
    }

    savecourse(course001mb: Course001mb) {
        console.log("course001mb--->11", course001mb);
        return this.postCallService(`${this.courseUrl}` + "/save", {}, course001mb);
    }
    updatecourse(course001mb: Course001mb) {
        return this.putCallService(`${this.courseUrl}` + "/update", {}, course001mb);
    }

    coursedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.courseUrl}` + "/delete", data);
    }
}