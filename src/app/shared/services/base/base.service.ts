import { throwError, Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Company, User, UserExtend } from '@app/shared/models';
import { MessageConstants } from '@app/shared/constants';

export abstract class BaseService {

    constructor() {}



    protected get apiPortal(): string {
        return `${environment.apiPortal}`;
    }
    protected get apiUrl(): string {
        return `${environment.apiUrl}`;
    }
    protected get apiDefault(): string {
        return this.apiUrl + '/api';
    }

    protected get apiIdentity(): string {
        return this.apiUrl + '/identity';
    }
    protected get apiIdentityServer(): string {
        return this.apiUrl + '/identityServer';
    }

    protected get apiFiles(): string {
        return this.apiUrl + '/files';
    }

    protected get apiDtxd(): string {
        return this.apiUrl + '/dtxd';
    }
    protected get apiCbdt(): string {
        return this.apiUrl + '/cbdt';
    }
    protected get apiBtGpmb(): string {
        return this.apiUrl + '/btgpmb';
    }
    protected get apiDauThau(): string {
        return this.apiUrl + '/dauthau';
    }
    protected get apiQlHd(): string {
        return this.apiUrl + '/qlhd';
    }
    protected get apiGntt(): string {
        return this.apiUrl + '/gntt';
    }

    protected get apiGiamSat(): string {
        return this.apiUrl + '/giamsat';
    }
    protected get apiPdtkBvtc(): string {
        return this.apiUrl + '/pdtkbvtc';
    }
    protected get apiKhoDlnt(): string {
        return this.apiUrl + '/khodlnt';
    }
    protected get apiQlGia(): string {
        return this.apiUrl + '/qlgia';
    }
    protected get apiTongHop(): string {
        return this.apiUrl + '/tonghop';
    }
    protected get apiHistory(): string {
        return this.apiUrl + '/history';
    }

    get localCompany(): Company {
        return JSON.parse(localStorage.getItem('company'));
    }

    get localUser(): User {
        return JSON.parse(localStorage.getItem('user'));
    }

    get localUserExtend(): UserExtend {
        return JSON.parse(localStorage.getItem('userExtend'));
    }

    protected handleError(errorResponse: any): Observable<any> {
        // Doi voi loi return tu Code
        if (errorResponse.status === 500) {
            return throwError(MessageConstants.SYSTEM_ERROR_MSG);
        }
        if (errorResponse.status === 401 || errorResponse.status === 403) {
            return throwError(MessageConstants.LOGIN_AGAIN_MSG);
        }
        if (errorResponse?.error?.message) {
            return throwError(errorResponse.error.message || MessageConstants.SYSTEM_ERROR_MSG);
        }
        // Doi voi loi Validation
        // if (errorResponse.error.errors) {
        //     let modelStateErrors = '';

            // for now just concatenate the error descriptions, alternative we could simply pass the entire error response upstream
            // for (const errorMsg of errorResponse.error.errors) {
            //     modelStateErrors += errorMsg + '. ';
            // }

        //     for (const errorMsg of Object.keys(errorResponse.error.errors)) {
        //         modelStateErrors += errorResponse.error.errors[errorMsg][0] + '\n ';
        //     }

        //     return throwError(modelStateErrors || MessageConstants.SYSTEM_ERROR_MSG);
        // }
        return throwError(MessageConstants.SYSTEM_ERROR_MSG);
    }


}
