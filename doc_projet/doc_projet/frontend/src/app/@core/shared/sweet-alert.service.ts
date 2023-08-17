import {Injectable} from "@angular/core";
import Swal from "sweetalert2";
import swal from "sweetalert2";

@Injectable({
  providedIn:'root'
})
export class SweetAlertService{

  public successful(message: any){
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 7000
    })
  }

  public successfulLongMessage(title:any,message: any){
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      showConfirmButton: true
    })
  }

  public error(message: any){
    Swal.fire({
      icon: 'warning',
      title: 'Erreur',
      text: message
    })
  }

  public confirm = (text: string): Promise<any> => {
    return swal.fire({
      title: "Êtes-vous sûr de "+text,
      icon: "warning",
      showCancelButton: true,
      customClass: {
        cancelButton: "alert-annul-btn",
        confirmButton: "alert-valid-btn mr-1",
      },
      confirmButtonText: "Oui, je confirme !",
      buttonsStyling: false
    })
  }

  public customConfirm= (text: string): Promise<any> => {
    return swal.fire({
      title: text,
      icon: "warning",
      showCancelButton: true,
      customClass: {
        cancelButton: "alert-annul-btn",
        confirmButton: "alert-valid-btn mr-1",
      },
      confirmButtonText: "Oui, je confirme !",
      cancelButtonText:'Annuler',
      buttonsStyling: false
    })
  }
}
