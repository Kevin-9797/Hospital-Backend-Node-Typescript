import { HospitalData } from "./hospital";
import { UserData } from "./user";

 export interface MedicalData {
    name: string;
    img: string;
    user: UserData;
    hospital: HospitalData  ;
 }
  