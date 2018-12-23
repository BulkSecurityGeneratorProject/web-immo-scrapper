import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IProperty } from 'app/shared/model/property.model';
import { PropertyService } from './property.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location';

@Component({
    selector: 'jhi-property-update',
    templateUrl: './property-update.component.html'
})
export class PropertyUpdateComponent implements OnInit {
    property: IProperty;
    isSaving: boolean;

    locations: ILocation[];
    publicationDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected propertyService: PropertyService,
        protected locationService: LocationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ property }) => {
            this.property = property;
            this.publicationDate = this.property.publicationDate != null ? this.property.publicationDate.format(DATE_TIME_FORMAT) : null;
        });
        this.locationService.query().subscribe(
            (res: HttpResponse<ILocation[]>) => {
                this.locations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.property.publicationDate = this.publicationDate != null ? moment(this.publicationDate, DATE_TIME_FORMAT) : null;
        if (this.property.id !== undefined) {
            this.subscribeToSaveResponse(this.propertyService.update(this.property));
        } else {
            this.subscribeToSaveResponse(this.propertyService.create(this.property));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProperty>>) {
        result.subscribe((res: HttpResponse<IProperty>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackLocationById(index: number, item: ILocation) {
        return item.id;
    }
}
