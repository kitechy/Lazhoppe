import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;

  showModal = false;
  loading = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;

    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users.filter((user) => user.role !== 'admin');
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  viewUser(user: User) {
    this.selectedUser = user;
    this.showModal = true;
  }

  closeModal() {
    this.selectedUser = null;
    this.showModal = false;
  }

  toggleStatus(user: User) {
    this.userService.updateStatus(user._id, !user.isActive).subscribe({
      next: () => {
        user.isActive = !user.isActive;
        this.closeModal();
      },
      error: (err) => {
        console.error(err);
        alert(err.error.message);
      },
    });
  }
}
