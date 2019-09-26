/**
 * Example Spinner w/ Percentage in Center
 * 2019.09.26
 * 
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'project-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  static readonly MAX_INTERVAL = 100; // 100 milliseconds

  static readonly PERCENT_COMPLETE = 66; // The percentage complete, eg 66%. But it must be an integer here.

  color = 'accent';
  
  mode = 'determinate';
  
  midPoint: number;
  
  smoothing: number;
  
  spinnerDisplayValue: number;
  
  timer: number;

  /**
   * Default Constructor.
   */
  constructor() {
    this.spinnerDisplayValue = 0;
    this.timer = 1;
  }

  ngOnInit() {
    this.initSpinner();
    this.fillSpinner();
  }

  /**
   * Selects the Mat-Spinner Mode
   *
   * Shows a indeterminate spinner if no percent completion value exists, else
   * the default determinate spinner is shown.
   */
  private initSpinner() {
    const complete: number = 77; // Change this Number.
    if (complete < 0 || complete > 100) {
      this.mode = 'indeterminate';
    }

    this.midPoint = -complete / 1.5;
    this.smoothing = 100 / complete;
  }

  /**
   * Animates the Spinner up the Mission Completion Value
   */
  private fillSpinner(): void {
    const interval = setTimeout(() => {
      if (this.spinnerDisplayValue < OverviewComponent.PERCENT_COMPLETE) {
        this.spinnerDisplayValue += 1;
        this.timer = OverviewComponent.MAX_INTERVAL / (1 + Math.exp(-(this.spinnerDisplayValue + this.midPoint)));
        this.fillSpinner();
      }
    }, this.timer);
  }
}
