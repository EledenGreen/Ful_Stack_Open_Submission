import { Entry } from "../../types";
import WorkIcon from "@mui/icons-material/Work";
import DiagnosisCode from "./DiagnosisCode";

const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div className="entry">
      <p>
        {entry.date} <WorkIcon />
      </p>
      <p>{entry.description}</p>
      <DiagnosisCode codes={entry.diagnosisCodes} />
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default OccupationalHealthcareEntry;
