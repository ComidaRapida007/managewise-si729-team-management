import { Component } from '@angular/core';

import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { User } from "../../model/user.entity";
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from '@angular/material/select';
import {Team} from "../../model/team.entity";

import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-member-create-and-edit',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule,MatSelectModule,TranslateModule],
  templateUrl: './member-create-and-edit.component.html',
  styleUrl: './member-create-and-edit.component.css'
})
export class MemberCreateAndEditComponent {
  // Attributes
  @Input() user: User;
  @Input() teams!: Array<Team>;

  @Input() editMode: boolean = false;
  @Output() userAdded: EventEmitter<User> = new EventEmitter<User>();
  @Output() userUpdated: EventEmitter<User> = new EventEmitter<User>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('studentForm', {static: false}) studentForm!: NgForm;

  // Methods
  constructor() {
    this.user = {} as User;
  }

  // Private methods
  private resetEditState(): void {
    this.user = {} as User;
    this.editMode = false;
    this.studentForm.resetForm();
  }

  // Event Handlers

  onSubmit(): void {
    if (this.studentForm.form.valid) {
      let emitter: EventEmitter<User> = this.editMode ? this.userUpdated : this.userAdded;
      emitter.emit(this.user);
      this.resetEditState();
    } else {
      console.error('Invalid data in form');
    }
  }

  onCancel(): void {
    this.editCanceled.emit();
    this.resetEditState();
  }

}
