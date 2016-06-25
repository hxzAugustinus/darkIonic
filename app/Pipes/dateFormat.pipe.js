/**
 * Created by Administrator on 2016/6/24 0024.
 */
import {Pipe,PipeTransform} from '@angular/core';

@Pipe({name: 'dateFormat'})
export class  datePipe {
    transform(value) {
        if (value.length == 8) {
            var str = value.substr(4, 2) + '月' + value.substr(6, 2) + '日';
            var date = value.substr(0, 4) + '/' + value.substr(4, 2) + '/' + value.substr(6, 2);
            var time = new Date(date);

            var weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

            var day = weekdays[time.getDay()];

            return str + '   ' + day;
        } else {
            return value;
        }
    }
}