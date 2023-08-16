import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthManager } from '../shared/services/restcontroller/bizservice/auth-manager.service';
import { DataSharedService } from '../shared/services/services/datashared.service';

@Component({
	selector: 'app-dash-board',
	templateUrl: './dash-board.component.html',
	styleUrls: ['./dash-board.component.css']
})

export class DashBoardComponent implements OnInit {
	@Input() lang: any;
	isOpen: boolean = false;
	constructor(private dataSharedService: DataSharedService,
		private translateService: TranslateService,
		private authManager: AuthManager) {
			translateService.setDefaultLang(this.translateService.store.currentLang);
	}

	ngOnInit() {

		this.translateService.setDefaultLang('English');
		
		this.authManager.currentUserSubject.subscribe((object: any) => {
            let lang = (object.language2?.name);
            this.translateService.setDefaultLang(lang); 
        }) 

		this.dataSharedService.currentSideNavObject.subscribe((isShow: boolean) => {
			this.isOpen = !isShow;
		});
	}
}
