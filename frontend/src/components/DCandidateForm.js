import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import useForm from "./useForm";
import * as actions from "../actions/dCandidate";

const initialFieldValues = {
    fullName: '',
    mobile: '',
    email: '',
    age: '',
    bloodGroup: '',
    address: '',
}

const DCandidateForm = (props) => {
    const { recordForEdit, setRecordForEdit, setNotify } = props
    const { values, setValues, errors, setErrors, handleInputChange } = useForm(initialFieldValues)

    useEffect(() => {
        if (recordForEdit != null) {
            setValues({ ...recordForEdit })
        }
    }, [recordForEdit])

    const validate = () => {
        let temp = {}
        temp.fullName = values.fullName ? "" : "This field is required."
        temp.mobile = values.mobile ? "" : "This field is required."
        temp.bloodGroup = values.bloodGroup ? "" : "This field is required."
        temp.age = values.age ? "" : "This field is required."
        temp.address = values.address ? "" : "This field is required."
        temp.email = (/^$|.+@.+\..+/).test(values.email) ? "" : "Email is not valid."
        setErrors({ ...temp })
        return Object.values(temp).every(x => x === "")
    }

    const handleChange = e => {
        const { name } = e.target
        handleInputChange(e)
        setErrors(prev => ({ ...prev, [name]: '' }))
    }

    const resetForm = () => {
        setValues(initialFieldValues)
        setErrors({})
        setRecordForEdit(null)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const isEdit = values.id != null
            props.addOrEdit(values)
            resetForm()
            setNotify({
                isOpen: true,
                message: isEdit ? 'Updated Successfully' : 'Submitted Successfully'
            })
        }
    }

    return (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <TextField
                        fullWidth
                        name="fullName"
                        variant="outlined"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleChange}
                        {...(errors.fullName && {error: true, helperText: errors.fullName})}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        name="mobile"
                        variant="outlined"
                        label="Mobile"
                        value={values.mobile}
                        onChange={handleChange}
                        {...(errors.mobile && {error: true, helperText: errors.mobile})}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        name="age"
                        variant="outlined"
                        label="Age"
                        value={values.age}
                        onChange={handleChange}
                        {...(errors.age && {error: true, helperText: errors.age})}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleChange}
                        {...(errors.email && {error: true, helperText: errors.email})}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth variant="outlined" {...(errors.bloodGroup && {error: true})}>
                        <InputLabel id="bloodGroup-label">Blood Group</InputLabel>
                        <Select
                            labelId="bloodGroup-label"
                            label="Blood Group"
                            name="bloodGroup"
                            value={values.bloodGroup}
                            onChange={handleChange}
                        >
                            <MenuItem value="">Select Blood Group</MenuItem>
                            <MenuItem value="A+">A +ve</MenuItem>
                            <MenuItem value="A-">A -ve</MenuItem>
                            <MenuItem value="B+">B +ve</MenuItem>
                            <MenuItem value="B-">B -ve</MenuItem>
                            <MenuItem value="O+">O +ve</MenuItem>
                            <MenuItem value="O-">O -ve</MenuItem>
                        </Select>
                        {errors.bloodGroup && (
                            <span style={{ color: '#d32f2f', fontSize: '0.75rem', marginLeft: '14px', marginTop: '3px' }}>
                                {errors.bloodGroup}
                            </span>
                        )}
                    </FormControl>
                </Grid>
                <Grid size={12}>
                    <TextField
                        fullWidth
                        name="address"
                        variant="outlined"
                        label="Address"
                        multiline
                        rows={2}
                        value={values.address}
                        onChange={handleChange}
                        {...(errors.address && {error: true, helperText: errors.address})}
                    />
                </Grid>

                <Grid size={12} sx={{ display: 'flex', gap: 2, marginTop: 1 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="large"
                        sx={{ paddingX: 4, textTransform: 'none', fontWeight: 600 }}
                    >
                        {recordForEdit == null ? 'Submit' : 'Update'}
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        onClick={resetForm}
                        sx={{ paddingX: 4, textTransform: 'none', fontWeight: 600 }}
                    >
                        Reset
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

const mapActionToProps = {
    addOrEdit: actions.addOrEdit
}

export default connect(null, mapActionToProps)(DCandidateForm)