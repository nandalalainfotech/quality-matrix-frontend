import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { DoctormasterManager } from 'src/app/shared/services/restcontroller/bizservice/doctormaster.service';
import { RegionmasterManager } from 'src/app/shared/services/restcontroller/bizservice/regionmaster.service';
import { Doctormaster001mb } from 'src/app/shared/services/restcontroller/entities/Doctormaster001mb';
import { Regionmaster001mb } from 'src/app/shared/services/restcontroller/entities/Regionmaster001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Utils } from 'src/app/shared/utils/utils';


@Component({
  selector: 'app-doctorsmaster',
  templateUrl: './doctorsmaster.component.html',
  styleUrls: ['./doctorsmaster.component.css']
})
export class DoctorsmasterComponent implements OnInit {

  frameworkComponents: any;
  doctorForm: FormGroup | any;
  resetForm: FormGroup | any;
  slNo: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  doctorname: string = "";
  contactnumber: number | any;
  emailid: string = "";
  hospitalname: string = "";
  addressline1: string = "";
  addressline2: string = "";
  region: string = "";
  regionmaster: Regionmaster001mb[] = [];
  city: string = "";
  state: string = "";
  pincode: number | any;
  status: boolean = false;
  submitted = false;
  Doctormaster: Doctormaster001mb[] = [];
  public gridOptions: GridOptions | any;


  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;


  constructor(private doctormasterManager: DoctormasterManager,
    private calloutService: CalloutService,
    private formBuilder: FormBuilder,
    private regionmasterManager: RegionmasterManager,
    private authManager: AuthManager,
    private modalService: NgbModal) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }
  colorControl = new FormControl('primary' as ThemePalette);

  ngOnInit() {
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

    this.doctorForm = this.formBuilder.group({
      doctorname: ['', Validators.required],
      contactnumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      emailid: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      hospitalname: ['', Validators.required],
      addressline1: ['', Validators.required],
      addressline2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      region: ['', Validators.required],
      status: [''],
    })

    this.loaddata();
    this.createDataGrid001();
    this.regionmasterManager.allregion(this.username).subscribe((response: any) => {
      this.regionmaster = deserialize<Regionmaster001mb[]>(Regionmaster001mb, response);
    });
  }

  username = this.authManager.getcurrentUser.username;
  loaddata() {
    this.doctormasterManager.alldoctormaster(this.username).subscribe((response) => {
      this.Doctormaster = deserialize<Doctormaster001mb[]>(Doctormaster001mb, response);
      if (this.Doctormaster.length > 0) {
        this.gridOptions?.api?.setRowData(this.Doctormaster);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }

    })
  }

  get f() { return this.doctorForm.controls }

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
        field: 'slNo',
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
        headerName: 'Doctor Name',
        field: 'doctorname',
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
        headerName: 'Hospital Name',
        field: 'hospitalname',
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
        headerName: 'Region',
        field: 'region',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
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

  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.doctorForm.patchValue({
      'doctorname': params.data.doctorname,
      'contactnumber': params.data.contactnumber,
      'emailid': params.data.emailid,
      'hospitalname': params.data.hospitalname,
      'addressline1': params.data.addressline1,
      'addressline2': params.data.addressline2,
      'city': params.data.city,
      'state': params.data.state,
      'region': params.data.region,
      'pincode': params.data.pincode,
      'status': params.data.status
    });
  }

  onDeleteButtonClick(params: any) {
    console.log("params", params);

    this.doctormasterManager.deletedoctormaster(params.data.slNo).subscribe((response) => {
      for (let i = 0; i < this.Doctormaster.length; i++) {
        if (this.Doctormaster[i].slNo == params.data.slNo) {
          this.Doctormaster?.splice(i, 1);
          break;
        }
      }
      const selectedRows = params.api.getSelectedRows();
      params.api.applyTransaction({ remove: selectedRows });
      this.calloutService.showSuccess("Doctors Master Details Removed Successfully");
    });
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Doctors Master";
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

  onOrderClick(doctorForm: any, data: NgForm, form: any) {
    this.markFormGroupTouched(this.doctorForm);
    this.submitted = true;
    if (this.doctorForm.invalid) {
      return;
    }
    let doctormaster001mb = new Doctormaster001mb();
    doctormaster001mb.addressline1 = this.f.addressline1.value ? this.f.addressline1.value : "";
    doctormaster001mb.addressline2 = this.f.addressline2.value ? this.f.addressline2.value : "";
    doctormaster001mb.city = this.f.city.value ? this.f.city.value : "";
    doctormaster001mb.doctorname = this.f.doctorname.value ? this.f.doctorname.value : "";
    doctormaster001mb.emailid = this.f.emailid.value ? this.f.emailid.value : "";
    doctormaster001mb.region = this.f.region.value ? this.f.region.value : "";
    doctormaster001mb.hospitalname = this.f.hospitalname.value ? this.f.hospitalname.value : "";
    doctormaster001mb.contactnumber = this.f.contactnumber.value ? this.f.contactnumber.value : 0;
    doctormaster001mb.pincode = this.f.pincode.value ? this.f.pincode.value : 0;
    doctormaster001mb.state = this.f.state.value ? this.f.state.value : "";
    doctormaster001mb.status = this.f.status.value ? this.f.status.value : false;
    if (this.slNo) {
      doctormaster001mb.slNo = this.slNo;
      doctormaster001mb.insertUser = this.insertUser;
      doctormaster001mb.insertDatetime = this.insertDatetime;
      doctormaster001mb.updatedUser = this.authManager.getcurrentUser.username;
      doctormaster001mb.updatedDatetime = new Date();
      this.doctormasterManager.updatedoctormaster(doctormaster001mb).subscribe((response) => {
        this.calloutService.showSuccess("Doctors Master Details Updated Successfully");
        let doctormaster001mb = deserialize<Doctormaster001mb>(Doctormaster001mb, response);
        for (let Doctormasters of this.Doctormaster) {
          if (Doctormasters.slNo == doctormaster001mb.slNo) {
            Doctormasters.addressline1 = doctormaster001mb.addressline1;
            Doctormasters.addressline2 = doctormaster001mb.addressline2;
            Doctormasters.city = doctormaster001mb.city;
            Doctormasters.doctorname = doctormaster001mb.doctorname;
            Doctormasters.emailid = doctormaster001mb.emailid;
            Doctormasters.region = doctormaster001mb.region;
            Doctormasters.hospitalname = doctormaster001mb.hospitalname;
            Doctormasters.contactnumber = doctormaster001mb.contactnumber;
            Doctormasters.pincode = doctormaster001mb.pincode;
            Doctormasters.state = doctormaster001mb.state;
            Doctormasters.status = doctormaster001mb.status;
            Doctormasters.insertUser = this.insertUser;
            Doctormasters.insertDatetime = this.insertDatetime;
            Doctormasters.updatedUser = this.authManager.getcurrentUser.username;
            Doctormasters.updatedDatetime = new Date();
          }
        }
        this.gridOptions.api.setRowData(this.Doctormaster);
        this.gridOptions.api.refreshView();
        this.gridOptions.api.deselectAll();
        this.doctorForm.reset();
        form.resetForm();
        this.loaddata();
        this.submitted = false;
        data.resetForm();
        this.slNo = null;
      });
    }
    else {
      doctormaster001mb.insertUser = this.authManager.getcurrentUser.username;
      doctormaster001mb.insertDatetime = new Date();
      this.doctormasterManager.savedoctormaster(doctormaster001mb).subscribe((response) => {
        console.log("response----------->", response);

        this.calloutService.showSuccess("Doctors Master Details Saved Successfully");
        let doctormaster001mb = deserialize<Doctormaster001mb>(Doctormaster001mb, response);
        this.Doctormaster?.push(doctormaster001mb);
        const newItems = [JSON.parse(JSON.stringify(doctormaster001mb))];
        this.gridOptions.api.applyTransaction({ add: newItems });
        this.doctorForm.reset();
        form.resetForm();
        this.loaddata();
        this.submitted = false;
        data.resetForm();
      })
    }
  }
  onReset(data: any) {
    this.doctorForm.reset();
    data.resetForm();
    this.loaddata();
    this.submitted = false;
  }
}