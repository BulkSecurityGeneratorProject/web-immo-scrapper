import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProperty } from 'app/shared/model/property.model';

type EntityResponseType = HttpResponse<IProperty>;
type EntityArrayResponseType = HttpResponse<IProperty[]>;

@Injectable({ providedIn: 'root' })
export class PropertyService {
    public resourceUrl = SERVER_API_URL + 'api/properties';

    constructor(protected http: HttpClient) {}

    create(property: IProperty): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(property);
        return this.http
            .post<IProperty>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(property: IProperty): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(property);
        return this.http
            .put<IProperty>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IProperty>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IProperty[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(property: IProperty): IProperty {
        const copy: IProperty = Object.assign({}, property, {
            publicationDate:
                property.publicationDate != null && property.publicationDate.isValid() ? property.publicationDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.publicationDate = res.body.publicationDate != null ? moment(res.body.publicationDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((property: IProperty) => {
                property.publicationDate = property.publicationDate != null ? moment(property.publicationDate) : null;
            });
        }
        return res;
    }
}
