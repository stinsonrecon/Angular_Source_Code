export class SystemConstants {

}


export const ICON = {
    ADD: 'add',
    EDIT: 'edit',
    SEARCH_ADD: 'zoom_in',
    DELETE: 'delete',
    REMOVE: 'clear',
    FILE: 'attach_file',
    CHECK: 'check',
    EXTEND: 'open_in_new',
    DETAIL: 'pageview',
    UNDO: 'undo',
    SEND: 'send',
    RIGHT_ARROW: 'arrow_forward_ios',
    LEFT_ARROW: 'arrow_back_ios',
    MAIL_OPEN: 'draft',
    MAIL: 'email',
    EVENT: 'event_note'
}


export const TINHCHAT_DUAN_LIST = [
    {

        idTinhChat: 'M',
        tenTinhChat: 'Dự án xây dựng mới'
    },
    {
        idTinhChat: 'C',
        tenTinhChat: 'Dự án cải tạo'
    },
    {
        idTinhChat: 'K',
        tenTinhChat: 'Trường hợp khác'
    },
]

export const NHIENLIEU_DUAN_LIST = [
    {
        idNhienLieu: 0,
        tenNhienLieu: 'Khác'
    },
    {
        idNhienLieu: 1,
        tenNhienLieu: 'Than'
    },
    {
        idNhienLieu: 2,
        tenNhienLieu: 'Dầu'
    },
    {
        idNhienLieu: 3,
        tenNhienLieu: 'Khí'
    },
    {
        idNhienLieu: 4,
        tenNhienLieu: 'LNG'
    }
]

export const ACTION = {
    ADD: 1,
    EDIT: 0,
    DELETE: -1,
    EXTEND: 2,
}

export const GUI_TINH_TRANG = [
    {
        tinhTrang: 1,
        tenTinhTrang: 'Chưa gửi'
    },
    {
        tinhTrang: 2,
        tenTinhTrang: 'Đã gửi'
    },
]

export const GET_DONVI_OPTION = {
    GET_DEFAULT_ALL: 0,
    GET_CHILD_DOWN: 1,
    GET_PARENT_UP: 2,
    GET_PARENT_CHILD: 3
}


export const GIAI_NGAN_OPTION = [
    {
        name: 'Tất cả',
        value: 0,

    },
    {
        name: 'Đã giải ngân',
        value: 1,

    },
    {
        name: 'Chưa giải ngân',
        value: 2,

    }
]

export const CAP_VON_OPTION = [
    {
        name: 'Tất cả',
        value: 0,

    },
    {
        name: 'Phải trình cấp vốn',
        value: 1,

    },
    {
        name: 'Không phải trình',
        value: 2,

    }
]

export const TIME_OPTION = [
    {
        name: 'Từ đầu năm',
        value: 0,

    },
    {
        name: 'Trong tháng',
        value: 1,

    },
    {
        name: 'Trong quý',
        value: 2,

    },
    {
        name: 'Thời gian khác',
        value: 3,

    }
]

export const LOAI_THANH_TOAN = [
    {
        name: 'Thanh toán',
        value: 1,

    },
    {
        name: 'Tạm ứng',
        value: 2,

    },
    {
        name: 'Phần giữ lại',
        value: 3,

    },
    {
        name: 'Trả lại gđ đầu tư',
        value: 4,

    }
]

export const NGUON_VON_PARAM = {
    VON_DON_VI: 1
}

export const TINH_TRANG_TO_TRINH_CAP_VON = [
    {
        name: 'Chưa duyệt',
        value: 0,
    },
    {
        name: 'Đã duyệt',
        value: 1
    }
]
export const DUAN_TRINH_CHUA_GIAO = 1;
