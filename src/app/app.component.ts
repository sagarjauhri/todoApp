import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';

export interface TodoModel {
  name: string;
  id: number;
  isMarked: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title = 'todo App';
  public list: TodoModel[] = [];
  public selectForEdit: string = '';
  public isAlert: boolean = false;
  public isEditable: boolean = false;

  public toBeEdit: TodoModel;

  constructor(private _todoService: TodoService) { }

  ngOnInit() {
    this.getTodoList();
  }

  // to get list from the server
  public getTodoList() {
    this._todoService.getTodoItems().subscribe(
      (res: TodoModel[]) => {
        this.list = res;
      }
    )
  }

  // adding the todo items in the list
  public onAddItem(itemName: string) {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].name.toLowerCase() === itemName.toLowerCase()) {
        this.isAlert = true;
        this.toDisableAlert();
        return;
      }
    }
    this.list.push({ id: this.list.length + 1, name: itemName, isMarked: false });
    this.isAlert = false;
    this.onCloseEditBtn();
  }

  // delete item from the item list
  public onDeleteItem(index: number) {
    this.list.splice(index, 1);
  }

  // prepare variables for edit item
  public onSelectItemToEdit(item: TodoModel) {
    this.isEditable = true;
    this.selectForEdit = item.name;
    this.toBeEdit = item;
  }

  // edit specific item from the list
  public onEditItem(editedName: string, id: number) {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].id == id) {
        this.list[i] = { id: id, name: editedName, isMarked: this.toBeEdit.isMarked };
      }
    }
    this.onCloseEditBtn();
  }

  // button to close Edit button and then toggle to add button
  public onCloseEditBtn() {
    this.isEditable = false;
    this.toBeEdit = null;
    this.selectForEdit = '';
  }

  // to disable error message after 2seconds.
  public toDisableAlert() {
    setTimeout(() => {
      this.isAlert = false;
    }, 2000)
  }

  // on select as mark
  public onMark(item: TodoModel) {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].id == item.id) {
        this.list[i] = { id: item.id, name: item.name, isMarked: true };
      }
    }
  }
}
