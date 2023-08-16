import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
    FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry
} from 'ngx-file-drop';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { applogoSettingManager } from 'src/app/shared/services/restcontroller/bizservice/app-logo-settings.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Applogosettings001mb } from 'src/app/shared/services/restcontroller/entities/app-logo-settings001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';

@Component({
    selector: 'app-application-logo-setting',
    templateUrl: './application-logo-setting.component.html',
    styleUrls: ['./application-logo-setting.component.css']
})
export class ApplicationlogoSettingComponent implements OnInit {
    @Input() lang:any;
    @ViewChild('appsettings') appsettings: NgForm | any;
    selectedFile: any;
    appsettingsform:FormGroup | any;
    registerid:any;
    clientname: string = "";
    category: string="";
    clientdescription: string = "";
    appSettings?: Applogosettings001mb;
    frameworkComponents: any;
    submitted = false;


    constructor(private elRef: ElementRef, private renderer: Renderer2, private applogoSettingService: applogoSettingManager,
        private calloutService: CalloutService,
        private authManger: AuthManager,
        private translateService: TranslateService,
        private router: Router,
        private formBuilder: FormBuilder,
        //  private loginManager: LoginManager,
        private dataSharedService: DataSharedService) {
            this.frameworkComponents = {
                iconRenderer: IconRendererComponent
            }

            // translateService.setDefaultLang(this.translateService.store.currentLang);
    }

    public files: NgxFileDropEntry[] = [];

    imageUrl: any;

    ngOnInit() {

        // this.translateService.setDefaultLang('Hi_IN');
    
        this.appsettingsform = this.formBuilder.group({
            clientname:['', Validators.required],
            clientdescription:['', Validators.required],
        });
        this.applogoSettingService.allFiles().subscribe(response => {
            this.appSettings = response;
        })
    }
    get f() { return this.appsettingsform.controls }
  

    public dropped(files: NgxFileDropEntry[]) {

        for (const droppedFile of files) {
            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file((file: File) => {
                    // Here you can access the real file
                    this.selectedFile = file;
                    // ###################
                    // file control jpeg png gif vs
                    if (droppedFile.relativePath.match(/.(jpg|jpeg|png|gif)$/i)) {
                        // this.selectedFile = file;
                        var reader = new FileReader();

                        //var preview = document.querySelector('img');
                        reader.addEventListener(
                            'load',
                            () => {
                                this.imageUrl = reader.result;
                            },
                            false
                        );
                        reader.readAsDataURL(file);
                        // ad class
                        const getDropcozneClass = this.elRef.nativeElement.querySelector(
                            '.satFat-dropZoneBody'
                        );
                        getDropcozneClass.classList.remove('imgBorderYes');
                        getDropcozneClass.classList.add('imgBorderNone');
                    } else {
                        return;
                    }
                    // ###################

                    /**
                    // You could upload it like this:
                    const formData = new FormData()
                    formData.append('logo', file, relativePath)
           
                    // Headers
                    const headers = new HttpHeaders({
                      'security-token': 'mytoken'
                    })
           
                    this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
                    .subscribe(data => {
                      // Sanitized logo returned from backend
                    })
                    **/
                });
            } else {
                // It was a directory (empty directories are added, otherwise only files)
                const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
            }
        }
    }


    public fileOver(event: any) {
        console.log('fileOver :', event);
    }

    public fileLeave(event: any) {
        console.log('fileLeave :', event);
    }

    fileRemove() {
        this.imageUrl = '';
        this.files.splice(0, 1);
        // ad class
        const getDropcozneClass = this.elRef.nativeElement.querySelector(
            '.satFat-dropZoneBody'
        );
        getDropcozneClass.classList.remove('imgBorderNone');
        getDropcozneClass.classList.add('imgBorderYes');
    }
    
    private markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach((control: any) => {
            control.markAsTouched();
            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }

    onOrderClick(event: any,appsettingsform: any) {
           console.log("event-->", event);
        this.clientname = this.f.clientname.value ? this.f.clientname.value : "";
        this.clientdescription = this.f.clientdescription.value ? this.f.clientdescription.value : "";
        this.applogoSettingService.save(this.selectedFile,this.clientname, this.clientdescription,this.category).subscribe((response) => {
            
            this.calloutService.showSuccess("Order Saved Successfully");
            let appsettings001mb = response;
            // this.appSettings?.push(appsettings001mb);
            // const newItems = [JSON.parse(JSON.stringify(appsettings001mb))];
            // this.gridOptions.api.applyTransaction({ add: newItems });
            // this.gridOptions.api.deselectAll();
            this.appsettings.reset();
        });
    }
} 