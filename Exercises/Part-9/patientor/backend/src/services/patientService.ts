import { PatientSecure } from "../types";
import patients from "../../data/patients";

const getNonSensitivePatients = (): PatientSecure[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getNonSensitivePatients,
};
