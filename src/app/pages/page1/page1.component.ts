import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { DataService, Student } from 'src/app/core/services/data.service';

export class Item {
  constructor(public name: string, public nomer: number, public done: boolean, public data: Date, public cross: Array<string>) {

  }
}
@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  items: Item[] = [];
  students: Student[] = [];

  name = '';
  nomer = 0;
  done = false;
  data = new Date();
  cross=[]

  constructor(private dataService: DataService) {
    
  }

  ngOnInit(): void {
      this.dataService.getStudents()
      .pipe(
        filter(data => data != null),
        map((data => (data.map(student => ({...student, group: student.group + ' 1 курс'})))))
      )
      .subscribe((students) => {
          this.students = students;
      })

  }


  addItem() {
    this.items.push(new Item(this.name, this.nomer, this.done, this.data, this.cross));

  }

}
