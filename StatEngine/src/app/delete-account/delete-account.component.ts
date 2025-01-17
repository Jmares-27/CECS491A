import { Component, Inject } from '@angular/core';
import {FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { Router, RouterConfigOptions } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog , MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {


  // message = ""
  // status_checker = false
  // searchString = ""
  // public deleteForm: FormGroup;
  constructor(public dialog:MatDialog, private snackBar:MatSnackBar,private formBuilder: FormBuilder, private http: HttpService, private router: Router){
    // // searchString: String;
    // this.deleteForm = this.formBuilder.group({
    //   username:['',[Validators.required]],
    // });  

    
}
openDialog() {
  const dialogRef = this.dialog.open(DeleteAccountDialog, {
    data: { onSubmit: this.onSubmit.bind(this) },
  });

  dialogRef.afterClosed().subscribe(result => {
    // console.log(`Dialog result: ${result}`);
  });
}



  onSubmit(){

    // if (this.http.isLoggedIn()) {
      const userid = JSON.parse(localStorage.getItem("userData"))["userid"]
      const token = JSON.parse(localStorage.getItem("userData"))["token"]

      this.http.deleteAccount(token, userid).subscribe(
        (data:any)=>{
          // console.log("Delete data:", data)
          if (data.message == "Delete Successfully!"){
            this.http.logOut();
            this.snackBar.open("Delete Successfully!","",{duration:3000});
          }
        },
        error => {
          if (error.status == 500 ){
            if (error.error.error == "Cannot find the user data in the database") {
              this.snackBar.open("Error in finding user data","",{duration:2000});
            }
            else if (error.error.error == "TokenExpiredError"){
              this.http.logOut()
              this.snackBar.open("Token has expired","",{duration:Infinity});
            }
            else if (error.error.error == "invalid token") {
              this.http.logOut()
              this.snackBar.open("Invalid token","Login",{duration:Infinity});
            }
            else {
              console.log ("An error occured:",error)
            }
          }
          else {
            console.log("An error occured:", error);
          }


        }
      )

    }
    // else{
    //   this.snackBar.open("You have not login to perform this action","",{duration:2000});
    // }
  // }

}

@Component({
  selector: 'delete-account-popup',
  templateUrl: 'delete-account-popup.html',
  standalone:true,
  imports: [MatDialogModule, MatButtonModule]
})
export class DeleteAccountDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteAccountDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onDeleteClick(): void {
    // Call onSubmit function of the parent component
    this.data.onSubmit();
    // Close the dialog
    this.dialogRef.close();
  }
}
