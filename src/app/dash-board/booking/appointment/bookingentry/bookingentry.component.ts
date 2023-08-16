import { DatePipe } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BookingentryManager } from 'src/app/shared/services/restcontroller/bizservice/bookingentry.service';
import { DoctormasterManager } from 'src/app/shared/services/restcontroller/bizservice/doctormaster.service';
import { EmployeemasterManager } from 'src/app/shared/services/restcontroller/bizservice/employeemaster.service';
import { MachinemasterManager } from 'src/app/shared/services/restcontroller/bizservice/machinemaster.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { Bookingentry001mb } from 'src/app/shared/services/restcontroller/entities/Bookingentry001mb';
import { Doctormaster001mb } from 'src/app/shared/services/restcontroller/entities/Doctormaster001mb';
import { Employeemaster001mb } from 'src/app/shared/services/restcontroller/entities/Employeemaster001mb';
import { Machinemaster001mb } from 'src/app/shared/services/restcontroller/entities/Machinemaster001mb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';
import { TimeComponent } from '../time/time.component';

@Component({
  selector: 'app-bookingentry',
  templateUrl: './bookingentry.component.html',
  styleUrls: ['./bookingentry.component.css']
})
export class BookingentryComponent implements OnInit {


  frameworkComponents: any;
  bookingId: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  mslno: string = "";
  dslno: string = "";
  hospital: string = "";
  staff: string = "";
  status: string = "";
  days: string = "";
  date: Date | any;
  time: string = "";
  appNo: string | any;
  count: number = 0;
  Doctormaster: Doctormaster001mb[] = [];
  machiness: Machinemaster001mb[] = [];
  booking: Bookingentry001mb[] = [];
  employee: Employeemaster001mb[] = [];
  user: User001mb[] = [];
  public gridOptions: GridOptions | any;
  bookingForm: FormGroup | any;
  resetForm: FormGroup | any;
  submitted = false;
  parentMenuString: string = '';
  childMenuString: string = '';
  dayList: Array<any> = [];
  value: string = "";
  timeValue: string = "";
  arr: any[] = [];
  params: any;
  minDate = new Date();
  maxDate = new Date();

  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;

  constructor(
    private systemPropertiesService: SystemPropertiesService,
    private formBuilder: FormBuilder,
    private doctormasterManager: DoctormasterManager,
    private machinemasterManager: MachinemasterManager,
    private bookingentryManager: BookingentryManager,
    private datepipe: DatePipe,
    private router: Router,
    private calloutService: CalloutService,
    private authManager: AuthManager,
    private employeemasterManager: EmployeemasterManager,
    private userManager: UserManager,
    private dataSharedService: DataSharedService,
    private modalService: NgbModal) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit() {

    this.role = this.authManager.getcurrentUser.rolename;
    this.username = this.authManager.getcurrentUser.username;
    this.authManager.currentUserSubject.subscribe((object: any) => {
      let rgb = Utils.hexToRgb(object.theme);

      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });

    this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);
    this.bookingForm = this.formBuilder.group({
      appNo: ['',],
      mslno: ['', Validators.required],
      dslno: ['', Validators.required],
      hospital: ['', Validators.required],
      staff: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      status: ['',],
    });

    this.loaddata();
    this.createDataGrid001();
    this.machinemasterManager.allmachinemaster(this.username).subscribe((response: any) => {
      this.machiness = deserialize<Machinemaster001mb[]>(Machinemaster001mb, response);
    })
    this.doctormasterManager.alldoctormaster(this.username).subscribe((response: any) => {
      this.Doctormaster = deserialize<Doctormaster001mb[]>(Doctormaster001mb, response);
    });
    this.employeemasterManager.allemployee(this.username).subscribe((response: any) => {
      this.employee = deserialize<Employeemaster001mb[]>(Employeemaster001mb, response);
    });
    this.userManager.alluser().subscribe((response: any) => {
      for (let i = 0; i < response.length; i++) {
        if (response[i].rolename == "User") {
          this.user = deserialize<User001mb[]>(User001mb, response);
          this.arr.push(response[i])
        }
      }
    });
  }

  username = this.authManager.getcurrentUser.username;
  role = this.authManager.getcurrentUser.rolename;

  loaddata() {

    this.bookingentryManager.allbooking(this.username).subscribe((response) => {
      this.booking = deserialize<Bookingentry001mb[]>(Bookingentry001mb, response);
      if (this.booking.length > 0) {
        this.gridOptions?.api?.setRowData(this.booking);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    })

    this.bookingentryManager.getCount().subscribe(response => {
      this.count = response[0].ss == 0 ? 1 : parseInt(response[0].ss) + 1;
      this.bookingForm.patchValue({
        appNo: String("MM/APP/22-23/") + String(this.count).padStart(4, '0')
      });
    });

  }
  get f() { return this.bookingForm.controls; }

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
        field: 'bookingId',
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
        headerName: 'Appointment No',
        field: 'appNo',
        width: 200,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Machine',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setMachine.bind(this)
      },
      {
        headerName: 'Doctor',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setDoctor.bind(this)
      },
      {
        headerName: 'Hospital',
        field: 'hospital',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Employee',
        field: 'staff',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Date',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.date ? this.datepipe.transform(params.data.date, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'Time',
        field: 'time',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'View',
        cellRenderer: 'iconRenderer',
        width: 200,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onViewButtonClick.bind(this),
          label: 'View'
        }
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
  setMachine(params: any): string {
    return params.data.mslno2 ? params.data.mslno2.machinename : null;
  }
  setDoctor(params: any): string {
    return params.data.dslno2 ? params.data.dslno2.doctorname : null;
  }
  onEditButtonClick(params: any) {
    this.bookingId = params.data.bookingId;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.bookingForm.patchValue({
      'mslno': params.data.mslno,
      'dslno': params.data.dslno,
      'appNo': params.data.appNo,
      'hospital': params.data.hospital,
      'staff': params.data.staff,
      'date': new Date(params.data.date),
      'time': params.data.time
    });
  }

  onDeleteButtonClick(params: any) {
    this.bookingentryManager.bookingdelete(params.data.bookingId).subscribe((response) => {
      for (let i = 0; i < this.booking.length; i++) {
        if (this.booking[i].bookingId == params.data.bookingId) {
          this.booking?.splice(i, 1);
          break;
        }
      }
      const selectedRows = params.api.getSelectedRows();
      params.api.applyTransaction({ remove: selectedRows });
      this.calloutService.showSuccess("Booking Entry Details Removed Successfully");
    });
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Booking Entry";
    modalRef.componentInstance.details = params.data;
  }

  onViewButtonClick(params: any) {
    const modalRef = this.modalService.open(TimeComponent);
    modalRef.componentInstance.title = "Booking Entry";
    modalRef.componentInstance.details = params;
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

  onUserClick(data: NgForm, bookingForm: any, form: any) {
    console.log('bookingForm------------------->>>>', this.f);


    this.markFormGroupTouched(this.bookingForm);
    this.submitted = true;
    if (this.bookingForm.invalid) {
      return;
    }
    let bookingentry001mb = new Bookingentry001mb();
    bookingentry001mb.mslno = this.f.mslno.value ? this.f.mslno.value : "";
    bookingentry001mb.dslno = this.f.dslno.value ? this.f.dslno.value : "";
    bookingentry001mb.appNo = this.f.appNo.value ? this.f.appNo.value : "";
    bookingentry001mb.hospital = this.f.hospital.value ? this.f.hospital.value : "";
    bookingentry001mb.staff = this.f.staff.value ? this.f.staff.value : "";
    bookingentry001mb.date = new Date(this.f.date.value);
    bookingentry001mb.time = this.f.time.value ? this.f.time.value : "";
    bookingentry001mb.status = "Not Approved";
    if (this.bookingId) {
      bookingentry001mb.bookingId = this.bookingId;
      bookingentry001mb.insertUser = this.insertUser;
      bookingentry001mb.insertDatetime = this.insertDatetime;
      bookingentry001mb.updatedUser = this.authManager.getcurrentUser.username;
      bookingentry001mb.updatedDatetime = new Date();
      this.bookingentryManager.updatebooking(bookingentry001mb).subscribe((response: any) => {
        this.calloutService.showSuccess("Booking Entry Details Updated Successfully");
        this.bookingForm.reset();
        form.resetForm();
        this.loaddata();
        this.submitted = false;
        data.resetForm();
        this.bookingId = null;
      })
    }
    else {
      bookingentry001mb.insertUser = this.authManager.getcurrentUser.username;
      bookingentry001mb.insertDatetime = new Date();
      this.bookingentryManager.savebooking(bookingentry001mb).subscribe((response) => {
        this.calloutService.showSuccess("Booking Entry Details Saved Successfully");
        if (this.bookingForm.valid) {
          this.loaddata();
          this.router.navigate(['/app-dash-board/app-booking/app-calendar-table']);
          return;
        }
        this.bookingForm.reset();
        form.resetForm();
        this.loaddata();
        this.submitted = false;
        data.resetForm();
      })
    }
  }
  onReset(data: any) {
    this.bookingForm.reset();
    data.resetForm();
    this.loaddata();
    this.submitted = false;
  }


  getRowStyle(params: any) {
    if (params.data.status == "Approved") {
      return { 'background-color': '#7FFFD4' };
    }
    else {
      return { 'background-color': '#FFB6C1' };
    }
  }
}


