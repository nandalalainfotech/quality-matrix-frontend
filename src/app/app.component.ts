import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthManager } from './shared/services/restcontroller/bizservice/auth-manager.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'login';
  devicsXs: boolean = false;
  mediaSub!: Subscription;
  constructor(
    public MediaObserver: MediaObserver,
    public translateService: TranslateService,
    private authManager: AuthManager,
  ) {
    translateService.setDefaultLang(this.translateService.store.currentLang);
  }

  public changeLanguage(language: string): void {
    this.translateService.use(language);
  }

  ngOnInit() {
    this.authManager.currentUserSubject.subscribe((object: any) => {
      let lang = object?.language2 ? object?.language2?.name : 'English'
      this.translateService.setDefaultLang(lang);
    })

    this.mediaSub = this.MediaObserver.media$.subscribe(
      (result: MediaChange) => {
        this.devicsXs = result.mqAlias === 'xs' ? true : false;
      }
    )
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe()
  }

}

