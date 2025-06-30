import React, { useState } from "react";
import { Box, TextField, Grid, Button, Typography } from "@mui/material";
interface PersonalInfoFormProps {
  setStep: (step: number) => void;
}
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ setStep }) => {
  const [form, setForm] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\+?\d{10,15}$/.test(form.phone))
      newErrors.phone = "Invalid phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setStep(11);
      console.log("✅ Submitted:", form);
    }
  };

  return (
    <Box>
      <Box sx={{ my: 3 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontFamily: "Inter", fontSize: "1rem" }}
        >
          Final step: please complete the form to display the result.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="First Name"
            placeholder="Enter your first name..."
            value={form.firstName}
            onChange={e => handleChange("firstName", e.target.value)}
            error={!!errors.firstName}
            helperText={errors.firstName}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "999px",
                backgroundColor: "#F9FAFB",
                fontFamily: "Inter",
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Last Name"
            placeholder="Enter your last name..."
            value={form.lastName}
            onChange={e => handleChange("lastName", e.target.value)}
            error={!!errors.lastName}
            helperText={errors.lastName}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "999px",
                backgroundColor: "#F9FAFB",
              },
              fontFamily: "Inter",
            }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Email"
            placeholder="Enter your email..."
            value={form.email}
            onChange={e => handleChange("email", e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "999px",
                backgroundColor: "#F9FAFB",
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Phone"
            placeholder="Enter your phone number..."
            value={form.phone}
            onChange={e => handleChange("phone", e.target.value)}
            error={!!errors.phone}
            helperText={errors.phone}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "999px",
                backgroundColor: "#F9FAFB",
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              borderRadius: "999px",
              textTransform: "none",
              py: 1.5,
              fontWeight: 600,
            }}
          >
            View Result
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfoForm;
