import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import {ReomteData} from '../../providers/reomte-data/reomte-data'

/*
 Generated class for the ItemContentPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    templateUrl: 'build/pages/item-content/item-content.html'
})
export class ItemContentPage {
    static get parameters() {
        return [[NavController], [NavParams], [ReomteData]];
    }

    constructor(nav, params, service) {
        this.nav = nav;
        this.id = params.get('id');
        service.getContent(this.id).then((data)=> {
            console.log(data);
            this.content = this.addImg(data).body;
        })
    }

    addImg(data) {
        var i = data.body.indexOf('img-place-holder');
        var str = '<img  src="' + data.image + '"   style="width: 100%;height: 200px;"         />';

        data.body = this.insertArr(data.body, str, i + 18);
        console.log(data.body);
        return data;
    }

    insertArr(str, flag, sn) {
        var tmp1 = str.substring(0, sn);
        var tmp2 = str.substring(sn, str.length);
        return tmp1 + flag + tmp2;
    }
}
