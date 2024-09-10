import { Component } from '@angular/core';
import { TutorialService } from './tutorial.service';
import { Tutorial } from './tutorial.model';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrl: './tutorial.component.css'
})
export class TutorialComponent {
model= new Tutorial();
addTutorial() {
  console.log(this.model)

  if (!this.model.id){
    console.log(this.model.id)
    console.log(!this.model.id)

    this.tutorialService.create(this.model)
      .subscribe(tutorials => {
        this.model = tutorials;
        this.getAll();
      });
    }
    else {
      console.log('updateTutorial ' + this.model.id);
       this.tutorialService.update(this.model.id,this.model)
      .subscribe(tutorials => {
        this.model = tutorials;
        this.getAll();
      });
    }
}
  editTutorial(id: any) {
    this.tutorialService.get(id)
    .subscribe(tutorial=>{
      this.model = tutorial;
    })  }
  deleteTutorial(id: any) {
    this.tutorialService.delete(id)
    .subscribe(() => {
      this.getAll();
    });
  }
  tutorials?: Tutorial[];
  constructor(private tutorialService: TutorialService) {

  }
  ngOnInit() { this.getAll() }
  getAll() {
    this.tutorialService.getAll().subscribe({
      next:
        (data: any) => {
          this.tutorials = data;
          console.log(data);
        },
      error: (e) => console.error(e)

    });
  }
}
