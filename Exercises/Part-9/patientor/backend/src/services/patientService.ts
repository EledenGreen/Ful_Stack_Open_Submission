import {
  PatientSecure,
  Patient,
  NewPatientEntry,
  EntryWithoutId,
  Entry,
} from "../types";
import patients, { data } from "../../data/patients";
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

const getPatientById = (id: string) => {
  const result = data.find((patient) => patient.id === id);

  return result;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const NewPatientEntry = {
    id: uuid(),
    ...entry,
    entries: [],
  };

  patients.push(NewPatientEntry);
  return NewPatientEntry;
};

const addEntry = (
  entry: EntryWithoutId,
  patientId: string
): Entry | undefined => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  const patient = data.find((p) => p.id === patientId);

  patient?.entries.push(newEntry);

  patients.map((p) => (p.id === patientId ? patient : p));

  return newEntry;
};

export default {
  getNonSensitivePatients,
  addPatient,
  getPatientById,
  addEntry,
};
