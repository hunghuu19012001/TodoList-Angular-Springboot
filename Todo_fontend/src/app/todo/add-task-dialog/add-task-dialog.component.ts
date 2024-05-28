import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent {
  title: string = '';
  description: string = '';
  status: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{title: string, description: string, status: string, isEdit:boolean}
  ){

    if (data && data.isEdit) {
      this.title = data.title;
      this.description = data.description;
      this.status = data.status ;
  }}

  onCancelClick(): void {
    this.dialogRef.close();

  }

  // onAddClick(): void {
  //   this.dialogRef.close(this.title);
  // }
  onSaveClick(): void {
    if (this.title.trim() && this.description.trim()) {
      this.dialogRef.close({ title: this.title.trim(), description: this.description.trim(), status: this.status} );
    }

  }
}
