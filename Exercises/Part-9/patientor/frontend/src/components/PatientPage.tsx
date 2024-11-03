import { useEffect, useState } from "react";
import patientService from "../services/patients";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import EntryDetails from "./EntryTypes/EntryDetails";
import HealthCheckForm from "./EntryForm/EntryForm";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatientById = async (id: string | undefined) => {
      try {
        const patient = await patientService.getById(id);
        setPatient(patient);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatientById(id);
  }, [id]);

  if (!patient) {
    return <>no user</>;
  }
  return (
    <>
      <h3>
        {patient.name}, {patient.gender}
      </h3>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <div>
        <h4>entries</h4>
        <div>
          {patient.entries.map((entry, index) => {
            return (
              <div key={index}>
                <EntryDetails entry={entry} />
                <HealthCheckForm />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PatientPage;
