import { Pipe, PipeTransform } from '@angular/core';
import { ChucNangService } from '@app/shared/services/bcxn/chucnang.service';

/*
 * Usage:
 *   value | paren
 * Example:
 *   {{ 'foo' | paren }}
 *   formats to: '（foo）'
*/
@Pipe({
    name: 'NamebyId'
})
export class NamebyId implements PipeTransform {
    
    constructor(public chucNangService: ChucNangService
    ) {

    }
    
    transform(value: any,dsChucNang: any): any {

        if (value === '') {
            return '';
        }
        else{
            for(let item of dsChucNang){
                if(value == item.id){
                    return item.tieuDe;
                }
            }
        }
    }
}