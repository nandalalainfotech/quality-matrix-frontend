import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { RegionmasterManager } from 'src/app/shared/services/restcontroller/bizservice/regionmaster.service';
import { Regionmaster001mb } from 'src/app/shared/services/restcontroller/entities/Regionmaster001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-regionmaster',
  templateUrl: './regionmaster.component.html',
  styleUrls: ['./regionmaster.component.css']
})
export class RegionmasterComponent implements OnInit {

  @Input() lang: any;
  frameworkComponents: any;
  slNo: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  region: string = "";
  public gridOptions: GridOptions | any;
  regionmaster: Regionmaster001mb[] = [];
  regionForm: FormGroup | any;
  resetForm: FormGroup | any;
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
    private dataSharedService: DataSharedService,
    private regionmasterManager: RegionmasterManager,
    private modalService: NgbModal) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit() {
    this.createDataGrid001();
    this.username = this.authManager.getcurrentUser.username;
    this.authManager.currentUserSubject.subscribe((object: any) => {
      let rgb = Utils.hexToRgb(object.theme);

      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });

    this.regionForm = this.formBuilder.group({
      region: ['', Validators.required],
      status: [''],
    });
    this.loaddata();
    this.createDataGrid001();
  }
  username = this.authManager.getcurrentUser.username;

  loaddata() {
    this.regionmasterManager.allregion(this.username).subscribe((response) => {
      this.regionmaster = deserialize<Regionmaster001mb[]>(Regionmaster001mb, response);
      if (this.regionmaster.length > 0) {
        this.gridOptions?.api?.setRowData(this.regionmaster);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    })
  }

  get f() { return this.regionForm.controls; }

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
    this.regionForm.patchValue({
      'region': params.data.region,
      'status': params.data.status
    });
  }
  onDeleteButtonClick(params: any) {
    this.regionmasterManager.regiondelete(params.data.slNo).subscribe((response: any) => {
      for (let i = 0; i < this.regionmaster.length; i++) {
        if (this.regionmaster[i].slNo == params.data.slNo) {
          this.regionmaster?.splice(i, 1);
          break;
        }
      }
      const selectedRows = params.api.getSelectedRows();
      params.api.applyTransaction({ remove: selectedRows });
      this.calloutService.showSuccess("Region Master Details Removed Successfully");
    });
  }

  onAuditButtonClick(params: any) {
    console.log("params", params)
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Region Master";
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

  onUserClick(data: NgForm, regionForm: any, form: any) {
    this.markFormGroupTouched(this.regionForm);
    this.submitted = true;
    if (this.regionForm.invalid) {
      return;
    }
    let regionmaster001mb = new Regionmaster001mb();
    regionmaster001mb.region = this.f.region.value ? this.f.region.value : "";
    regionmaster001mb.status = this.f.status.value ? this.f.status.value : false;
    if (this.slNo) {
      regionmaster001mb.slNo = this.slNo;
      regionmaster001mb.insertUser = this.insertUser;
      regionmaster001mb.insertDatetime = this.insertDatetime;
      regionmaster001mb.updatedUser = this.authManager.getcurrentUser.username;
      regionmaster001mb.updatedDatetime = new Date();
      this.regionmasterManager.updateregion(regionmaster001mb).subscribe((response: any) => {
        this.calloutService.showSuccess("Region Master Details Updated Successfully");
        let regionmaster001mb = deserialize<Regionmaster001mb>(Regionmaster001mb, response);
        for (let regionmasters of this.regionmaster) {
          if (regionmasters.slNo == regionmaster001mb.slNo) {
            regionmasters.region = regionmaster001mb.region;
            regionmasters.status = regionmaster001mb.status;
            regionmasters.insertUser = this.insertUser;
            regionmasters.insertDatetime = this.insertDatetime;
            regionmasters.updatedUser = this.authManager.getcurrentUser.username;
            regionmasters.updatedDatetime = new Date();
          }
        }
        this.regionForm.reset();
        form.resetForm();
        this.loaddata();
        this.submitted = false;
        data.resetForm();
        this.slNo = null;
      })
    }
    else {
      regionmaster001mb.insertUser = this.authManager.getcurrentUser.username;
      regionmaster001mb.insertDatetime = new Date();
      this.regionmasterManager.saveregion(regionmaster001mb).subscribe((response) => {
        this.calloutService.showSuccess("Region Master Details Saved Successfully");
        let regionmaster001mb = deserialize<Regionmaster001mb>(Regionmaster001mb, response);
        this.regionmaster?.push(regionmaster001mb);
        const newItems = [JSON.parse(JSON.stringify(regionmaster001mb))];
        this.gridOptions.api.applyTransaction({ add: newItems });
        this.regionForm.reset();
        form.resetForm();
        this.loaddata();
        this.submitted = false;
        data.resetForm();
      })
    }
  }
  onReset(data: any) {
    this.regionForm.reset();
    data.resetForm();
    this.loaddata();
    this.submitted = false;
  }
}
