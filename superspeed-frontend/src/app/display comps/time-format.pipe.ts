import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})

/** written by Tobias Sprecher */
export class TimeFormatPipe implements PipeTransform {
  //this pipe just transforms an amount of milliseconds into a formatted time with the format hh.MM.SS.ssss --s being milliseconds
  transform(milliseconds:number): string {
    //padStart ensures that the string has the set ammount of letters, if not it fills them with the set char
    let actualMilliseconds = (milliseconds%1000).toString().padStart(3,'0');
    let seconds = Math.floor((milliseconds/1000)%60).toString().padStart(2, '0') ;
    let minutes = Math.floor((milliseconds/1000/60)%60).toString().padStart(2, '0');
    let houres = Math.floor((milliseconds/1000/60/60));

    return houres + "." + minutes + "." + seconds + "." + actualMilliseconds;
  }

}
