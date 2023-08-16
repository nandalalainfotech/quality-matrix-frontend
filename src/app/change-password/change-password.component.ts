import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthManager } from '../shared/services/restcontroller/bizservice/auth-manager.service';
import { CalloutService } from '../shared/services/services/callout.service';
import { Utils } from '../shared/utils/utils';
import { ActivatedRoute } from '@angular/router';
import { User001mb } from '../shared/services/restcontroller/entities/User001mb';
import { UserManager } from '../shared/services/restcontroller/bizservice/user.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
    changepwdForm: FormGroup | any;
    submitted = false;
    username: string = '';
    password: string = '';
    user001mb: User001mb = new User001mb();
    insertUser: string = '';
    insertDatetime: Date | any;
    toggle1: boolean = false;
    name:  any;
    id: any;

    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    @HostBinding('style.--color_l4') colorthemes_4: any;

    constructor(
        private authManager: AuthManager,
        private calloutService: CalloutService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private userManager: UserManager,
    ) {}

    ngOnInit(): void {

        this.name = this.route.snapshot.paramMap.get('name')

        this.id = this.route.snapshot.paramMap.get('id')

        console.log("name---->", this.name);
        
        

        this.changepwdForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
        
        this.f.username.value = this.name;

		this.authManager.currentUserSubject.subscribe((object: any) => {
            let rgb = Utils.hexToRgb(object.theme);

            this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

            this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

            this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

            this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
        });
    }

    get f() { return this.changepwdForm.controls; }

    private markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach((control: any) => {
            control.markAsTouched();
            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }

    onchangePwdFormClick(event: any,changepwdForm: any) {
        this.markFormGroupTouched(this.changepwdForm);
        this.submitted = true;
        if (!this.changepwdForm.invalid) {
            this.user001mb.personId = this.id
            this.user001mb.password = this.f.password.value;
            this.user001mb.insertUser = "insertUser";
            this.user001mb.insertDatetime = new Date();
            this.userManager.updatePassword(this.user001mb).subscribe((response: any) => {
            	if (response) {
            		this.calloutService.showSuccess("New Password Updated Successfully");
            		this.changepwdForm.controls.password.reset();
            	}
            });
        } else {
            this.calloutService.showError('Password Should Not Be Empty');
        }
    }

    changeType(input_field_password: { type: string; }, num: number) {
        if (input_field_password.type == "password")
            input_field_password.type = "text";
        else
            input_field_password.type = "password";

        if (num == 1)
            this.toggle1 = !this.toggle1;
    }

    onReset() {
        this.submitted = false;
        this.changepwdForm.controls.password.reset();
    }
}
