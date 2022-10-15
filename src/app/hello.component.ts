import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hello',
  templateUrl: './hello.component.html',
  styles: [`h1 { font-family: Lato; }`],
})
export class HelloComponent implements OnInit {
  // @Input() name: string;
  masterData: string[];
  filteredData: string[];

  constructor() {}

  ngOnInit() {}

  autoCorrectDictonaryWord(inputData) {
    this.filteredData = this.masterData.filter((item) => {
      return (
        this.searchDataCase(inputData.toLowerCase(), item.toLowerCase()) ||
        this.serachDuplicateData(inputData.toLowerCase(), item.toLowerCase()) ||
        this.searchTransposeData(inputData.toLowerCase(), item.toLowerCase())
      );
    });
  }

  searchDataCase(inputData, item): any {
    return inputData.localeCompare(item, 'en', {
      sensitivity: 'base',
      ignorePunctuation: true,
    });
  }

  serachDuplicateData(inputData, item): any {
    const LetterBigramSplit1 = getBigram(word),
          LetterBigramSplit2 = getBigram(word2);
    let similar = [];
    // for (let i = 0; i < bigraml. length; i++) { if (bigram2.indexOf(bigraml[i]) > -1) {
    // similar.push(bigraml[i]);
    // return similar. length / Math.max(bigraml. length, bigram2. length);
  }

  searchTransposeData(inputData, item): any {
    return (
      inputData.split('').sort().toLocaleString().replaceAll(',', '') ===
      item.split('').sort().toString().replaceAll(',', '')
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
