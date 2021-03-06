import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  errorType: 'addBook' | 'editBook' | 'deleteBook';
}

@Component({
  selector: 'app-error-popup',
  template: `
    <div class="error-popup">
      <h1 mat-dialog-title>An error has occurred</h1>
      <div mat-dialog-content *ngIf="data.errorType === 'addBook'">
        Book could not be created.
      </div>
      <div mat-dialog-content *ngIf="data.errorType === 'editBook'">
        Book could not be edited.
      </div>
      <div mat-dialog-content *ngIf="data.errorType === 'deleteBook'">
        Book could not be deleted.
      </div>
      <div mat-dialog-actions>
        <button mat-button mat-dialog-close>Close</button>
      </div>
    </div>
  `,
  styleUrls: ['./error-popup.component.scss']
})
export class ErrorPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
  }

}
