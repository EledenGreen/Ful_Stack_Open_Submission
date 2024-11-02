import { Patient } from "../types";

interface Props {
  patient: Patient | undefined;
}

const PatientPage = ({ patient }: Props) => {
  if (!patient) {
    return;
  }
  return (
    <>
      <h3>{patient.name}</h3>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </>
  );
};

export default PatientPage;
