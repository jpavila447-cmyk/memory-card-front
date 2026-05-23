import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-passwords',
  templateUrl: './admin-passwords.component.html',
  styleUrls: ['./admin-passwords.component.scss']
})
export class AdminPasswordsComponent {
formUsers: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
this.http.get<any>(
  'http://localhost:3000/admin/passwords?secret=MY_SECRET_KEY_123'
)
.subscribe(data => {
  this.formUsers = data;
});
  }
}
