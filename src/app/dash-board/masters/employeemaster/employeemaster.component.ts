import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { EmployeemasterManager } from 'src/app/shared/services/restcontroller/bizservice/employeemaster.service';
import { Employeemaster001mb } from 'src/app/shared/services/restcontroller/entities/Employeemaster001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-employeemaster',
  templateUrl: './employeemaster.component.html',
  styleUrls: ['./employeemaster.component.css']
})
export class EmployeemasterComponent implements OnInit {

  @Input() lang: any;
  frameworkComponents: any;
  employeeForm: FormGroup | any;
  submitted = false;
  employeeId: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  employeename: string = "";
  mobilenumber: number | any;
  emailid: string = "";
  status: boolean = false;
  public gridOptions: GridOptions | any;
  employee: Employeemaster001mb[] = [];


  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;

  constructor(private employeemasterManager: EmployeemasterManager,
    private calloutService: CalloutService,
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private authManager: AuthManager,
    private dataSharedService: DataSharedService,
    private modalService: NgbModal) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }

    translateService.setDefaultLang(this.translateService.store.currentLang);
  }

  ngOnInit() {
    this.username = this.authManager.getcurrentUser.username;

    this.authManager.currentUserSubject.subscribe((object: any) => {
      let lang = (object.language2?.name);
      this.translateService.setDefaultLang(lang);
    })
    this.authManager.currentUserSubject.subscribe((object: any) => {
      let rgb = Utils.hexToRgb(object.theme);

      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });

    this.employeeForm = this.formBuilder.group({
      employeename: ['', Validators.required],
      mobilenumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/), Validators.minLength(10)]],
      emailid: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      status: [''],
    })
    this.loaddata();
    this.createDataGrid001();
  }
  username = this.authManager.getcurrentUser.username;
  loaddata() {
    this.employeemasterManager.allemployee(this.username).subscribe((response) => {
      this.employee = deserialize<Employeemaster001mb[]>(Employeemaster001mb, response);
      if (this.employee.length > 0) {
        this.gridOptions?.api?.setRowData(this.employee);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    })
  }
  get f() { return this.employeeForm.controls; }

  createDataGrid001(): void {
    this.gridOptions = {
      paginationPageSize: 10,
      rowSelection: 'single', onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptions.editType = 'fullRow';
    this.gridOptions.enableRangeSelection = true;
    this.gridOptions.animateRows = true;
    this.gridOptions.columnDefs = [
      {
        headerName: 'ID',
        field: 'employeeId',
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
        headerName: 'Employee Name',
        field: 'employeename',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Mobile Number',
        field: 'mobilenumber',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'EMail ID',
        field: 'emailid',
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
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center', color: 'rgb(28, 67, 101)' },
        cellRenderer: (params: any) => {
          console.log("params", params);
          if (params.data.status == 1) {
            return '<i class="fa fa-toggle-on">';

          } else {
            return '<i class="fa fa-toggle-off">';
          }
        },
        label: 'Status'
      },
      {
        headerName: 'Edit',
        cellRenderer: 'iconRenderer',
        width: 250,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: 'Edit'
        },
      },
      {
        headerName: 'Delete',
        cellRenderer: 'iconRenderer',
        width: 255,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onDeleteButtonClick.bind(this),
          label: 'Delete'
        },
      },
      {
        headerName: 'Audit',
        cellRenderer: 'iconRenderer',
        width: 255,
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
    this.employeeId = params.data.employeeId;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.employeeForm.patchValue({
      'employeeId': params.data.employeeId,
      'employeename': params.data.employeename,
      'mobilenumber': params.data.mobilenumber,
      'emailid': params.data.emailid,
      'status': params.data.status
    });
  }

  onDeleteButtonClick(params: any) {
    this.employeemasterManager.employeedelete(params.data.employeeId).subscribe((response) => {
      for (let i = 0; i < this.employee.length; i++) {
        if (this.employee[i].employeeId == params.data.employeeId) {
          this.employee?.splice(i, 1);
          break;
        }
      }
      const selectedRows = params.api.getSelectedRows();
      params.api.applyTransaction({ remove: selectedRows });
      this.calloutService.showSuccess("Employee Master Details Removed Successfully");
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Employee Master";
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

  onOrderClick(data: NgForm, employeeForm: any, form: any) {
    this.markFormGroupTouched(this.employeeForm);
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return;
    }
    let employeemaster001mb = new Employeemaster001mb();
    employeemaster001mb.employeename = this.f.employeename.value ? this.f.employeename.value : "";
    employeemaster001mb.emailid = this.f.emailid.value ? this.f.emailid.value : "";
    employeemaster001mb.mobilenumber = this.f.mobilenumber.value ? this.f.mobilenumber.value : null;
    employeemaster001mb.status = this.f.status.value ? this.f.status.value : false;
    if (this.employeeId) {
      employeemaster001mb.employeeId = this.employeeId;
      employeemaster001mb.insertUser = this.insertUser;
      employeemaster001mb.insertDatetime = this.insertDatetime;
      employeemaster001mb.updatedUser = this.authManager.getcurrentUser.username;
      employeemaster001mb.updatedDatetime = new Date();
      this.employeemasterManager.updateemployee(employeemaster001mb).subscribe((response) => {
        this.calloutService.showSuccess("Employee Master Details Updated Successfully");
        let employeemaster001mb = deserialize<Employeemaster001mb>(Employeemaster001mb, response);
        for (let employeemasters of this.employee) {
          if (employeemasters.employeeId == employeemaster001mb.employeeId) {
            employeemasters.employeename = employeemaster001mb.employeename;
            employeemasters.emailid = employeemaster001mb.emailid;
            employeemasters.status = employeemaster001mb.status;
            employeemasters.mobilenumber = employeemasters.mobilenumber;
            employeemasters.insertUser = this.insertUser;
            employeemasters.insertDatetime = this.insertDatetime;
            employeemasters.updatedUser = this.authManager.getcurrentUser.username;
            employeemasters.updatedDatetime = new Date();
          }
        }
        this.gridOptions.api.setRowData(this.employee);
        this.gridOptions.api.refreshView();
        this.gridOptions.api.deselectAll();
        this.employeeForm.reset();
        form.resetForm();
        this.loaddata();
        this.submitted = false;
        data.resetForm();
        this.employeeId = null;
      });
    }
    else {
      employeemaster001mb.insertUser = this.authManager.getcurrentUser.username;
      employeemaster001mb.insertDatetime = new Date();
      this.employeemasterManager.saveemployee(employeemaster001mb).subscribe((response) => {
        this.calloutService.showSuccess("Employee Master Details Saved Successfully");
        let doctormaster001mb = deserialize<Employeemaster001mb>(Employeemaster001mb, response);
        this.employee?.push(doctormaster001mb);
        const newItems = [JSON.parse(JSON.stringify(doctormaster001mb))];
        this.gridOptions.api.applyTransaction({ add: newItems });
        this.employeeForm.reset();
        form.resetForm();
        this.loaddata();
        this.submitted = false;
        data.resetForm();
      })
    }
  }
  onReset(data: any) {
    this.employeeForm.reset();
    data.resetForm();
    this.loaddata();
    this.submitted = false;
  }
}
