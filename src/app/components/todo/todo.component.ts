import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { taskType } from 'src/app/model/task';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  taskInput !: FormGroup;
  todoTask :taskType[]= [];
  todoInProgress :taskType[]= [];
  todoDone :taskType[]= [];
  updatedID !: any;
  isEdited : boolean = false;

  constructor(private fb: FormBuilder, private toast: ToastrService) { }

  ngOnInit(): void {
    this.taskInput = this.fb.group({
      taskName :['', Validators.required]
    })
  }

  /**
   * @description add task to the todoTask
   */
  addTask(){
    this.todoTask.push({
      description:this.taskInput.value.taskName,
      status: false
    });
    this.taskInput.reset()
    this.toast.success('task added')

  }

  updateTask(){
    this.todoTask[this.updatedID].description = this.taskInput.value.taskName;
    this.todoTask[this.updatedID].status = false;
    this.isEdited =false;
     this.taskInput.reset();
     this.updatedID = undefined;
    this.toast.success('task updated')
  }

/**
 * @description
 */
  deleteTask(index: number){
    this.todoTask.splice(index, 1);
    this.toast.error('task deleted')
  }

  /**
   * @description delete the task form in progress
   * @param index 
   */
   deleteTaskInProgess(index: number){
    this.todoInProgress.splice(index, 1);
    this.toast.error('task deleted')

  }

  /**
   * @description delete the task from done
   * @param index 
   */
    deleteTaskDone(index: number){
    this.todoInProgress.splice(index, 1);
    this.toast.error('task deleted')

  }

  /**
   * @description edit the task
   * @param item 
   * @param index 
   */
  editTask(item: taskType,index:number){
    this.taskInput.controls['taskName'].setValue(item.description);
    this.updatedID = index;
    this.isEdited = true;
  }

  /**
   * 
   * @param event /
   */
  drop(event: CdkDragDrop<taskType[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
