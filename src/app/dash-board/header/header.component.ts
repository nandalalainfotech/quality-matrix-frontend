import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { applogoSettingManager } from 'src/app/shared/services/restcontroller/bizservice/app-logo-settings.service';
import { ApplanguagesettingManager } from 'src/app/shared/services/restcontroller/bizservice/applanguagesetting.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { Applogosettings001mb } from 'src/app/shared/services/restcontroller/entities/app-logo-settings001mb';
import { Applanguagesetting001mb } from 'src/app/shared/services/restcontroller/entities/Applanguagesetting001mb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { BaseService } from 'src/app/shared/services/services/base.service';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    @Input() lang: any;
    @Output() open: EventEmitter<boolean> = new EventEmitter();
    isOpen: boolean = false;
    parentMenuString: string = "";
    childMenuString: string = "";
    isActive: boolean | undefined;
    user?: User001mb;
    appSettings: Applogosettings001mb = {};
    originalfilename: string = "";
    themes: any;
    name: any;
    applanguagesettings: Applanguagesetting001mb[] = [];
    applang: any[] = []
    language2: any;
    rgbToHex: any;
    hexToRgb: any;
    theme: any;
    user001mb: User001mb = new User001mb();
    color: any;
    clr = 'black';
    sideNavMode: string | undefined;
    public gridOptions: GridOptions | any;
    temporaryDisabled: boolean = true;
    defaultTheme: string = "#286090";
    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    @HostBinding('style.--color_l4') colorthemes_4: any;
    params: any
    public downloadUrl: string = `${environment.apiUrl}/appsettings/download/`;
    constructor(private router: Router,
        private translateService: TranslateService,
        private applanguagesettingManager: ApplanguagesettingManager,
        private userManager: UserManager,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private dataSharedService: DataSharedService,
        private authManger: AuthManager,
        private baseService: BaseService,
        private applogoSettingService: applogoSettingManager,) {
        translateService.setDefaultLang(this.translateService.store.currentLang);
    }

    ngOnInit() {

        this.role = this.authManager.getcurrentUser.rolename;

        this.authManager.currentUserSubject.subscribe((object: any) => {
            let lang = (object.language2?.name);
            this.translateService.setDefaultLang(lang);
        })
        this.user = this.authManger.getcurrentUser;
        // this.colorthemes = this.user.theme;
        this.dataSharedService.currentMenuObject.subscribe((object: any) => {
            this.parentMenuString = object.parentMenuString;
            this.childMenuString = object.childMenuString;
        });
        this.applanguagesettingManager.allapplanguagesetting().subscribe((response: any) => {
            this.applanguagesettings = deserialize<Applanguagesetting001mb[]>(Applanguagesetting001mb, response);
        })
        this.authManager.currentUserSubject.subscribe((object: any) => {
            let rgb = Utils.hexToRgb(object.theme);
            this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);
            this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);
            this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);
            this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
        });
        this.applogoSettingService.allFiles().subscribe(response => {
            this.appSettings = response.originalfilename;
            this.downloadUrl = this.downloadUrl + this.appSettings;
        });
    }

    role = this.authManager.getcurrentUser.rolename;

    ngAfterViewInit() {
        this.temporaryDisabled = false;
    }
    clickMenu() {
        // this.open.emit();
        this.isOpen = !this.isOpen;
        this.dataSharedService.isSideNavAction(this.isOpen);
    }
    submit() {
        this.authManger.logout("");
    }
    onMenuParentClick(parentMenuString: string, childMenuString: string = "") {
        this.parentMenuString = parentMenuString;
        this.childMenuString = childMenuString;
        let object: any = new Object();
        object.parentMenuString = this.parentMenuString;
        object.childMenuString = "";
        this.dataSharedService.changeMenuAction(object);
    }
    onMenuChildClick(parentMenuString: string, childMenuString: string) {
        this.parentMenuString = parentMenuString;
        this.childMenuString = childMenuString;
        let object: any = new Object();
        object.parentMenuString = this.parentMenuString;
        object.childMenuString = this.childMenuString;
        this.dataSharedService.changeMenuAction(object);
    }
    onLanguageClick(event: any, applanguagesetting: any) {
        this.user001mb = this.authManger.getcurrentUser;
        console.log(" this.user001mb", this.user001mb);

        this.translateService.use(applanguagesetting?.name);
        this.user001mb.language = this.authManager.getcurrentUser.language = applanguagesetting.id;
        this.user001mb.language2 = this.authManager.getcurrentUser.language2 = applanguagesetting;
        this.authManager.setcurrentUser(this.user001mb);
    }
    colorPicker(event: any) {
        this.user001mb = this.authManager.getcurrentUser;
        this.color = this.user001mb.theme;
        this.color = this.themes;
        let updateTheme: any = {};
        updateTheme.personId = this.user001mb.personId;
        updateTheme.theme = this.color;
        this.userManager.updateUserTheme(updateTheme).subscribe((response: any) => {
            let currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
            currentUser.userDTO.theme = response.theme;
            this.user001mb.theme = response.theme;
            this.authManager.setcurrentUser(this.user001mb);
            //   This is a color changed area
            let rgb = Utils.hexToRgb(response.theme);
            this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);
            this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);
            this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);
            this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
        });
    }
    defaultColor() {
        this.user001mb = this.authManager.getcurrentUser;
        this.themes = this.user001mb.theme;
        this.themes = this.defaultTheme;
        let updateTheme: any = {};
        updateTheme.personId = this.user001mb.personId;
        updateTheme.theme = this.themes;
        this.userManager.updateUserTheme(updateTheme).subscribe((response: any) => {
            let currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
            currentUser.userDTO.theme = response.theme;
            this.user001mb.theme = response.theme;
            this.authManager.setcurrentUser(this.user001mb);
        });
    }
}