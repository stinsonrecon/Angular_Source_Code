export function getLoaiGiaoDich(nganHang: string, loaiGd: string, loaiGdCha: string): string {
    nganHang = nganHang.toUpperCase()
    loaiGd = loaiGd.toUpperCase()
    loaiGdCha = loaiGdCha.toUpperCase()
    if (nganHang === "VCB") {
        if (loaiGd === "BT" && loaiGdCha === "BLANK"){
            return "Chuyển tiền cho người hưởng có TK tại Ngân hàng chuyển"
        }
        else if (loaiGd === "LBT" && loaiGdCha === "NP") {
            return "Chuyển tiền trong nước theo phương thức chuyển thường"
        }
        else if (loaiGd === "LBT" && loaiGdCha === "QP") {
            return "Chuyển tiền trong nước theo phương thức chuyển nhanh"
        }
        else if (loaiGd === "CM" && loaiGdCha === "PVCB") {
            return "Chuyển tiền cho người nhận bằng giấy tờ tùy thân trong Ngân hàng chuyển"
        }
        else if (loaiGd === "CM" && loaiGdCha === "POB") {
            return "Chuyển tiền cho người nhận bằng giấy tờ tùy thân tại ngân hàng khác Ngân hàng chuyển"
        }
        else {
            return ""
        }
    }
    else if (nganHang === "BIDV") {
        if (loaiGd === "1") {
            return "Chuyển tiền cho người hưởng có TK tại Ngân hàng chuyển"
        }
        else if (loaiGd === "2") {
            return "Chuyển tiền trong nước theo phương thức chuyển thường"
        }
        else if (loaiGd === " 3") {
            return "Chuyển tiền trong nước theo phương thức chuyển nhanh"
        }
        // else if()
        // {
        //     return "Chuyển tiền cho người nhận bằng giấy tờ tùy thân trong Ngân hàng chuyển"
        // }
        // else if()
        // {
        //     return "Chuyển tiền cho người nhận bằng giấy tờ tùy thân tại ngân hàng khác Ngân hàng chuyển"
        // }
        else {
            return ""
        }
    }
    else {
        if (loaiGd === "IN") {
            return "Chuyển tiền cho người hưởng có TK tại Ngân hàng chuyển"
        }
        else if (loaiGd === "OU") {
            return "Chuyển tiền trong nước theo phương thức chuyển thường"
        }
        else if (loaiGd === "NP") {
            return "Chuyển tiền trong nước theo phương thức chuyển nhanh"
        }
        // else if () {
        //     return "Chuyển tiền cho người nhận bằng giấy tờ tùy thân trong Ngân hàng chuyển"
        // }
        // else if () {
        //     return "Chuyển tiền cho người nhận bằng giấy tờ tùy thân tại ngân hàng khác Ngân hàng chuyển"
        // }
        else {
            return ""
        }
    }
}
// MÔ TẢ 
// -	Cách xử lý Tran Type/ Loại giao dịch cha
// 	Đối với ngân hàng VCB
// 01. Chuyển tiền cho người hưởng có TK tại Ngân hàng chuyển
// - Loại giao dịch = BT
// - Loại giao dịch cha: blank
// 02. Chuyển tiền trong nước theo phương thức chuyển thường 
// - Loại giao dịch = LBT
// - Loại giao dịch cha: NP
// 03.Chuyển tiền trong nước theo phương thức chuyển nhanh 
//       - Loại giao dịch = LBT
//        - Loại giao dịch cha: QP
// 04.Chuyển tiền cho người nhận bằng giấy tờ tùy thân trong Ngân hàng chuyển
// - Loại giao dịch = CM
// - Loại giao dịch cha: PVCB
// 05.Chuyển tiền cho người nhận bằng giấy tờ tùy thân tại ngân hàng khác Ngân hàng chuyển  
// - Loại giao dịch = CM
// - Loại giao dịch cha: POB

// 	Đối với ngân hàng  BIDV
// 01.	Chuyển tiền cho người hưởng có TK tại Ngân hàng chuyển
// -	Loại giao dịch : 1
// -	 Loại giao dịch cha: Null
// 02.	Chuyển tiền trong nước theo phương thức chuyển thường
// -	Loại giao dịch : 2
// -	 Loại giao dịch cha: Null
//       03.Chuyển tiền trong nước theo phương thức chuyển nhanh
// -	Loại giao dịch : 3
// -	 Loại giao dịch cha: Null
//       04.Chuyển tiền cho người nhận bằng giấy tờ tùy thân trong Ngân hàng chuyển
// 	  Chưa không khai báo 
//                         05.Chuyển tiền cho người nhận bằng giấy tờ tùy thân tại ngân hàng khác Ngân hàng chuyển
// 	    Chưa không khai báo 
// 	Đối với ngân hàng  VTIN và các ngân hàng khác 

// 01.	Chuyển tiền cho người hưởng có TK tại Ngân hàng chuyển
// -	Loại giao dịch : in
// -	 Loại giao dịch cha: Null 
// 02.	Chuyển tiền trong nước theo phương thức chuyển thường 
// -	Loại giao dịch : ou
// -	 Loại giao dịch cha: Null 
// 03.Chuyển tiền trong nước theo phương thức chuyển nhanh 
// -	Loại giao dịch : np
// -	 Loại giao dịch cha: Null 

// 04.Chuyển tiền cho người nhận bằng giấy tờ tùy thân trong Ngân hàng chuyển
// 	  Chưa không khai báo 
// 05.Chuyển tiền cho người nhận bằng giấy tờ tùy thân tại ngân hàng khác Ngân hàng chuyển
// 	    Chưa không khai báo 
