import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseClass } from '@app/base-class';
import { Observable } from 'rxjs';
import { DialogAddDonViComponent } from '../../danhmucdonvi/dialog-add-donvi/dialog-add-donvi.component';
import { map, startWith } from 'rxjs/operators';
import { YeuCauBaoGiaService } from '@app/shared/services/bcxn/yeucaubaogia.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { UserService } from '@app/shared/services/bcxn/user.service';
import { ChucNangService } from '@app/shared/services/bcxn/chucnang.service';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
export interface Ncc {
    userName: any;
    id: any;
}
@Component({
    selector: 'app-dialog-add-nhomquyen',
    templateUrl: './dialog-add-nhomquyen.component.html',
    styleUrls: ['./dialog-add-nhomquyen.component.scss'],
})
export class DialogAddNhomQuyenComponent extends BaseClass implements OnInit {
    formControl: FormGroup;
    temp: any = [{
        id: 1,
        name: 'Thẩm định'
    },
    {
        id: 2,
        name: 'Nhà cung cấp'

    }]
    dataNhomQuyen: any
    //chip
    public allNcc: Ncc[] = [];
    public chipSelectedNcc: Ncc[] = [];
    public filteredNcc: Observable<String[]>;
    private allowFreeTextAddNcc = false;
    public nccControl = new FormControl();
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    @ViewChild('nccInput') nccInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    dsNcc: any;
    //tree
    newItemName = '';
    dsRole: any;
    dsUser: any;
    dsChucNang: any = [];
    dsChucNangNhomQuyen: any = [];
    dsNhomQuyenSelected: any = [];
    isRequiredOk: boolean;
    @ViewChild('treeview')
    tree: TreeViewComponent;
    chucNang: any = [
    ];
    field: any = { dataSource: this.chucNang, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
    showCheckBox: boolean = true;
    checkedNodes: any = [];
    dataDonViTheoNhomQuyen: any = [];
    listChucNang: any = [];
    nodeChecked(args): void {
        this.dsNhomQuyenSelected = [];
        this.tree.checkedNodes.forEach(item => {
            this.dsNhomQuyenSelected.push(this.chucNang.find(item2 => item2.id == item));
        })

    }

    constructor(private formBuilder: FormBuilder, public dialog: MatDialog, public chucNangService: ChucNangService, private userService: UserService, private yeuCauBaoGiaService: YeuCauBaoGiaService, public dialogRef: MatDialogRef<DialogAddDonViComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        super()
    }

    ngOnInit(): void {
        this.getUser();
        this.getChucNangAll();
        this.formControl = this.formBuilder.group({
            tenNhom: ['', [Validators.required, Validators.minLength(4)]],
            moTa: [''],
            sdt: [''],
            chucNangDefault: ['', [Validators.required]]
        });
    }
    getUser() {
        this.userService.getUser().pipe(this.unsubsribeOnDestroy).subscribe(next => {
            this.dsUser = next;
            for (let item of this.dsUser) {
                if (!item.applicationRoleId || item.applicationRoleId == this.data.item.id) {
                    this.allNcc.push(item);
                }
                if (this.data.item.id && item.applicationRoleId == this.data.item.id) {
                    this.chipSelectedNcc.push(item);
                }
            }
            this.filteredNcc = this.nccControl.valueChanges.pipe(
                startWith(null),
                map(nccName => this.filterOnValueChange(nccName))
            );
        })
    }
    getChucNangAll() {
        this.checkedNodes = [];

        this.chucNangService.getAllChucNang().pipe(this.unsubsribeOnDestroy).subscribe(next => {
            this.chucNang = next.data.map(item => {
                if (item.chucNangChaId) {
                    return {
                        id: item.id,
                        pid: item.chucNangChaId,
                        name: item.tieuDe,
                        linkUrl: item.linkUrl,
                        hasChild: next.data.find(item2 => item2.chucNangChaId == item.id) ? true : false
                    }
                } else {
                    return {
                        id: item.id,
                        // pid: item.chucNangChaId,
                        name: item.tieuDe,
                        linkUrl: item.linkUrl,
                        hasChild: next.data.find(item2 => item2.chucNangChaId == item.id) ? true : false
                    }
                }

            });
            this.getChucNang();
        })
    }
    getChucNang() {
        let idNhomQuyen = this.data.item.id ? this.data.item.id : -1;

        this.chucNangService.getChucNangAll(idNhomQuyen).pipe(this.unsubsribeOnDestroy).subscribe(next => {
            // this.checkedNodes = next.map(item => {
            //     return item.id.toString();
            // });
            if (this.data.item.id) {
                this.chucNang.forEach(element => {
                    if (element.hasChild) {
                        if (this.chucNang.filter(item => item.pid == element.id).length == next.filter(item => item.pid == element.id).length) {
                            element.isChecked = true
                        }
                    } else {
                        if (next.find(item2 => item2.id == element.id)) {
                            element.isChecked = true
                        }
                    }
                });
                this.chucNang.forEach(element => {
                    if (element.isChecked) {
                        this.tree.checkedNodes.push(element.id);
                        this.checkedNodes.push(element.id);
                    }
                });
                this.tree.checkedNodes = this.checkedNodes;
                this.dsNhomQuyenSelected = [];
                this.tree.checkedNodes.forEach(item => {
                    this.dsNhomQuyenSelected.push(this.chucNang.find(item2 => item2.id == item));
                })

                // if (this.data.item.id) {

                //     this.chucNang.forEach(item => {
                //         if (this.checkedNodes.find(item2 => item2 == item.id)) {
                //             item.isChecked = true
                //         }
                //     })
                // }
            }
            this.field = { dataSource: this.chucNang, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' }
            // this._database.getChucNang(this.dsChucNangNhomQuyen);

        })
    }

    //chip
    public removeDonVi(ncc: Ncc): void {
        const index = this.chipSelectedNcc.indexOf(ncc);
        if (index >= 0) {
            this.chipSelectedNcc.splice(index, 1);
            this.resetInputs();
        }
    }
    public nccSelected(event: MatAutocompleteSelectedEvent): void {
        this.selectNccByName(event.option.value);
        this.resetInputs();
    }
    private resetInputs() {
        this.nccInput.nativeElement.value = '';
        this.nccControl.setValue(null);
    }
    private filterOnValueChange(nccName: string | null): String[] {
        let result: String[] = [];
        let allNccLessSelected = this.allNcc.filter(ncc => this.chipSelectedNcc.indexOf(ncc) < 0);
        if (nccName) {
            result = this.filterNCc(allNccLessSelected, nccName);
        } else {
            result = allNccLessSelected.map(ncc => ncc.userName);
        }
        return result;
    }
    private filterNCc(nccList: Ncc[], nccName: String): String[] {
        let filteredNccList: Ncc[] = [];
        const filterValue = nccName.toLowerCase();
        let nccsMatchingNccName = nccList.filter(ncc => ncc.userName.toLowerCase().indexOf(filterValue) === 0);
        if (nccsMatchingNccName.length || this.allowFreeTextAddNcc) {
            filteredNccList = nccsMatchingNccName;
        } else {
            filteredNccList = nccList;
        }
        return filteredNccList.map(ncc => ncc.userName);
    }
    private selectNccByName(nccName) {
        let foundNcc = this.allNcc.filter(ncc => ncc.userName == nccName);
        if (foundNcc.length) {
            this.chipSelectedNcc.push(foundNcc[0]);
        } else {
            let highestEmployeeId = Math.max(...this.chipSelectedNcc.map(ncc => ncc.id), 0);
            this.chipSelectedNcc.push({ userName: nccName, id: highestEmployeeId + 1 });
        }
    }
    // convertDataChucNang() {
    //     let temp = []
    //     for (let item1 of this.dsNhomQuyen) {
    //         let isContain = false
    //         for (let item2 of this.dsChucNang) {
    //             if (item1.item == item2.id) {
    //                 isContain = true
    //             }
    //             if (isContain) {
    //                 temp.push(item2)
    //                 break
    //             }
    //         }
    //     }
    //     this.dsNhomQuyenSelected = temp
    // }
    get f() {
        return this.formControl.controls;
    }
    save() {
        this.data.item.dsChucNang = [];
        this.isRequiredOk = false
        // this.convertDataChucNang()
        this.data.item.dsDonVi = this.chipSelectedNcc;
        this.tree.checkedNodes.forEach(item => {
            let itemChucNang = this.chucNang.find(item2 => item2.id == item);
            if (itemChucNang.pid && !this.tree.checkedNodes.find(item3 => item3 == itemChucNang.pid)) {
                this.tree.checkedNodes.push(itemChucNang.pid);
            }
        })

        this.tree.checkedNodes.forEach(element => {
            this.data.item.dsChucNang.push(parseInt(element));
        });

        this.formControl.markAllAsTouched();

        if (this.formControl.invalid) {
            return;
        } else {
            this.data.item = this.formControl.value

            this.dialogRef.close(true);
        }
    }
    getNameById(id: any) {
        let name: any = (this.dsChucNang && this.dsChucNang.find(item => item.id == id)) ? this.dsChucNang.find(item => item.id == id).tieuDe : null;
        return name;
    }
}
