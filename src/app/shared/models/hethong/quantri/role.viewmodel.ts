
export class RoleViewModel {
    id: string;
    name: string;
    enable: boolean;
}

export class RoleCreateRequest {
    idDonVi: number;
    name: string;
    enable: boolean;
}

export class RoleUpdateRequest {
    id: string;
    name: string;
    enable: boolean;
}

export class PermissionRequest {
    roleId: string;
    functionId: string;
    commandId: string;
}

export class PermissionAssignRequest {
    permissions: PermissionRequest[];
}

export class PermissionMenuRequest {
    roleId: string;
    menuId: number;
}

export class PermissionMenuAssignRequest {
    permissionMenus: PermissionMenuRequest[];
}

export class PermissionProjectRequest {
    roleId: string;
    idDuAn: string;
}

export class PermissionProjectAssignRequest {
    permissionProjects: PermissionProjectRequest[];
}

export class PermissionCompanyRequest {
    roleId: string;
    idDonVi: number;
}

export class PermissionCompanyAssignRequest {
    permissionCompanies: PermissionCompanyRequest[];
}
