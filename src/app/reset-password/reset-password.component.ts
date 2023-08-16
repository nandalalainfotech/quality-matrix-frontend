import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { AuthManager } from "../shared/services/restcontroller/bizservice/auth-manager.service";
import { UserManager } from "../shared/services/restcontroller/bizservice/user.service";
import { User001mb } from "../shared/services/restcontroller/entities/User001mb";
import { CalloutService } from "../shared/services/services/callout.service";

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {
	@Input() user001mb: User001mb = new User001mb();
	@Input() lang: any;
	username: string = "";
	password: string = "";
	confirmPassword: string = "";
	insertUser: string = "";
	insertDatetime: Date | any;
	constructor(public activeModal: NgbActiveModal,
		private translateService: TranslateService,
		private authManager: AuthManager,
		private userManager: UserManager, private calloutService: CalloutService) {
		translateService.setDefaultLang(this.translateService.store.currentLang);
	}
	ngOnInit() {

		this.username = this.user001mb.username ? this.user001mb.username : "";

		this.authManager.currentUserSubject.subscribe((object: any) => {
            let lang = (object.language2?.name);
            this.translateService.setDefaultLang(lang);})
	}

	onSaveClick() {
		if (this.password && this.confirmPassword) {
			if (this.password == this.confirmPassword) {
				this.user001mb.password = this.password;
				this.user001mb.insertUser = "insertUser";
				this.user001mb.insertDatetime = new Date();
				this.userManager.updatePassword(this.user001mb).subscribe((response: any) => {
					if (response.personId) {
						this.calloutService.showSuccess("Order Updated Successfully");
						this.activeModal.close('Yes');
					}
				});

			}
			else {
				this.calloutService.showError("Confirm password and password are not equal");
			}
		}
	}

	onCancelClick() {
		this.activeModal.close('No');
	}
}

