import { useEffect, useState } from "react";
import patientService from "../services/patients";
import { useParams } from "react-router-dom";
import { EntryWithoutId, Patient } from "../types";
import EntryDetails from "./EntryTypes/EntryDetails";
import HealthCheckForm from "./EntryForm/EntryForm";
import axios from "axios";
import { Button, Dialog } from "@mui/material";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState<string>();
  const [openHealthCheck, setOpenHealthCheck] = useState(false);
  //const [openOccupational, setOpenOccupational] = useState(false);
  //const [openHospital, setOpenHospital] = useState(false);
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

  const onSubmit = async (values: EntryWithoutId) => {
    try {
      const entry = await patientService.createEntry(id, values);
      patient?.entries.push(entry);
      setPatient(patient);
      setOpenHealthCheck(false);
      //setOpenOccupational(false);
      //setOpenHospital(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const handleClose = () => {
    setOpenHealthCheck(false);
    //setOpenOccupational(false);
    //setOpenHospital(false);
  };

  if (!patient) {
    return <>no user</>;
  }
  return (
    <>
      {error}
      <h3>
        {patient.name}, {patient.gender}
      </h3>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <div>
        <h4>entries</h4>
        <div>
          <Button variant="contained" onClick={() => setOpenHealthCheck(true)}>
            Add Health Check Entry
          </Button>
        </div>
        <div>
          <Dialog open={openHealthCheck} onClose={handleClose}>
            <HealthCheckForm onSubmit={onSubmit} onCancel={handleClose} />
          </Dialog>
        </div>
        <div>
          {patient.entries.map((entry, index) => {
            return (
              <div key={index}>
                <EntryDetails entry={entry} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PatientPage;
