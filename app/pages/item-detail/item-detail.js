import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';

/*
 Generated class for the ItemDetailPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    templateUrl: 'build/pages/item-detail/item-detail.html',
})
export class ItemDetailPage {
    static get parameters() {
        return [[NavController],[NavParams]];
    }

    constructor(nav, navParams) {
        this.nav = nav;
        this.title = navParams.get('item').title;
        this.description = navParams.get('item').description;
    }
}
