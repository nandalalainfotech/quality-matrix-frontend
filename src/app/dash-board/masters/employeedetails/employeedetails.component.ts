import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CourseManager } from 'src/app/shared/services/restcontroller/bizservice/course.service';
import { EmployeedetailsManager } from 'src/app/shared/services/restcontroller/bizservice/employeedetails.service';
import { Doctormaster001mb } from 'src/app/shared/services/restcontroller/entities/Doctormaster001mb';
import { Employeedetails001mb } from 'src/app/shared/services/restcontroller/entities/Employeedetails001mb';
import { Course001mb } from 'src/app/shared/services/restcontroller/entities/course001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css']
})
export class EmployeedetailsComponent implements OnInit {

  frameworkComponents: any;
  employeedetailsForm: FormGroup | any;
  resetForm: FormGroup | any;
  slNo: number | any;
  employeeId: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  employeename: string = "";
  contactnumber: number | any;
  emailid: string = "";
  companyname: string = "";
  addressline1: string = "";
  addressline2: string = "";
  coursename: string = "";
  course: Course001mb[] = [];
  city: string = "";
  state: string = "";
  pincode: number | any;
  status: boolean = false;
  submitted = false;
  employee: Employeedetails001mb[] = [];
  public gridOptions: GridOptions | any;


  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;


  constructor(private employeedetailsManager: EmployeedetailsManager,
    private calloutService: CalloutService,
    private formBuilder: FormBuilder,
    private courseManager: CourseManager,
    private authManager: AuthManager,
    private modalService: NgbModal) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }
  colorControl = new FormControl('primary' as ThemePalette);

  ngOnInit() {

    console.log("employee---------------------", this.employee);

    let users: any[] = [];
    // this.control.markAsTouched();
    this.username = this.authManager.getcurrentUser.username;

    this.authManager.currentUserSubject.subscribe((object: any) => {
      let rgb = Utils.hexToRgb(object.theme);

      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });
    console.log("this.username---------->", this.username);

    this.employeedetailsForm = this.formBuilder.group({
      employeename: ['', Validators.required],
      contactnumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      emailid: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      companyname: ['', Validators.required],
      addressline1: ['', Validators.required],
      addressline2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      slNo: ['', Validators.required],
      status: [''],
    })

    this.loaddata();
    this.createDataGrid001();
    this.courseManager.allcourse(this.username).subscribe((response: any) => {
      console.log("response---->333", response);

      this.course = deserialize<Course001mb[]>(Course001mb, response);
      console.log("regionmaster---->334", this.course);
    });
  }

  username = this.authManager.getcurrentUser.username;
  loaddata() {
    this.employeedetailsManager.allemployeedetails(this.username).subscribe((response) => {
      this.employee = deserialize<Employeedetails001mb[]>(Employeedetails001mb, response);
      if (this.employee.length > 0) {
        this.gridOptions?.api?.setRowData(this.employee);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    })


  }

  get f() { return this.employeedetailsForm.controls }

  createDataGrid001(): void {
    this.gridOptions = {
      paginationPageSize: 10,
      rowSelection: 'single',
      onFirstDataRendered: this.onFirstDataRendered.bind(this),
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
        headerName: 'Contact Number',
        field: 'contactnumber',
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
        headerName: 'Company Name',
        field: 'companyname',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'Address Line 1',
        field: 'addressline1',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Address Line 2',
        field: 'addressline2',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'City',
        field: 'city',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'State',
        field: 'state',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Course Name',
        field: 'slNo',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setCourse.bind(this)
      },
      {
        headerName: 'Pin Code',
        field: 'pincode',
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
        width: 200,
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
        width: 250,
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
        width: 250,
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

  setCourse(params: any): string {
    console.log("params--->", params);
    // params.slNo = this.course.map(({ coursename }) => coursename)
    // console.log("params=====>", params);params.data.dslno2.doctorname : null;
    // return params.data.mslno2 ? params.data.mslno2.machinename : null;

    return params.data.slNo2 ? params.data.slNo2.coursename : null;
  }

  onEditButtonClick(params: any) {
    this.employeeId = params.data.employeeId;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.employeedetailsForm.patchValue({
      'employeename': params.data.employeename,
      'contactnumber': params.data.contactnumber,
      'emailid': params.data.emailid,
      'companyname': params.data.companyname,
      'addressline1': params.data.addressline1,
      'addressline2': params.data.addressline2,
      'city': params.data.city,
      'state': params.data.state,
      'slNo': params.data.slNo,
      'pincode': params.data.pincode,
      'status': params.data.status
    });
  }

  onDeleteButtonClick(params: any) {
    console.log("params", params);

    this.employeedetailsManager.deleteemployeedetails(params.data.employeeId).subscribe((response) => {
      for (let i = 0; i < this.employee.length; i++) {
        if (this.employee[i].employeeId == params.data.employeeId) {
          this.employee?.splice(i, 1);
          break;
        }
      }
      const selectedRows = params.api.getSelectedRows();
      params.api.applyTransaction({ remove: selectedRows });
      this.calloutService.showSuccess("Employee Details Removed Successfully");
    });
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Employee Details";
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

  onOrderClick(employeedetailsForm: any, data: NgForm, form: any) {
    console.log("data,form, employeedetailsForm----->", data, form, employeedetailsForm);

    this.markFormGroupTouched(this.employeedetailsForm);
    this.submitted = true;
    if (this.employeedetailsForm.invalid) {
      return;
    }
    let employeedetails001mb = new Employeedetails001mb();
    employeedetails001mb.addressline1 = this.f.addressline1.value ? this.f.addressline1.value : "";
    employeedetails001mb.addressline2 = this.f.addressline2.value ? this.f.addressline2.value : "";
    employeedetails001mb.city = this.f.city.value ? this.f.city.value : "";
    employeedetails001mb.employeename = this.f.employeename.value ? this.f.employeename.value : "";
    employeedetails001mb.emailid = this.f.emailid.value ? this.f.emailid.value : "";
    employeedetails001mb.slNo = this.f.slNo.value ? this.f.slNo.value : "";
    employeedetails001mb.companyname = this.f.companyname.value ? this.f.companyname.value : "";
    employeedetails001mb.contactnumber = this.f.contactnumber.value ? this.f.contactnumber.value : 0;
    employeedetails001mb.pincode = this.f.pincode.value ? this.f.pincode.value : 0;
    employeedetails001mb.state = this.f.state.value ? this.f.state.value : "";
    employeedetails001mb.status = this.f.status.value ? this.f.status.value : false;
    if (this.employeeId) {
      employeedetails001mb.employeeId = this.employeeId;
      employeedetails001mb.insertUser = this.insertUser;
      employeedetails001mb.insertDatetime = this.insertDatetime;
      employeedetails001mb.updatedUser = this.authManager.getcurrentUser.username;
      employeedetails001mb.updatedDatetime = new Date();
      this.employeedetailsManager.updateemployeedetails(employeedetails001mb).subscribe((response) => {
        this.calloutService.showSuccess("Course Name Details Updated Successfully");
        let employeedetails001mb = deserialize<Employeedetails001mb>(Employeedetails001mb, response);
        for (let employees of this.employee) {
          if (this.employeeId) {
            employees.employeeId == employeedetails001mb.employeeId
            employees.addressline1 = employeedetails001mb.addressline1;
            employees.addressline2 = employeedetails001mb.addressline2;
            employees.city = employeedetails001mb.city;
            employees.employeename = employeedetails001mb.employeename;
            employees.emailid = employeedetails001mb.emailid;
            employees.slNo = employeedetails001mb.slNo;
            employees.companyname = employeedetails001mb.companyname;
            employees.contactnumber = employeedetails001mb.contactnumber;
            employees.pincode = employeedetails001mb.pincode;
            employees.state = employeedetails001mb.state;
            employees.status = employeedetails001mb.status;
            employees.insertUser = this.insertUser;
            employees.insertDatetime = this.insertDatetime;
            employees.updatedUser = this.authManager.getcurrentUser.username;
            employees.updatedDatetime = new Date();
          }
        }
        this.gridOptions.api.setRowData(this.employee);
        this.gridOptions.api.refreshView();
        this.gridOptions.api.deselectAll();
        this.employeedetailsForm.reset();
        form.resetForm();
        this.loaddata();
        this.submitted = false;
        data.resetForm();
        this.employeeId = null;
      });
    }
    else {
      employeedetails001mb.insertUser = this.authManager.getcurrentUser.username;
      employeedetails001mb.insertDatetime = new Date();
      this.employeedetailsManager.saveemployeedetails(employeedetails001mb).subscribe((response) => {
        console.log("response----------->", response);

        this.calloutService.showSuccess("Doctors Master Details Saved Successfully");
        let doctormaster001mb = deserialize<Doctormaster001mb>(Doctormaster001mb, response);
        this.employee?.push(doctormaster001mb);
        const newItems = [JSON.parse(JSON.stringify(doctormaster001mb))];
        this.gridOptions.api.applyTransaction({ add: newItems });
        this.employeedetailsForm.reset();
        form.resetForm();
        this.loaddata();
        this.submitted = false;
        data.resetForm();
      })
    }
  }

  onReset(data: any) {
    this.employeedetailsForm.reset();
    data.resetForm();
    this.loaddata();
    this.submitted = false;
  }
}
