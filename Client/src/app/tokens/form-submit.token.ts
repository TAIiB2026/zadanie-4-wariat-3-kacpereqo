import { InjectionToken } from "@angular/core";
import { FormSubmitInterface } from "../interfaces/form-submit.interface";

export const FORM_SUBMIT_TOKEN = new InjectionToken<FormSubmitInterface>("FORM_SUBMIT_TOKEN");