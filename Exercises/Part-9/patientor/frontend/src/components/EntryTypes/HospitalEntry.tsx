import { Entry } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DiagnosisCode from "./DiagnosisCode";

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div className="entry">
      <p>
        {entry.date} <LocalHospitalIcon />
      </p>
      <p>{entry.description}</p>
      <DiagnosisCode codes={entry.diagnosisCodes} />

      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HospitalEntry;
