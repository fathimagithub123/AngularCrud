
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { employeeModel } from '../employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  allEmployee: employeeModel[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee(): void {
    this.api.getAllEmployeeAPI().subscribe(
      (result: employeeModel[]) => {
        this.allEmployee = result.filter((employee: employeeModel) => employee.id !== "1");
        console.log(this.allEmployee);
      },
      error => {
        console.error('Error fetching employee list:', error);
      }
    );
  }

  deleteEmployee(id: any): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.api.removeEmployeeAPI(id).subscribe(
        () => {
          alert('Employee deleted successfully');
          this.getAllEmployee(); 
        },
        error => {
          console.error('Error deleting employee:', error);
        }
      );
    }
  }
}
