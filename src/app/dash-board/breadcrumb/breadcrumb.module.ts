import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb.component';

// export const environment = {
// 	production: true,
// 	appRootPrefix: '/<>'
// 	};

// export function createTranslateLoader(http: HttpClient) {
// 	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
//   }
@NgModule({
    declarations: [BreadcrumbComponent],
    imports: [CommonModule,
    // TranslateModule.forRoot({
    //     loader: {
    //       provide: TranslateLoader,
    //       useFactory: (createTranslateLoader),
    //       deps: [HttpClient],
    //     },
    //     defaultLanguage: 'en-US',
    //   }),
],
    exports: [BreadcrumbComponent]

})
export class BreadcrumbModule { }
