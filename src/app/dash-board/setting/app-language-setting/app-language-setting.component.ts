import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { ApplanguagesettingManager } from 'src/app/shared/services/restcontroller/bizservice/applanguagesetting.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Applanguagesetting001mb } from 'src/app/shared/services/restcontroller/entities/Applanguagesetting001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
    selector: 'app-app-language-setting',
    templateUrl: './app-language-setting.component.html',
    styleUrls: ['./app-language-setting.component.css']
})
export class AppLanguageSettingComponent implements OnInit {

    @Input() lang: any;
    id: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    description: string = "";
    name: string = "";
    status: string = "";
    applanguagesettings: Applanguagesetting001mb[] = [];
    public gridOptions: GridOptions | any;
    applanguagesettingForm: FormGroup | any;
    submitted = false;
    parentMenuString: string = '';
    childMenuString: string = '';
    frameworkComponents: { iconRenderer: any; };

    constructor(
        private formBuilder: FormBuilder,
        private applanguagesettingManager: ApplanguagesettingManager,
        private calloutService: CalloutService,
        private translateService: TranslateService,
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

        this.applanguagesettingForm = this.formBuilder.group({
            name: ['', Validators.required],
            status: ['', Validators.required],
            description: ['', Validators.required]
        });

        this.loaddata();
        this.createDataGrid001();
        this.applanguagesettingManager.allapplanguagesetting().subscribe((response: any) => {
            this.applanguagesettings = deserialize<Applanguagesetting001mb[]>(Applanguagesetting001mb, response);
            console.log("applanguagesetting", this.applanguagesettings);

        })

    }

    loaddata() {

        this.applanguagesettingManager.allapplanguagesetting().subscribe((response) => {
            this.applanguagesettings = deserialize<Applanguagesetting001mb[]>(Applanguagesetting001mb, response);
            if (this.applanguagesettings.length > 0) {
                this.gridOptions?.api?.setRowData(this.applanguagesettings);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.applanguagesettingForm.controls; }


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
                field: 'id',
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
                headerName: 'Name ',
                field: 'name',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Description',
                field: 'description',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
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


    onEditButtonClick(params: any) {
        this.id = params.data.id;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.applanguagesettingForm.patchValue({
            'description': params.data.description,
            'name': params.data.name,
            'status': params.data.status,
        });
    }

    onDeleteButtonClick(params: any) {
        this.applanguagesettingManager.applanguagesettingdelete(params.data.id).subscribe((response: any) => {
            for (let i = 0; i < this.applanguagesettings.length; i++) {
                if (this.applanguagesettings[i].id == params.data.id) {
                    this.applanguagesettings?.splice(i, 1);
                    break;
                }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.calloutService.showSuccess("Order Removed Successfully");
        });
    }


    onAuditButtonClick(params: any) {
        console.log("params", params)
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "Departments";
        modalRef.componentInstance.details = params.data;
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

    onUserClick(event: any, applanguagesettingForm: any) {
        // console.log("applanguagesetting001mb--->", applanguagesetting);
        this.markFormGroupTouched(this.applanguagesettingForm);
        this.submitted = true;
        if (this.applanguagesettingForm.invalid) {
            return;
        }
        let applanguagesetting001mb = new Applanguagesetting001mb();
        applanguagesetting001mb.description = this.f.description.value ? this.f.description.value : "";
        applanguagesetting001mb.name = this.f.name.value ? this.f.name.value : "";
        applanguagesetting001mb.status = this.f.status.value ? this.f.status.value : null;

        if (this.id) {
            applanguagesetting001mb.id = this.id;
            applanguagesetting001mb.insertUser = this.insertUser;
            applanguagesetting001mb.insertDatetime = this.insertDatetime;
            applanguagesetting001mb.updatedUser = this.authManager.getcurrentUser.username;
            applanguagesetting001mb.updatedDatetime = new Date();
            this.applanguagesettingManager.updateapplanguagesetting(applanguagesetting001mb).subscribe((response: any) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                this.loaddata();
                this.applanguagesettingForm.reset();
                this.submitted = false;
                this.id = null;
            })
        }
        else {
            applanguagesetting001mb.insertUser = this.authManager.getcurrentUser.username;
            applanguagesetting001mb.insertDatetime = new Date();
            this.applanguagesettingManager.saveapplanguagesetting(applanguagesetting001mb).subscribe((response) => {
                console.log("response", response)
                this.calloutService.showSuccess("Order Saved Successfully");
                this.loaddata();
                this.applanguagesettingForm.reset();
                this.submitted = false;
            })
        }

    }

    onReset() {
        this.applanguagesettingForm.reset();
        this.submitted = false;
    }
}