import { HealthCheckEntry } from "../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import DiagnosisIcon from "./DiagnosisIcon";
import DiagnosisCode from "./DiagnosisCode";

const HealthEntry: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <div className="entry">
      <p>
        {entry.date} <MedicalServicesIcon />
      </p>
      <p>{entry.description}</p>
      <DiagnosisIcon health={entry.healthCheckRating} />
      <DiagnosisCode codes={entry.diagnosisCodes} />
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HealthEntry;
