import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { WebImmoScrapperPropertyModule } from './property/property.module';
import { WebImmoScrapperAttributeModule } from './attribute/attribute.module';
import { WebImmoScrapperLocationModule } from './location/location.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        WebImmoScrapperPropertyModule,
        WebImmoScrapperAttributeModule,
        WebImmoScrapperLocationModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebImmoScrapperEntityModule {}
