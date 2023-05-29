export class User {
    token?: string;
    isExpired?: boolean;
    expirationDate?: Date | number;
    permissions?: string[];

    accessFailedCount: 0
    email: string;
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    donViId: number;
    changePassWordDate: Date;
    nhomQuyenId: string;
    idPhongBan: number;
    idChucVu: number;
    chucNangDefault: string;
    listChucNang:any = [];
    jwtToken: string;

    deviceId?: string;
}

export class UserExtend{
    tenDonVi: string;
    maDonVi: string;
    maLoaiDonVi: string;
    tenPhongBan: string;
    maLoaiPhongBan: string;
    tenChucVu: string;
    maLoaiChucVu: string;
}
