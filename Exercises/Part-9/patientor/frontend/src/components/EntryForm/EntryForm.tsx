import {
  Box,
  Chip,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Diagnosis } from "../../types";
import { codes } from "../../constants";
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

const HealthCheckForm: React.FC = () => {
  const [description, setDescription] = useState<string>();
  const [date, setDate] = useState<string>();
  const [specialist, setSpecialist] = useState<string>();
  const [diagnosisCodes, setDiagnosisCodes] = React.useState<string[]>([]);

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

  const handleSubmit = () => {
    console.log("hello");
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
      </form>
    </div>
  );
};

export default HealthCheckForm;
