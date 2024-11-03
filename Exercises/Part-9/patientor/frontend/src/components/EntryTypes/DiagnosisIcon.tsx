import { HealthCheckRating } from "../../types";
import FavoriteIcon from "@mui/icons-material/Favorite";

const DiagnosisIcon: React.FC<{ health: HealthCheckRating }> = ({ health }) => {
  switch (health) {
    case 0:
      return <FavoriteIcon sx={{ color: "green" }} />;
    case 1:
      return <FavoriteIcon sx={{ color: "yellow" }} />;
    case 2:
      return <FavoriteIcon sx={{ color: "orange" }} />;
    case 3:
      return <FavoriteIcon sx={{ color: "red" }} />;
    default:
      return null;
  }
};

export default DiagnosisIcon;
