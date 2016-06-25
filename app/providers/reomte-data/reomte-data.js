import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ReomteData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ReomteData {
  static get parameters(){
    return [[Http]]
  }  

  constructor(http) {
    this.http = http;
    this.data = null;
  }

    load(val) {

     if(val=='refresh'){
         this.data=null;
     }

    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
     //   this.http.get('/zhihu'+'/4/news/latest')
       this.http.get('http://news-at.zhihu.com/api'+'/4/news/latest')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
    };

    getContent(id) {
        return new Promise(resolve => {
            //   this.http.get('/zhihu'+'/4/news/'+id)
            this.http.get('http://news-at.zhihu.com/api'+'/4/news/'+id)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
            });
        });
    };

    getPast(date) {
        return new Promise(resolve => {
            //  http://news.at.zhihu.com/api/4/news/before/20131119
            this.http.get('http://news.at.zhihu.com/api/4/news/before/'+date)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
            });
        });
    }

}

