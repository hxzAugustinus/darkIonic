import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';

/*
 Generated class for the AddItemPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    templateUrl: 'build/pages/add-item/add-item.html',
})
export class AddItemPage {
    static get parameters() {
        return [[ViewController]];
    }

    constructor(view) {
        this.view = view;
        var title = "";
        var description = "";
    }

    close() {
        this.view.dismiss();
    }

    saveItem() {
        let newItem = {
            title: this.title,
            description: this.description
        };
        this.view.dismiss(newItem);
    }
}
