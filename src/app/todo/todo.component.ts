import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { ITask } from '../itask';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  constructor(private firestore: Firestore) {}
  todoData!: Observable<any>;

  ngOnInit(): void {
    this.getData();
  }

  onClick(form: NgForm) {
    const collectionInstance = collection(this.firestore, 'todos');
    const task: ITask = {
      title: form.value.task,
      isDone: false,
    };

    addDoc(collectionInstance, task)
      .then((response) => {
        console.log(response);
        form.reset();
      })
      .catch((err) => alert(err.message));
  }

  getData() {
    const collectionInstance = collection(this.firestore, 'todos');
    collectionData(collectionInstance, { idField: 'id' }).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        alert(error.message);
      }
    );
    this.todoData = collectionData(collectionInstance, { idField: 'id' });
  }

  onCheck(id: string, status: boolean) {
    const docInstance = doc(this.firestore, 'todos', id);
    const updateData = {
      isDone: status,
    };
    updateDoc(docInstance, updateData)
      .then((response) => console.log(response))
      .catch((err) => alert(err.message));
  }

  deleteTodo(id: string) {
    const docInstance = doc(this.firestore, 'todos', id);
    deleteDoc(docInstance)
      .then((response) => console.log(response))
      .catch((err) => alert(err.message));
  }
}
