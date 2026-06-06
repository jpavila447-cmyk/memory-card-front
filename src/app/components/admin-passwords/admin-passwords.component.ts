import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-passwords',
  templateUrl: './admin-passwords.component.html',
  styleUrls: ['./admin-passwords.component.scss']
})
export class AdminPasswordsComponent {
formUsers: any;
private route = environment.socketUrl

  constructor(private http: HttpClient) {}

  ngOnInit() {
this.http.get<any>(
  `${this.route}/admin/passwords?secret=MY_SECRET_KEY_123`
)
.subscribe(data => {
  this.formUsers = data;
});
  }
}
