import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";
import {
    Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow,
    IconButton, Snackbar, Alert, Typography, Tooltip, Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import DCandidateForm from "./DCandidateForm";

const DCandidates = (props) => {
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [notify, setNotify] = useState({ isOpen: false, message: '' })

    useEffect(() => {
        props.fetchAllDCandidates()
    }, [])

    const onDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            props.Delete(id)
            setNotify({ isOpen: true, message: 'Deleted Successfully' })
        }
    }

    return (
        <Box sx={{ maxWidth: 1200, margin: '32px auto', padding: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 3 }}>
                <PersonSearchIcon color="primary" sx={{ fontSize: 32 }} />
                <Typography variant="h5" fontWeight={600}>
                    Candidate Management
                </Typography>
            </Box>

            <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            {recordForEdit == null ? 'Add Candidate' : 'Edit Candidate'}
                        </Typography>
                        <DCandidateForm
                            recordForEdit={recordForEdit}
                            setRecordForEdit={setRecordForEdit}
                            setNotify={setNotify}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Candidate List
                        </Typography>
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ '& th': { fontWeight: 600, backgroundColor: '#f5f5f5' } }}>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Blood Group</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.dCandidateList.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center" sx={{ color: 'text.secondary', paddingY: 4 }}>
                                                No candidates added yet.
                                            </TableCell>
                                        </TableRow>
                                    ) : props.dCandidateList.map((record, index) => (
                                        <TableRow
                                            key={index}
                                            hover
                                            sx={{ '&:last-child td': { border: 0 } }}
                                        >
                                            <TableCell>{record.fullName}</TableCell>
                                            <TableCell>{record.mobile}</TableCell>
                                            <TableCell>{record.bloodGroup}</TableCell>
                                            <TableCell align="right">
                                                <Tooltip title="Edit">
                                                    <IconButton size="small" onClick={() => setRecordForEdit(record)}>
                                                        <EditIcon color="primary" fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton size="small" onClick={() => onDelete(record.id)}>
                                                        <DeleteIcon color="error" fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </Paper>

            <Snackbar
                open={notify.isOpen}
                autoHideDuration={3000}
                onClose={() => setNotify({ ...notify, isOpen: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setNotify({ ...notify, isOpen: false })}
                    severity="success"
                    variant="filled"
                >
                    {notify.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}
const mapStateToProps = state => ({
    dCandidateList: state.dCandidate.list
})

const mapActionToProps = {
    fetchAllDCandidates: actions.fetchAll,
    Delete: actions.Delete
}
export default connect(mapStateToProps, mapActionToProps)(DCandidates);