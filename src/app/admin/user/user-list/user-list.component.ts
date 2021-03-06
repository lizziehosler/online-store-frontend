import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../common/user';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="title-group">
      <div class="title">Users</div>
      <button mat-raised-button color="primary" [routerLink]="['/users/new']">
        <mat-icon>add_box</mat-icon>
        ADD NEW USER
      </button>
    </div>

    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8 user-table">
      <!-- Id Column -->
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let user">{{user.id}}</td>
      </ng-container>

      <!-- First Name Column -->
      <ng-container matColumnDef="firstName">
        <th mat-header-cell *matHeaderCellDef>First Name</th>
        <td mat-cell *matCellDef="let user">{{user.firstName}}</td>
      </ng-container>

      <!-- Last Name Column -->
      <ng-container matColumnDef="lastName">
        <th mat-header-cell *matHeaderCellDef>Last Name</th>
        <td mat-cell *matCellDef="let user">{{user.lastName}}</td>
      </ng-container>

      <!-- Email Column -->
      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef>Email</th>
        <td mat-cell *matCellDef="let user">{{user.email}}</td>
      </ng-container>

      <!-- Role Column -->
      <ng-container matColumnDef="role">
        <th mat-header-cell *matHeaderCellDef>Role</th>
        <td mat-cell *matCellDef="let user">{{user.roles.name}}</td>
      </ng-container>

      Edit Column
      <ng-container matColumnDef="edit">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let user">
          <mat-icon (click)="routeToEditUser(user.id)" style="cursor:pointer;">edit</mat-icon>
        </td>
      </ng-container>


      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>

  `,
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'role', 'edit'];
  dataSource = new MatTableDataSource([]);
  users: User[];
  @ViewChild(MatTable) table: MatTable<User>;

  constructor(private userService: UserService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.listUsers();

  }

  listUsers() {
    this.userService.getUserList().subscribe(
      data => {
        this.users = data;
        this.dataSource.data = data;
      }
    );
  }

  routeToEditUser(id: number) {
    this.router.navigate([`/users/edit/${id}`]);
  }


}
