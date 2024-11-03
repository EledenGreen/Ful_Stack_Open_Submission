import { Gender, HealthCheckRating, NewPatientEntry } from "./types";
import { z } from "zod";

export const NewEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date().optional(),
  ssn: z.string().optional(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewEntrySchema.parse(object);
};

// optional fields still errror

// Parsing entries

// BaseEntry
const DiagnosisCodesSchema = z
  .array(z.string())
  .optional()
  .transform((codes) => (codes ? codes : []));

const BaseHealthEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: DiagnosisCodesSchema,
});

// HealthCheck Entry
export const NewHealthEntry = BaseHealthEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

// OccupationalHealthcare Entry
const SickLeaveSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

export const NewOccupationalEntry = BaseHealthEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: SickLeaveSchema.optional(),
});

// Hospital Entry
const DischargeSchema = z.object({
  date: z.string(),
  criteria: z.string(),
});

export const NewHospitalEntry = BaseHealthEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: DischargeSchema.optional(),
});

export const EntrySchemas = z.union([
  NewHealthEntry,
  NewOccupationalEntry,
  NewHospitalEntry,
]);
