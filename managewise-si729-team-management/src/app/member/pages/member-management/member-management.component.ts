import { Component,inject } from '@angular/core';

import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { UsersService } from "../../services/users.service";
import { User } from "../../model/user.entity";
import { MemberCreateAndEditComponent } from "../../components/member-create-and-edit/member-create-and-edit.component";
import { NgClass } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import {Team} from "../../model/team.entity";
import {TeamsService} from "../../services/teams.service";

import { MatDialog } from "@angular/material/dialog";

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatButton} from "@angular/material/button";


@Component({
  selector: 'app-member-management',
  standalone: true,
  imports: [MatPaginator, MatProgressSpinnerModule, MatSort, MatIconModule, MemberCreateAndEditComponent, MatTableModule, NgClass, TranslateModule, MatButton],
  templateUrl: './member-management.component.html',
  styleUrl: './member-management.component.css'
})
export class MemberManagementComponent implements OnInit, AfterViewInit{
  // Attributes
  userData: User;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['image','id', 'name', 'address','role', 'progress'];
  isEditMode: boolean;
  teamsData!: Array<Team>;

  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;

  private teamsService: TeamsService = inject(TeamsService);
  private matDialog: MatDialog = inject(MatDialog);

  // Constructor
  constructor(private studentService: UsersService) {
    this.isEditMode = false;
    this.userData = {} as User;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.userData = {} as User;
  }

  // CRUD Actions

  private getAllSubResources(): void {
    this.teamsService.getAll()
      .subscribe((response: any) => {
        this.teamsData = response;
      });
  };

  private getAllStudents(): void {
    this.studentService.getAll()
      .subscribe((response: any) => {
        this.dataSource.data = response;
      });
  };

  private createStudent(): void {
    this.studentService.create(this.userData)
      .subscribe((response: any) => {
        this.dataSource.data.push({...response});
        // Actualiza el dataSource.data con los students actuales, para que Angular detecte el cambio y actualice la vista.
        this.dataSource.data = this.dataSource.data
          .map((student: User) => {
            return student;
          });
      });
  };

  private updateStudent(): void {
    let studentToUpdate: User = this.userData;
    this.studentService.update(this.userData.id, studentToUpdate)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data
          .map((student: User) => {
            if (student.id === response.id) {
              return response;
            }
            return student;
          });
      });
  };

  private deleteStudent(studentId: number): void {
    this.studentService.delete(studentId)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data
          .filter((student: User) => {
            return student.id !== studentId ? student : false;
          });
      });
  };

  // UI Event Handlers

  onEditItem(element: User) {
    this.isEditMode = true;
    this.userData = element;
  }

  onDeleteItem(element: User) {
    this.deleteStudent(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllStudents();
  }

  onStudentAdded(element: User) {
    this.userData = element;
    this.createStudent();
    this.resetEditState();
  }

  onStudentUpdated(element: User) {
    this.userData = element;
    this.updateStudent();
    this.resetEditState();
  }

  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllStudents();
    this.getAllSubResources()
  }










}
