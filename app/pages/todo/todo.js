import {Component} from '@angular/core';
import {NavController,Modal} from 'ionic-angular';
import {AddItemPage} from '../add-item/add-item';
import {ItemDetailPage} from '../item-detail/item-detail';

/*
 Generated class for the TodoPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    templateUrl: 'build/pages/todo/todo.html'
})
export class TodoPage {
    static get parameters() {
        return [[NavController]];
    }

    constructor(nav) {
        this.nav = nav;
        this.items = [
            {title: 'hi1', description: 'test1'},
            {title: 'hi2', description: 'test2'},
            {title: 'hi3', description: 'test3'}
        ];
    }

    ionViewWillEnter(){
        console.log(123);
    }

    addItem(){
        let modal=Modal.create(AddItemPage);
        this.nav.present(modal);
        modal.onDismiss((item)=>{
            if(item){
                this.items.push(item);
            }
        })
    }

    toItem(item){
        this.nav.push(ItemDetailPage,{item:item})

    }

}
