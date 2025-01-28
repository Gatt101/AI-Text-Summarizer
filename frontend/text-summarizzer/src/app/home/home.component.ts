import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SummaryService } from '../service/summary.service';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgIf, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  text!: string;
  summary!: string;
  isLoading: boolean = false;

  constructor(private summaryService: SummaryService) {}

  submit(form: NgForm) {
    this.isLoading = true; // Start loading

    this.summaryService.summarizeText(this.text).subscribe({
      next: (response: { summary: string }) => {
        // Filter out unwanted messages
        if (!response.summary.includes("CNN.com will feature iReporter photos")) {
          this.summary = response.summary;
        }
        this.isLoading = false; 
      },
      error: (error) => {
        console.error('Error summarizing text:', error);
        alert('An error occurred while summarizing the text. Please try again.');
        this.isLoading = false; // Stop loading on error
      },
    });
  }

  reset() {
    this.text = '';
    this.summary = '';
    this.isLoading = false; // Reset loading status
  }
}