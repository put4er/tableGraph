import {Component, OnInit} from '@angular/core';
import {TableInfoService} from '../../services/table-info.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data = [];
  chart: [];
  x = ['Сегодня', 'Вчера', 'Этот день неделю назад'];
  y = [];
  deleteRows = [];
  n = 0;
  t = 0;
  yest = 0;
  w = 0;
  tableInfo = [];
  tableFirInfo = true;
  tableSecInfo = false;
  tableThInfo = false;
  constructor(private tableData: TableInfoService ) {
  }

  ngOnInit() {
   this.ShowData();
  }

// таблиця
  ShowData() {
    this.tableData.getDataTable()
      .subscribe((data: any) => {
          this.y.push(data[0].today, data[0].yesterday, data[0].week);
          this.graph();
          this.chooseTable(data);
        },
        (error1 => console.log('Error server')));
  }

// графік
  graph() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.x,
        datasets: [
          {
            data: this.y,
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    });
  }

// видалення строки
  deleteRow(i) {
    this.deleteRows.push(this.data[i]);
    this.data.splice(i, 1);
  }

// обновити таблицю
  Refresh() {
    this.ShowData();
    this.deleteRows = [];
    this.n = this.t = this.yest = this.w = 0;
  }
// повернути строку
  pasteRows(row, i) {
    this.data.push(row);
    this.deleteRows.splice(i, 1);
    console.log(this.deleteRows);
  }

// сортування
  sort(x) {
    if (x === 'name') {
      if (this.n % 2 === 0) {
        this.data.sort((a, b) => a.name.localeCompare(b.name));
        this.n++;
      } else {
        this.data.sort((a, b) => b.name.localeCompare(a.name));
        this.n++;
      }
    }
    if (x === 'today') {
      if (this.t % 2 === 0) {
        this.data.sort((a, b) => b.today - a.today);
        this.t++;
      } else {
        this.data.sort((a, b) => a.today - b.today);
        this.t++;
      }
    }
    if (x === 'yesterday') {
      if (this.yest % 2 === 0) {
        this.data.sort((a, b) => b.yesterday - a.yesterday);
        this.yest++;
      } else {
        this.data.sort((a, b) => a.yesterday - b.yesterday);
        this.yest++;
      }
    }
    if (x === 'week') {
      if (this.w % 2 === 0) {
        this.data.sort((a, b) => b.week - a.week);
        this.w++;
      } else {
        this.data.sort((a, b) => a.week - b.week);
        this.w++;
      }
    }
    x = '';
    console.log(this.data);
  }
// вибір таблиці
  chooseTable(d) {
    if (this.tableFirInfo === true) {
      this.tableOne(d);
    } else {
      if (this.tableSecInfo === true) {
        this.tableSec(d);
      } else {
        if (this.tableThInfo === true) {
          this.tableTh(d);
        }
      }
    }
  }
// 1 таблиця
  tableOne(d) {
    this.tableInfo = d;
  }
// 2 таблиця
  tableSec(d) {
    this.tableInfo = [d[0], d[1], d[2]];
  }
// 3 таблиця
  tableTh(d) {
    this.tableInfo = [d[3], d[4], d[5]];
  }
}
