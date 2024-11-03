import { useEffect, useState } from "react";
import { Diagnosis } from "../../types";
import diagnosesService from "../../services/diagnosis";

const DiagnosisCode: React.FC<{ codes: string[] | undefined }> = ({
  codes,
}) => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const diagnosis = await diagnosesService.getAll();
        setDiagnosis(diagnosis);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAll();
  }, [diagnosis]);

  const diagnosisCode = (code: string) => {
    const result = diagnosis?.find((p) => p.code === code);

    return result?.name;
  };

  return (
    <>
      <div>
        <ul>
          {codes?.map((code) => (
            <li key={code}>
              {code} {diagnosisCode(code)}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DiagnosisCode;
