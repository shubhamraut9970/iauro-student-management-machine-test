import { Component, Inject } from '@angular/core';
import { 
  MatDialogRef, 
  MAT_DIALOG_DATA, 
  MatDialogModule,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dailogs',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './dailogs.component.html',
  styleUrl: './dailogs.component.scss'
})
export class DailogsComponent {

   constructor(
    public dialogRef: MatDialogRef<DailogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { studentName: string }
  ) {}
}
