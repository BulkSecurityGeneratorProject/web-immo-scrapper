import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { WebImmoScrapperPropertyModule } from './property/property.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        WebImmoScrapperPropertyModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebImmoScrapperEntityModule {}
