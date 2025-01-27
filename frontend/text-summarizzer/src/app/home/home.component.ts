import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SummaryService } from '../service/summary.service';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,NgIf,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  text!: string;
  summary!: string;
  constructor(private summaryService:SummaryService){  }
  submit(form:NgForm){
    this.summaryService.summarizeText(this.text).subscribe((data: any) => {
      this.summary = JSON.stringify(data); // Store the summary response
      console.log(data);
    });
  }
  reset(){
    this.text = '';
    this.summary = '';
  }
}
