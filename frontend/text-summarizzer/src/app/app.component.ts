import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SummaryService } from './service/summary.service';
import {NgxRetroGridComponent} from "@omnedia/ngx-retro-grid";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,NgxRetroGridComponent],
  providers: [SummaryService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'text-summarizzer';
}
