import { Component, OnInit } from '@angular/core';
import {HomeComponent} from '../../pages/home/home.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private comp: HomeComponent) { }

  ngOnInit() {
  }
  showTableOne() {
    this.comp.tableFirInfo = true;
    this.comp.tableSecInfo = false;
    this.comp.tableThInfo = false;
    this.comp.ShowData();
  }
  showTableSec() {
    this.comp.tableFirInfo = false;
    this.comp.tableSecInfo = true;
    this.comp.tableThInfo = false;
    this.comp.ShowData();
  }
  showTableTh() {
    this.comp.tableFirInfo = false;
    this.comp.tableSecInfo = false;
    this.comp.tableThInfo = true;
    this.comp.ShowData();
  }
}
