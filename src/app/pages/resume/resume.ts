import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resume',
  imports: [],
  templateUrl: './resume.html',
  styleUrl: './resume.css',
})
export class Resume implements OnInit {

  public text: string; 

  constructor() {
    this.text = 'Hello, world!';
   }

  ngOnInit(): void {

  }

}
