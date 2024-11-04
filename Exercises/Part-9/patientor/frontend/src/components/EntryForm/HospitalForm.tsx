import {
  Box,
  Button,
  Chip,
  DialogContent,
  DialogTitle,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Diagnosis, Discharge, EntryWithoutId } from "../../types";
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

const HospitalForm: React.FC<{
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = React.useState<string[]>([]);
  const [discharge, setDischarge] = useState<Discharge>({
    date: "",
    criteria: "",
  });
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
      discharge,
      type: "Hospital",
    });
  };

  return (
    <div className="entryForm">
      <DialogTitle>New Hospital Entry</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Description"
            fullWidth
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <TextField
            fullWidth
            required
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <TextField
            label="Specialist"
            fullWidth
            required
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

          <Box>
            <h3>Discharge</h3>
            <InputLabel>date</InputLabel>
            <Input
              type="date"
              value={discharge?.date}
              onChange={(e) =>
                setDischarge((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
            />
            <InputLabel>Criteria</InputLabel>
            <Input
              value={discharge?.criteria}
              onChange={(e) =>
                setDischarge((prev) => ({
                  ...prev,
                  criteria: e.target.value,
                }))
              }
            />
          </Box>
          <br />
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
      </DialogContent>
    </div>
  );
};

export default HospitalForm;
