import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentencecase'
})
export class SentenceCasePipe implements PipeTransform {

  transform(sentence: string): string {
    if(typeof sentence !== 'undefined') {
      return sentence.charAt(0).toUpperCase() + sentence.slice(1);
    } else {
      return null;
    }
  }

}
