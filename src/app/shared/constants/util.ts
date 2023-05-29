export function yearCombobox(addNum: number, subNum: number, current?: number): any {
    const result = [];
    let currentYear = 0;
    if (current) {
        currentYear = current;
    } else {
        const date = new Date();
        currentYear = date.getFullYear();
    }
    result.push(currentYear);
    for (let i = 1; i <= addNum; i++) {
        result.push(currentYear + i);
    }
    for (let i = 1; i <= subNum; i++) {
        result.unshift(currentYear - i);
    }
    return result;
}

export function formatCurrency(num: any) {
    if (typeof num == 'number') {
        num = num.toString()
    }
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}


export function formatDateString(date: any, format?: any) {
    const dateObject = new Date()
    let signFormat = '/'
    let signDate = '/'
    let dd = String(dateObject.getDate()).padStart(2, '0')
    let mm = String(dateObject.getMonth() + 1).padStart(2, '0') //January is 0!
    let yyyy = dateObject.getFullYear().toString()

    if (format.includes('-')) {
        signFormat = '-'
    }
    if (date.includes('-')) {
        signDate = '-'
    }
    const arrDate = date.split(signDate)
    mm = arrDate[1]
    if (arrDate[0].length !== 4) {
        dd = arrDate[0]
        yyyy = arrDate[2]
    } else {
        dd = arrDate[2]
        yyyy = arrDate[0]
    }

    if (format) {
        const arrFormatDate = format.split(signFormat).map(e => e.toLowerCase())
        if (arrFormatDate.includes('dd')) {
            arrDate[arrFormatDate.indexOf('dd')] = dd
        }
        if (arrFormatDate.includes('mm')) {
            arrDate[arrFormatDate.indexOf('mm')] = mm
        }
        if (arrFormatDate.includes('yyyy')) {
            arrDate[arrFormatDate.indexOf('yyyy')] = yyyy
        }
    } else {
        arrDate[0] = yyyy
        arrDate[1] = mm
        arrDate[2] = dd
    }
    return arrDate.join(signFormat)
}

export function formatDate(date?: Date, format?: any /* dd/mm/yyyy */) {
    const dateObject = date ? new Date(date) : new Date()
    const dd = String(dateObject.getDate()).padStart(2, '0')
    const mm = String(dateObject.getMonth() + 1).padStart(2, '0') //January is 0!
    const yyyy = dateObject.getFullYear().toString()
    const arrDate: any[] = []
    let sign = '/'
    if (format) {
        if (format.includes('-')) {
            sign = '-'
        }

        const arrFormatDate = format.split(sign).map(e => e.toLowerCase());

        if (arrFormatDate.includes('dd')) {
            arrDate[arrFormatDate.indexOf('dd')] = dd
        }
        if (arrFormatDate.includes('mm')) {
            arrDate[arrFormatDate.indexOf('mm')] = mm
        }
        if (arrFormatDate.includes('yyyy')) {
            arrDate[arrFormatDate.indexOf('yyyy')] = yyyy
        }
    } else {
        arrDate[0] = dd
        arrDate[1] = mm
        arrDate[2] = yyyy
    }
    return arrDate.join(sign)
}

export function getHours(date?: Date, format?: any) {
    const dateObject = date ? new Date(date) : new Date()

    return `${dateObject.getHours() < 10
        ? `0${dateObject.getHours()}`
        : dateObject.getHours()
        }:${dateObject.getMinutes() < 10
            ? `0${dateObject.getMinutes()}`
            : dateObject.getHours()
        }`
}

export function formatMoney(
    amount: string,
    decimalCount = 2,
    decimal = '.',
    thousands = ','
) {
    try {
        decimalCount = Math.abs(decimalCount)
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount

        const negativeSign = Number(amount) < 0 ? '-' : ''

        const i: string = parseInt(
            (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
        ).toString()
        const j = i.length > 3 ? i.length % 3 : 0

        return (
            negativeSign +
            (j ? i.substr(0, j) + thousands : '') +
            i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
            (decimalCount
                ? decimal +
                Math.abs(Number(amount) - parseInt(i))
                    .toFixed(decimalCount)
                    .slice(2)
                : '')
        )
    } catch (e) {
        console.log(e)
    }
}


export async function fileListToBase64(fileList) {
    // create function which return resolved promise
    // with data:base64 string
    function getBase64(file) {
        const reader = new FileReader()
        return new Promise(resolve => {
            reader.onload = (ev) => {
                resolve(ev.target['result']);
            }
            reader.readAsDataURL(file)
        })
    }
    // here will be array of promisified functions
    const promises = []

    // loop through fileList with for loop
    for (let i = 0; i < fileList.length; i++) {
        promises.push(getBase64(fileList[i]));
    }

    // array with base64 strings
    return await Promise.all(promises)
}

//download pdf from base 64
/*example

  onClickDownloadPdf(){
    let base64String = "your-base64-string";
    this.downloadPdf(base64String,"sample");
  
}
*/
export function downloadPdf(base64String, fileName) {
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        // download PDF in IE
        let byteChar = atob(base64String);
        let byteArray = new Array(byteChar.length);
        for (let i = 0; i < byteChar.length; i++) {
            byteArray[i] = byteChar.charCodeAt(i);
        }
        let uIntArray = new Uint8Array(byteArray);
        let blob = new Blob([uIntArray], { type: 'application/pdf' });
        window.navigator.msSaveOrOpenBlob(blob, `${fileName}.pdf`);
    } else {
        // Download PDF in Chrome etc.
        const source = `data:application/pdf;base64,${base64String}`;
        const link = document.createElement("a");
        link.href = source;
        link.download = `${fileName}.pdf`
        link.click();
    }

}

export function stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
}

export function formatCurrencyImis(value: any) {
    if (!value) return value;
    if (value && typeof (value) != 'string') {
        value = value.toString();
    }
    return value.replace(/\D/g, '').toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export function formatAnyToNum(value: any) {
    if (!value) return value;
    if (value && typeof (value) != 'string') {
        value = value.toString();
    }
    return value.replace(/\D/g, '');
}

export function convertToNumberCommas(val: any): any {
    if (val === null || val === undefined || val === '') return '';
    const num = Number(val.toString().replace(/,/g, ''));
    if (Number.isNaN(num)) return val;
    return num.toLocaleString('ja-JP');
}

export function parseNumberCommas(val: any): any {
    if (val === null || val === undefined || val === '') return null;
    return parseFloat(val.replace(/,/g, ''));
}

export function convertBase64ToBlobData(base64Data: string, contentType: string = 'image/png', sliceSize = 512) {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

export function convertViToEn(str: any) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư

    return str.toUpperCase();
}

export function getYearsInit() {
    let namList = []
    let today = new Date();
    for (let index = today.getFullYear() + 1; index > today.getFullYear() - 6; index--) {
        namList.push(index);
    }
    return namList;
}
export function formatNumberPrice(number) {
    return number.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

var default_numbers=' hai ba bốn năm sáu bảy tám chín';
  
  var units=('1 một'+ default_numbers).split(' ');
  var ch= 'lẻ mười'+default_numbers;
  var tr='không một'+default_numbers;
  var tram=tr.split(' ');
  var u='2 nghìn triệu tỉ'.split(' ');
  var chuc=ch.split(' ');

  function tenth(a)
  {
    var sl1=units[a[1]] ;
    var sl2=chuc[a[0]];
    var append='';
    if(a[0]>0 && a[1]==5)
      sl1='lăm';
    if(a[0]>1)
    {
      append=' mươi';
      if(a[1]==1)
        sl1=' mốt'; 
    }
    var str=sl2+''+append+' '+sl1;
    return str;
  }

  /**
   * convert number in blocks of 3 
   * @param  {[type]} d [description]
   * @return {[type]}   [description]
   */
  function block_of_three(d)
  {
    let _a=d+'';
    if(d=='000')return '';
    switch(_a.length)
    {
      case 0:
      return '';

      case 1:
      return units[_a] ;

      case 2:
      return tenth(_a);

      case 3:
      let sl12='';
      if(_a.slice(1,3)!='00')
        sl12=tenth(_a.slice(1,3));
      let sl3=tram[_a[0]]+' trăm';
      return sl3+' '+sl12;
    }
  }

  export function to_vietnamese(str: any,currency) {
    var str: any = parseInt(str)+'';
    //str=fixCurrency(a,1000);
    var i=0;
    var arr=[];
    var index = str.length;
    var result=[]
    if(index==0||str=='NaN' )
      return '';
    var string='';

    //explode number string into blocks of 3numbers and push to queue
    while (index>=0) {
      arr.push(str.substring(index, Math.max(index-3,0)));
      index-=3;
    }
    
    //loop though queue and convert each block
    for(i=arr.length-1;i>=0;i--)
    {
        if(arr[i]!=''&&arr[i]!='000'){
        result.push(block_of_three(arr[i]))
        if(u[i])
          result.push(u[i]);
      }
    } 
    
    if(currency)
    result.push(currency)
    string=result.join(' ')
    //remove unwanted white space
    return string.replace(/[0-9]/g, '').replace(/  /g,' ').replace(/ $/,'');
     
  } 
