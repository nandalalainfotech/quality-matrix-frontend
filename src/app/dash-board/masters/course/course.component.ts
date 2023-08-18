import { DatePipe } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CourseManager } from 'src/app/shared/services/restcontroller/bizservice/course.service';
import { Course001mb } from 'src/app/shared/services/restcontroller/entities/course001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @Input() lang: any;
  frameworkComponents: any;
  slNo: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  coursename: string = "";
  public gridOptions: GridOptions | any;
  course: Course001mb[] = [];
  courseForm: FormGroup | any;
  resetForm: FormGroup | any;
  validity: Date | any;
  submitted = false;
  parentMenuString: string = '';
  status: boolean = false;
  childMenuString: string = '';


  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;

  constructor(
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private authManager: AuthManager,
    private datepipe: DatePipe,
    private translateService: TranslateService,
    private dataSharedService: DataSharedService,
    private courseManager: CourseManager,
    private modalService: NgbModal) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit() {
    this.createDataGrid001();
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

    this.courseForm = this.formBuilder.group({
      coursename: ['', Validators.required],
      validity: ['', Validators.required],
      status: [''],
    });
    this.loaddata();
    this.createDataGrid001();
  }
  username = this.authManager.getcurrentUser.username;

  loaddata() {
    this.courseManager.allcourse(this.username).subscribe((response) => {
      console.log("response->11", response);

      this.course = deserialize<Course001mb[]>(Course001mb, response);
      if (this.course.length > 0) {
        this.gridOptions?.api?.setRowData(this.course);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    })
  }

  get f() { return this.courseForm.controls; }

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
        headerName: 'Course Name',
        field: 'coursename',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Validity',
        field: 'validity',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.validity ? this.datepipe.transform(params.data.validity, 'dd-MM-yyyy') : '';
        }
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
        cellStyle: { textAlign: 'center', color: 'rgb(28, 67, 101)' },
        cellRenderer: (params: any) => {
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
    console.log("params", params);
    this.slNo = params.data.slNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.courseForm.patchValue({
      'coursename': params.data.coursename,
      'validity': new Date(params.data.validity),
      'status': params.data.status
    });
  }

  
  // onEditButtonClick(params: any) {
  //   this.employeeId = params.data.employeeId;
  //   this.insertUser = params.data.insertUser;
  //   this.insertDatetime = params.data.insertDatetime;
  //   this.employeedetailsForm.patchValue({
  //     'employeename': params.data.employeename,
  //     'contactnumber': params.data.contactnumber,
  //     'emailid': params.data.emailid,
  //     'companyname': params.data.companyname,
  //     'addressline1': params.data.addressline1,
  //     'addressline2': params.data.addressline2,
  //     'city': params.data.city,
  //     'state': params.data.state,
  //     'slNo': params.data.slNo,
  //     'pincode': params.data.pincode,
  //     'status': params.data.status
  //   });
  // }
  onDeleteButtonClick(params: any) {
    this.courseManager.coursedelete(params.data.slNo).subscribe((response: any) => {
      for (let i = 0; i < this.course.length; i++) {
        if (this.course[i].slNo == params.data.slNo) {
          this.course?.splice(i, 1);
          break;
        }
      }
      const selectedRows = params.api.getSelectedRows();
      params.api.applyTransaction({ remove: selectedRows });
      this.calloutService.showSuccess("Course Name Removed Successfully");
    });
  }

  onAuditButtonClick(params: any) {
    console.log("params", params)
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Course";
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

  onUserClick(data: NgForm, courseForm: any, form: any) {
    console.log("data, courseForm, form--->11", data, courseForm, form);

    this.markFormGroupTouched(this.courseForm);
    this.submitted = true;
    if (this.courseForm.invalid) {
      return;
    }
    let course001mb = new Course001mb();
    course001mb.coursename = this.f.coursename.value ? this.f.coursename.value : "";
    course001mb.validity = new Date(this.f.validity.value);
    course001mb.status = this.f.status.value ? this.f.status.value : false;
    if (this.slNo) {
      course001mb.slNo = this.slNo;
      course001mb.insertUser = this.insertUser;
      course001mb.insertDatetime = this.insertDatetime;
      course001mb.updatedUser = this.authManager.getcurrentUser.username;
      course001mb.updatedDatetime = new Date();
      this.courseManager.updatecourse(course001mb).subscribe((response: any) => {
        this.calloutService.showSuccess("Course Details Updated Successfully");
        let course001mb = deserialize<Course001mb>(Course001mb, response);
        for (let courses of this.course) {
          if (courses.slNo == course001mb.slNo) {
            courses.coursename = course001mb.coursename;
            courses.validity = course001mb.validity;
            courses.status = course001mb.status;
            courses.insertUser = this.insertUser;
            courses.insertDatetime = this.insertDatetime;
            courses.updatedUser = this.authManager.getcurrentUser.username;
            courses.updatedDatetime = new Date();
          }
        }
        this.courseForm.reset();
        form.resetForm();
        this.loaddata();
        this.submitted = false;
        data.resetForm();
        this.slNo = null;
      })
    }
    else {
      course001mb.insertUser = this.authManager.getcurrentUser.username;
      course001mb.insertDatetime = new Date();
      this.courseManager.savecourse(course001mb).subscribe((response) => {
        this.calloutService.showSuccess("Course Details Saved Successfully");
        let course001mb = deserialize<Course001mb>(Course001mb, response);
        this.course?.push(course001mb);
        const newItems = [JSON.parse(JSON.stringify(course001mb))];
        this.gridOptions.api.applyTransaction({ add: newItems });
        this.courseForm.reset();
        form.resetForm();
        this.loaddata();
        this.submitted = false;
        data.resetForm();
      })
    }
  }
  onReset(data: any) {
    this.courseForm.reset();
    data.resetForm();
    this.loaddata();
    this.submitted = false;
  }

}
