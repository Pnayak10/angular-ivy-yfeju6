import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hello',
  templateUrl: './hello.component.html',
  styles: [`h1 { font-family: Lato; },.dict-form-inner { display: flex;}`],
})
export class HelloComponent implements OnInit {
  // @Input() name: string;
  masterData: string[] = ['all'];
  filteredData: string[];

  constructor() {}

  ngOnInit() {}

  autoCorrectDictonaryWord(inputData) {
    this.filteredData = [];
    this.filteredData = this.masterData.filter((item) => {
      return (
        this.searchDataCase(inputData.toLowerCase(), item.toLowerCase()) ||
        this.serachDuplicateData(inputData.toLowerCase(), item.toLowerCase()) ||
        this.searchTransposeData(inputData.toLowerCase(), item.toLowerCase()) ||
        this.searchAndCorrectFirstLetter(
          inputData.toLowerCase(),
          item.toLowerCase()
        )
      );
    });
  }

  // The Below method is For these scenarios
  //   Auto Correct
  // Exercise 1: Check if a word exists
  // Write an Auto Correct checker that takes in a word and determines if the word exists in the
  // given dictionary. If the word exists, it should return the word. If the word doesn’t exist, it
  // should return nothing (eg: null, None, undefined).

  // Exercise 2: Correct case
  // Update the function to ignore any case change. This means that whether any letters are in
  // upper case or lower case it should return all matching words from the dictionary.
  // E.g.: “delhi” should auto correct to “Delhi”

  // Exercise 3: Correct punctuation
  // Update the function to identify any missing space or punctuation. If the input word is missing a
  // slash, dash, or apostrophe we should match and return all matching words from the dictionary.
  // E.g.: “cant” should auto correct to “can’t”

  searchDataCase(inputData, item): any {
    return (
      inputData.localeCompare(item, 'en', {
        sensitivity: 'base',
        ignorePunctuation: true,
      }) === 0
    );
  }

  // The Below method is For these scenarios

  // The Below method is For these scenarios

  //   Exercise 4: Correct duplicate letters
  // Occasionally we accidentally type the same letter multiple times. We should be able to
  // recognize that the user made a mistake and return all matching words from the dictionary.
  // E.g.: “aall” should auto correct to “all”
  // Exercise 5: Correct adjacent letters
  // Another common mistake we make is to type the letter horizontally adjacent to the letter we
  // intended to type. We should check if switching any letter for any horizontally adjacent letters
  // results in a word from the dictionary. If so, we should return all matching words from the
  // dictionary.
  // Eg. “felhi” should return “Delhi

  serachDuplicateData(inputData, item): any {
    const LetterBigramSplit1 = this.getLetterBigramSplit(inputData),
      LetterBigramSplit2 = this.getLetterBigramSplit(item);
    let similar = [];
    for (let i = 0; i < LetterBigramSplit1.length; i++) {
      if (LetterBigramSplit2.indexOf(LetterBigramSplit1[i]) > -1) {
        similar.push(LetterBigramSplit1[i]);
      }
    }
    return (
      similar.length /
        Math.max(LetterBigramSplit1.length, LetterBigramSplit2.length) >
      0.3
    );
  }

  // Transpose

  searchTransposeData(inputData, item): any {
    return (
      inputData.split('').sort().toLocaleString().replaceAll(',', '') ===
      item.split('').sort().toString().replaceAll(',', '')
    );
  }

  // 1st Letter
  searchAndCorrectFirstLetter(inputData, item) {
    return (
      inputData
        .split('')
        .slice(1)
        .sort()
        .toLocaleString()
        .replaceAll(',', '') ===
      item.split('').slice(1).sort().toString().replaceAll(',', '')
    );
  }

  getLetterBigramSplit(item) {
    let result = [];

    for (let i = 0; i < item.length - 1; i++) {
      result.push(item[i] + item[i + 1]);
      return result;
    }
  }
}
