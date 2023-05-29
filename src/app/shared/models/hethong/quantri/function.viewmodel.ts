
export class FunctionViewModel {
    id: string;
    parentId: string;
    name: string;
    sortOrder?: number;

    treeOrder: string;
    treeLevel: number;
}


export class FunctionGetOneViewModel {
    id: string;
    parentId: string;
    name: string;
    sortOrder?: number;
}

export class FunctionCreateRequest {
    id: string;
    parentId: string;
    name: string;
    sortOrder?: number;
}

export class FunctionUpdateRequest {
    id: string;
    parentId: string;
    name: string;
    sortOrder?: number;
}

export class CommandAssignRequest {
    commandIds: string[];
    addToAllFunctions = false;
}

export class FunctionWithRoleViewModel {
    id: number;
    parentId: number;
    name: string;
    sortOrder?: number;

    treeOrder: string;
    treeLevel: number;
    
    hasView: boolean;
    hasCreate: boolean;
    hasUpdate: boolean;
    hasDelete: boolean;
    hasApprove: boolean;

    hasViewIsSelect: boolean;
    hasCreateIsSelect: boolean;
    hasUpdateIsSelect: boolean;
    hasDeleteIsSelect: boolean;
    hasApproveIsSelect: boolean;
}

