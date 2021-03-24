import toastr from "toastr";
import 'toastr/build/toastr.min.css';

export function successToaster(message) {
    toastr.success(message)
}

export function errorToaster(message) {
    toastr.error(message);
  }