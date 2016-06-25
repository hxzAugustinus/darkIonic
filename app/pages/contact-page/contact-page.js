import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ReomteData} from '../../providers/reomte-data/reomte-data';
import {ItemContentPage} from '../item-content/item-content'
import {DomSanitizationService} from '@angular/platform-browser';
import {datePipe } from '../../Pipes/dateFormat.pipe'

@Component({
    templateUrl: 'build/pages/contact-page/contact-page.html',
    pipes:[datePipe]
})
export class ContactPage {
    static get parameters() {
        return [[NavController], [ReomteData], [DomSanitizationService]];
    }

    changeImg(arr, sanitizer) {
        arr.forEach((data)=> {
            if (data.image) {
                data.image = sanitizer.bypassSecurityTrustStyle('url(' + data.image + ')');
            }
        });
        return arr;
    }

    constructor(_navController, service, sanitizer) {
        this._navControler = _navController;
        this._service = service;
        this._sanitizer = sanitizer;
        this.time = new Date();
        this.past=[];
        service.load().then((data)=> {
            if (data && data.top_stories) {
                this.tops = this.changeImg(data.top_stories, sanitizer);
            }
            if (data && data.stories) {
                this.list = data.stories;
            }
            // console.log(data);
        })
    };

    doRefresh(refresh) {
        setTimeout(()=> {
            this._service.load('refresh').then((data)=> {
                if (data && data.top_stories) {
                    this.tops = this.changeImg(data.top_stories, this._sanitizer);
                }
                if (data && data.stories) {
                    this.list = data.stories;
                }
            });
            refresh.complete();
        }, 2000);
    };

    AddDays(date, value) {
        date.setDate(date.getDate() + value);
        return date;
    }

    DateFormat(date){
        var res='';
        var year=date.getFullYear();
        var Month=date.getMonth()+1;
        var day=date.getDate()+1;
        if(Month<10){
            Month='0'+Month;
        }
        if(day<10){
            day='0'+day;
        }
        res=''+year+Month+day;
        return res;
    }



    loadMore(infinite) {
        setTimeout(()=>{
            this.time = this.AddDays(this.time, -1);
            var pastTime=this.DateFormat(this.time);
            console.log(pastTime);
            this._service.getPast(pastTime).then((data)=> {
                console.log(data);

                if(!!data){
                    this.past.push(data);
                }
                infinite.complete();
            });
        },2000);
    }

    toContent(id) {
        this._navControler.push(ItemContentPage, {id: id});
    };
}
