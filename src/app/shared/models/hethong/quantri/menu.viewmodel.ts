
export class MenuViewModel {
    id: number;
    parentId: number;
    translate: string;
    title: string;
    type: string;
    icon: string;
    url: string;
    sortOrder?: number;
    display: boolean;

    treeLever?: number;
    treeOrder: string;
    treeIsLeaf?: boolean;
}

export class MenuCreateRequest {
    id: number;
    parentId: number;
    translate: string;
    title: string;
    type: string;
    icon: string;
    url: string;
    sortOrder?: number;
    display: boolean;
}

export class MenuUpdateRequest {
    id: number;
    parentId: number;
    translate: string;
    title: string;
    type: string;
    icon: string;
    url: string;
    sortOrder?: number;
    display: boolean;
}

export class MenuWithRoleViewModel {
    id: number;
    parentId: number;
    title: string;
    sortOrder?: number;
    isSelect: boolean;

    treeOrder: string;
    treeLevel: number;
}
