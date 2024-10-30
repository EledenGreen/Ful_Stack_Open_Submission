import { z } from "zod";
import { NewEntrySchema } from "./utils";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth?: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
}

export type PatientSecure = Omit<Patient, "ssn">;

export type NewPatientEntry = z.infer<typeof NewEntrySchema>;
