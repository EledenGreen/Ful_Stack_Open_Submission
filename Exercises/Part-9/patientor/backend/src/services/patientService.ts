import { PatientSecure, Patient, NewPatientEntry } from "../types";
import patients from "../../data/patients";
import { v1 as uuid } from "uuid";

const getNonSensitivePatients = (): PatientSecure[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const NewPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(NewPatientEntry);
  return NewPatientEntry;
};

export default {
  getNonSensitivePatients,
  addPatient,
};
