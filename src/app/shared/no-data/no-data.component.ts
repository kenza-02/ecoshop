import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.css']
})
export class NoDataComponent implements OnInit {
  @Input() img:any;
  @Input('img') set myimg($img:any){
    this.img=$img;
  }
  @Input() text1:any;
  @Input('text1') set mytext1($text1:any){
    this.text1=$text1;
  }
  @Input() text2:any;
  @Input('text2') set mytext2($text2:any){
    this.text2=$text2;
  }

  constructor() { }

  ngOnInit() {
  }

}
