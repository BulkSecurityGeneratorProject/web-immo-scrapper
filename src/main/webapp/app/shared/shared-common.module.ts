import { NgModule } from '@angular/core';

import { WebImmoScrapperSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [WebImmoScrapperSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [WebImmoScrapperSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class WebImmoScrapperSharedCommonModule {}
