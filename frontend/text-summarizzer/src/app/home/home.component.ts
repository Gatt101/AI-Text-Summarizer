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
  text: string = '';
  summary: string = '';
  isLoading: boolean = false;
  wordCount: number = 0;
  charCount: number = 0;

  constructor(private summaryService: SummaryService) {}

  updateCounts() {
    this.charCount = this.text.length;
    this.wordCount = this.text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  submit(form: NgForm) {
    if (!this.text.trim()) return;
    
    this.isLoading = true;

    this.summaryService.summarizeText(this.text).subscribe({
      next: (response: { summary: string }) => {
        if (!response.summary.includes("CNN.com will feature iReporter photos")) {
          this.summary = response.summary;
        }
        this.isLoading = false; 
      },
      error: (error) => {
        console.error('Error summarizing text:', error);
        alert('An error occurred while summarizing the text. Please try again.');
        this.isLoading = false;
      },
    });
  }

  reset() {
    this.text = '';
    this.summary = '';
    this.isLoading = false;
    this.updateCounts();
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here if you want
      alert('Summary copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy to clipboard');
    });
  }
}