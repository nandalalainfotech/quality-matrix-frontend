import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { ApplanguagesettingManager } from 'src/app/shared/services/restcontroller/bizservice/applanguagesetting.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { Applanguagesetting001mb } from 'src/app/shared/services/restcontroller/entities/Applanguagesetting001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';


@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    @Input() lang: any;
    frameworkComponents: any;
    id: number | any;
    personId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    username: string = "";
    status: string = "";
    password: string = "";
    rolename: string = "";
    applanguagesetting: Applanguagesetting001mb[] = [];
    email: string = "";
    mobileno: string = "";
    cname: string = "Register.status";
    ctype: string = "register";
    users: User001mb[] = [];
    systemproperties?: Systemproperties001mb[] = [];
    dsystemproperties?: Systemproperties001mb[] = [];
    csystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;
    registerForm: FormGroup | any;
    resetForm: FormGroup | any;
    submitted = false;
    toggle1: boolean = false;

    constructor(private systemPropertiesService: SystemPropertiesService,
        private formBuilder: FormBuilder,
        private userManager: UserManager,
        public translateService: TranslateService,
        private calloutService: CalloutService,
        private applanguagesettingManager: ApplanguagesettingManager,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }

        translateService.setDefaultLang(this.translateService.store.currentLang);
    }
    ngOnInit() {

        this.authManager.currentUserSubject.subscribe((object: any) => {
            let lang = (object.language2?.name);
            this.translateService.setDefaultLang(lang);
        })
        this.registerForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', Validators.required],
            status: ['', Validators.required],
            password: [''],
            rolename: ['', Validators.required],
            email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            mobileno: ['', [Validators.required, Validators.pattern(/^\d{10}$/), Validators.minLength(10)]],
        });

        this.loaddata();
        this.createDataGrid001();
        this.applanguagesettingManager.allapplanguagesetting().subscribe((response: any) => {
            this.applanguagesetting = deserialize<Applanguagesetting001mb[]>(Applanguagesetting001mb, response);

        })

        this.loaddata();
        this.createDataGrid001();
        this.systemPropertiesService.system(this.cname, this.ctype).subscribe(response => {
            this.csystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
    }

    // loaddata() {

    //     this.departmentsManager.alldepartment().subscribe((response) => {
    //         this.departmentss = deserialize<Domain001mb[]>(Domain001mb, response);
    //         if (this.departmentss.length > 0) {
    //             this.gridOptions?.api?.setRowData(this.departmentss);
    //         } else {
    //             this.gridOptions?.api?.setRowData([]);
    //         }
    //     })
    // }
    loaddata() {


        this.userManager.alluser().subscribe((response) => {
            this.users = deserialize<Applanguagesetting001mb[]>(Applanguagesetting001mb, response);
            if (this.users.length > 0) {
                this.gridOptions?.api?.setRowData(this.users);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.registerForm.controls; }

    createDataGrid001(): void {
        this.gridOptions = {
            paginationPageSize: 10,
            rowSelection: 'single',
            onFirstDataRendered: this.onFirstDataRendered.bind(this)
        };
        this.gridOptions.editType = 'fullRow';
        this.gridOptions.enableRangeSelection = true;
        this.gridOptions.animateRows = true;
        this.gridOptions.columnDefs = [
            {
                headerName: '#Id',
                field: 'personId',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Firstname',
                field: 'firstname',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Lastname ',
                field: 'lastname',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Username ',
                field: 'username',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            // {
            //     headerName: 'Password',
            //     field: 'password',
            //     width: 200,
            //     flex: 1,
            //     sortable: true,
            //     filter: true,
            //     resizable: true,
            //     suppressSizeToFit: true,
            // },
            {
                headerName: 'Role Name',
                field: 'rolename',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                // valueGetter: this.setName.bind(this)
            },
            {
                headerName: 'Status',
                field: 'status',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Mobile Number ',
                field: 'mobileno',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Email ',
                field: 'email',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Edit',
                cellRenderer: 'iconRenderer',
                width: 200,
                flex: 1,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onEditButtonClick.bind(this),
                    label: 'Edit'
                }
            },
            {
                headerName: 'Delete',
                cellRenderer: 'iconRenderer',
                width: 200,
                flex: 1,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onDeleteButtonClick.bind(this),
                    label: 'Delete'
                }
            },
            {
                headerName: 'Audit',
                cellRenderer: 'iconRenderer',
                width: 55,
                flex: 1,
                suppressSizeToFit: true,
                cellStyle: { textAlign: 'center' },
                cellRendererParams: {
                    onClick: this.onAuditButtonClick.bind(this),
                    label: 'Audit'
                },
            },
        ];
    }
    setName(params: any): string {
        return params.data.language2 ? params.data.language2.name : null;
    }
    onEditButtonClick(params: any) {
        this.personId = params.data.personId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.registerForm.patchValue({
            'firstname': params.data.firstname,
            'lastname': params.data.lastname,
            'username': params.data.username,
            'status': params.data.status,
            // 'password': params.data.password,
            'rolename': params.data.rolename,
            'email': params.data.email,
            'mobileno': params.data.mobileno,
        });
    }

    onDeleteButtonClick(params: any) {
        this.userManager.deleteuser(params.data.personId).subscribe((response) => {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].personId == params.data.personId) {
                    this.users?.splice(i, 1);
                    break;
                }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.calloutService.showSuccess("Order Removed Successfully");
        });
    }


    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Registration";
        modalRef.componentInstance.details = params.data;
    }

    changeType(input_field_password: { type: string; }, num: number) {
        if (input_field_password.type == "password")
            input_field_password.type = "text";
        else
            input_field_password.type = "password";

        if (num == 1)
            this.toggle1 = !this.toggle1;
        // else
        //   this.toggle2 = !this.toggle2;
    }

    onFirstDataRendered(params: any) {
        params.api.sizeColumnsToFit();
    }

    private markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach((control: any) => {
            control.markAsTouched();
            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }

    onUserClick(data: NgForm, registerForm: any, form: any) {
        console.log("event-->", this.f);
        this.markFormGroupTouched(this.registerForm);
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        // let person001mb = new Person001mb();
        let user001mb = new User001mb();
        user001mb.firstname = this.f.firstname.value ? this.f.firstname.value : "";
        user001mb.lastname = this.f.lastname.value ? this.f.lastname.value : "";
        // user001mb.domain = this.f.domain.value ? this.f.domain.value : "";
        user001mb.username = this.f.username.value ? this.f.username.value : "";
        user001mb.status = this.f.status.value ? this.f.status.value : "";
        user001mb.password = this.f.password.value ? this.f.password.value : "";
        user001mb.rolename = this.f.rolename.value ? this.f.rolename.value : "";
        user001mb.email = this.f.email.value ? this.f.email.value : "";
        user001mb.mobileno = this.f.mobileno.value ? this.f.mobileno.value : "";
        if (this.personId) {
            user001mb.personId = this.personId;
            user001mb.insertUser = this.insertUser;
            user001mb.insertDatetime = this.insertDatetime;
            user001mb.updatedUser = this.authManager.getcurrentUser.username;
            user001mb.updatedDatetime = new Date();
            this.userManager.updateuser(user001mb).subscribe(response => {
                this.calloutService.showSuccess("Registration Updated Successfully");
                this.registerForm.reset();
                form.resetForm();
                this.loaddata();
                this.submitted = false;
                data.resetForm();
                this.personId = null;
            })
        }
        else {
            user001mb.insertUser = this.authManager.getcurrentUser.username;
            user001mb.insertDatetime = new Date();
            this.userManager.saveuser(user001mb).subscribe((response) => {
                this.calloutService.showSuccess("Registration Saved Successfully");
                this.registerForm.reset();
                form.resetForm();
                this.loaddata();
                this.submitted = false;
                data.resetForm();
            })
        }

    }

    onReset(data: any) {
        this.registerForm.reset();
        data.resetForm();
        this.submitted = false;
    }
}