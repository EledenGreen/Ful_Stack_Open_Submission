import {
  Box,
  Button,
  Chip,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Diagnosis, EntryWithoutId } from "../../types";
import { codes, healthRating } from "../../constants";
import { Theme, useTheme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  name: string,
  diagnosisCodes: Array<Diagnosis["code"]> | undefined,
  theme: Theme
) {
  return {
    fontWeight: diagnosisCodes?.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const HealthCheckForm: React.FC<{
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = React.useState<string[]>([]);
  const [healthCheckRating, setHealth] = useState<number>(0);
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating,
      type: "HealthCheck",
    });
  };

  return (
    <div className="entryForm">
      <h4>New HealthCheck Entry</h4>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <TextField
          fullWidth
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={(event) => setSpecialist(event.target.value)}
        />
        <InputLabel id="demo-multiple-chip-label">Diagnosis Codes</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={diagnosisCodes}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {codes.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, diagnosisCodes, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        <br />
        <TextField
          id="standard-select-currency"
          select
          value={healthCheckRating}
          onChange={(event) => setHealth(Number(event.target.value))}
          label="Select"
          helperText="Please select your health rating"
          variant="standard"
        >
          {healthRating.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default HealthCheckForm;
