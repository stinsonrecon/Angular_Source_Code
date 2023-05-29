import { PagingRequest } from '@app/shared/models/common/pagers/paging.request';

export class UserViewModel {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export class UserPagingRequest extends PagingRequest {
    idDonVi: number;
    idPhongBan?: number;
    idChucVu?: number;
    keyword: string;
}

export class UserCreateRequest {
    userName: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth?: Date;
    idDonVi: number;
    idPhongBan?: number;
    idChucVu?: number;
}

export class UserUpdateRequest {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth?: Date;
    idPhongBan?: number;
    idChucVu?: number;
}

export class UserUpdatePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export class UserUpdateProfileRequest {
    email: string;
    phoneNumber: string;
    dateOfBirth?: Date;
    accountEvnCa: string;
    accountEoffice: string;
    userId: string;
}

export class RoleAssignRequest {
    roleIds: string[];
}
