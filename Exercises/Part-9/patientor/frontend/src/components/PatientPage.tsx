import { useEffect, useState } from "react";
import patientService from "../services/patients";
import { useParams } from "react-router-dom";
import { EntryWithoutId, Patient } from "../types";
import EntryDetails from "./EntryTypes/EntryDetails";
import HealthCheckForm from "./EntryForm/EntryForm";
import axios from "axios";
import { Alert, Button, ButtonGroup, Dialog } from "@mui/material";
import OccupationalForm from "./EntryForm/OccupationalForm";
import HospitalForm from "./EntryForm/HospitalForm";

interface ErrorDetail {
  code: string;
  validation: string;
  message: string;
  path: string[];
}

interface ErrorResponse {
  error: ErrorDetail[];
}

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState<string | null>(null);
  const [openHealthCheck, setOpenHealthCheck] = useState(false);
  const [openOccupational, setOpenOccupational] = useState(false);
  const [openHospital, setOpenHospital] = useState(false);
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
      setOpenOccupational(false);
      setOpenHospital(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const errorData = e.response?.data as ErrorResponse;
        if (errorData.error && errorData.error.length > 0) {
          const errorMessage = errorData.error[0].message;
          console.error(errorMessage);
          setError(errorMessage);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }

      setTimeout(() => setError(null), 5000);
    }
  };

  const handleClose = () => {
    setOpenHealthCheck(false);
    setOpenOccupational(false);
    setOpenHospital(false);
  };

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
          <ButtonGroup
            variant="outlined"
            aria-label="Basic button group"
            sx={{
              border: "1px black solid",
              backgroundColor: "lightblue",
            }}
          >
            <Button
              onClick={() => setOpenHealthCheck(true)}
              sx={{
                color: "black",

                "&:hover": { backgroundColor: "lightcyan" },
              }}
            >
              Add Health Check Entry
            </Button>
            <Button
              onClick={() => setOpenOccupational(true)}
              sx={{
                color: "black",
                "&:hover": { backgroundColor: "lightcyan" },
              }}
            >
              Add Occupational Entry
            </Button>
            <Button
              onClick={() => setOpenHospital(true)}
              sx={{
                color: "black",
                "&:hover": { backgroundColor: "lightcyan" },
              }}
            >
              Add Hospital Entry
            </Button>
          </ButtonGroup>
        </div>
        <div>
          <Dialog open={openHealthCheck} onClose={handleClose}>
            {error && <Alert severity="error">{error}</Alert>}
            <HealthCheckForm onSubmit={onSubmit} onCancel={handleClose} />
          </Dialog>
          <Dialog open={openOccupational} onClose={handleClose}>
            {error && <Alert severity="error">{error}</Alert>}
            <OccupationalForm onSubmit={onSubmit} onCancel={handleClose} />
          </Dialog>
          <Dialog open={openHospital} onClose={handleClose}>
            {error && <Alert severity="error">{error}</Alert>}
            <HospitalForm onSubmit={onSubmit} onCancel={handleClose} />
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
