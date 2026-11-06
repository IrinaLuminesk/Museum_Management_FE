import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Allcode_model, Museum_model, type IAllcode_model, type IMuseum_model } from "../../../api/api-client";
import { _AllcodeService, _MuseumService } from "../../../api/apiClient";
import LoadingError from "../../../scenes/global/LoadingError";
import { Autocomplete, Box, Button, Card, CardContent, CardHeader, Grid, TextField } from "@mui/material";
import { useNotification } from "../../../scenes/global/Snackbar";
import { formatDateTime, getFieldError, getFieldHelperText, isEmpty2, isEmpty } from '../../../utils/utils';

async function getMuseum(id) {
    const data = await _MuseumService.mUSEUM_GETBYID(id)
    return data
}

function MuseumEdit() {
    const [searchParams] = useSearchParams();
    const { showNotification } = useNotification();
    const navigate = useNavigate()

    const museumId = searchParams.get("MUSEUM_ID");

    const isEdit = museumId !== null && museumId !== ""; //Kiểm tra xem có mã museum hay không
    const [notFound, setNotFound] = useState(false);
    const [museum, setMuseum] = useState<IMuseum_model>(); //Chỉ dùng cho Edit
    const [museumStatus, setMuseumStatus] = useState<IAllcode_model[]>([]) //Trạng thái bảo tàng
    const [submitted, setSubmitted] = useState(true); //Chỉ cho save khi các field không lỗi


    useEffect(() => {
        const fecthMuseumOption = async () => {
            const museumOptionData = await _AllcodeService.aLLCODE_SEARCH(new Allcode_model({ cDNAME: "MUSEUM_STATUS", cDTYPE: "MUSEUM" }));
            setMuseumStatus(museumOptionData.result.data);

        };
        // No museumId means create mode. Don't call the API.
        if (!isEdit) {
            return;
        }

        let cancelled = false;

        async function checkMuseum() {
            setNotFound(false);

            try {
                const data = await getMuseum(museumId!);

                if (cancelled)
                    return;

                if (data.result == null) {
                    showNotification({
                        title: 'Error',
                        message: 'Museum Id doesn\'t exist.',
                        severity: 'error',
                    });
                    setNotFound(true);
                } else {
                    setMuseum(data.result as IMuseum_model);
                    fecthMuseumOption();
                }
            } catch {
                if (!cancelled) {
                    setNotFound(true);
                }
            } finally {
                if (!cancelled) {
                }
            }
        }

        checkMuseum();

        return () => {
            cancelled = true;
        };
    }, [museumId, isEdit]);

    const handleEdit = async () => {
        if (submitted == false) {
            showNotification({
                title: 'Error',
                message: 'Please fill all field before saving',
                severity: 'error',
            });
            return;
        }
        setSubmitted(true);
        const editResult = await _MuseumService.mUSEUM_EDIT(museum);
        showNotification({
            title: editResult.responseCode != 200 ? "Save fail" : "Save success",
            message: editResult.responseMessage,
            severity: editResult.responseCode != 200 ? "error" : "success",
        });
        return;
    };

    if (!isEdit) {
        return (
            <>
                <Box sx={{
                    pt: 2,
                    pl: 2,
                    pr: 2,
                    pb: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                        <Button variant="outlined" color="info" onClick={() => { navigate("/MasterData/Museum") }}>
                            Back
                        </Button>

                        <Button variant="contained" color="success" onClick={() => { handleCreate() }}>
                            Save
                        </Button>

                    </Box>
                    <Card elevation={2}>
                        <CardHeader
                            title="Museum Create"
                            sx={{
                                bgcolor: 'primary.main',
                                color: 'primary.contrastText',
                            }}
                        />
                        <CardContent>
                            <Box component="form">
                                <Grid container spacing={2}>
                                    {/* First row: Three text fields */}


                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Museum Name"
                                            placeholder="Enter museum name"
                                            onChange={(event) => {
                                                const value = event.target.value;

                                                setMuseum((prev) => ({
                                                    ...prev,
                                                    mUSEUM_NAME: value,
                                                }));

                                                isEmpty2(setSubmitted, value)
                                            }}
                                            error={getFieldError(museum?.mUSEUM_NAME)}
                                            helperText={getFieldHelperText(
                                                museum?.mUSEUM_NAME,
                                                "Museum name"
                                            )}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Museum address"
                                            placeholder="Enter Museum address"
                                            onChange={(event) => {
                                                const value = event.target.value;

                                                setMuseum((prev) => ({
                                                    ...prev,
                                                    aDDRESS: value,
                                                }));

                                                isEmpty2(setSubmitted, value)
                                            }}
                                            error={getFieldError(museum?.aDDRESS)}
                                            helperText={getFieldHelperText(
                                                museum?.aDDRESS,
                                                "Museum address"
                                            )}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Phone"
                                            placeholder="Enter phone"
                                            onChange={(event) => {
                                                const value = event.target.value;

                                                setMuseum((prev) => ({
                                                    ...prev,
                                                    pHONE: value,
                                                }));

                                                isEmpty2(setSubmitted, value)
                                            }}
                                            error={getFieldError(museum?.pHONE)}
                                            helperText={getFieldHelperText(
                                                museum?.pHONE,
                                                "PHONE"
                                            )}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Url"
                                            placeholder="Enter museum Url"
                                            onChange={(event) =>
                                                setMuseum((prev) => ({
                                                    ...prev,
                                                    uRL: event.target.value,
                                                }))
                                            }
                                        />
                                    </Grid>


                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="City"
                                            placeholder="Enter City"
                                            onChange={(event) => {
                                                const value = event.target.value;

                                                setMuseum((prev) => ({
                                                    ...prev,
                                                    cITY: value,
                                                }));

                                                isEmpty2(setSubmitted, value)
                                            }}
                                            error={getFieldError(museum?.cITY)}
                                            helperText={getFieldHelperText(
                                                museum?.cITY,
                                                "CITY"
                                            )}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="State"
                                            placeholder="Enter State"
                                            onChange={(event) => {
                                                const value = event.target.value;

                                                setMuseum((prev) => ({
                                                    ...prev,
                                                    sTATE: value,
                                                }));

                                                isEmpty2(setSubmitted, value)
                                            }}
                                            error={getFieldError(museum?.sTATE)}
                                            helperText={getFieldHelperText(
                                                museum?.sTATE,
                                                "STATE"
                                            )}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Country"
                                            placeholder="Enter country"
                                            onChange={(event) => {
                                                const value = event.target.value;

                                                setMuseum((prev) => ({
                                                    ...prev,
                                                    cOUNTRY: value,
                                                }));

                                                isEmpty2(setSubmitted, value)
                                            }}
                                            error={getFieldError(museum?.cOUNTRY)}
                                            helperText={getFieldHelperText(
                                                museum?.cOUNTRY,
                                                "COUNTRY"
                                            )}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Postal"
                                            placeholder="Enter postal code"
                                            onChange={(event) => {
                                                const value = event.target.value;

                                                setMuseum((prev) => ({
                                                    ...prev,
                                                    pOSTAL: value,
                                                }));

                                                isEmpty2(setSubmitted, value)
                                            }}
                                            error={getFieldError(museum?.pOSTAL)}
                                            helperText={getFieldHelperText(
                                                museum?.pOSTAL,
                                                "POSTAL"
                                            )}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Create Date"
                                            placeholder="Enter postal code"
                                            value={formatDateTime(new Date().toString())}
                                            disabled
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Status"
                                            value="Close"
                                            disabled
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </>
        );
    }

    if (notFound) {
        return (
            <LoadingError
                defaultMessage="Museum ID doesn't exist"
            />
        );
    }

    // Chỉnh sửa Museum
    return (
        <Box sx={{
            pt: 2,
            pl: 2,
            pr: 2,
            pb: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                <Button variant="outlined" color="info" onClick={() => { navigate("/MasterData/Museum") }}>
                    Back
                </Button>

                <Button variant="contained" color="success" onClick={() => { handleEdit() }}>
                    Save
                </Button>

            </Box>
            <Card elevation={2}>
                <CardHeader
                    title={"Editing " + museum?.MUSEUM_ID}
                    sx={{
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                    }}
                />
                <CardContent>
                    <Box component="form">
                        <Grid container spacing={2}>
                            {/* First row: Three text fields */}

                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Museum Id"
                                    placeholder="Enter museum name"
                                    value={museum?.MUSEUM_ID ?? ''}
                                    disabled
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Museum Name"
                                    placeholder="Enter museum name"
                                    value={museum?.MUSEUM_NAME ?? ''}
                                    onChange={(event) => {
                                        const value = event.target.value;

                                        setMuseum((prev) => ({
                                            ...prev,
                                            MUSEUM_NAME: value,
                                        }));

                                        isEmpty2(setSubmitted, value)
                                    }}
                                    error={getFieldError(museum?.MUSEUM_NAME)}
                                    helperText={getFieldHelperText(
                                        museum?.MUSEUM_NAME,
                                        "Museum name"
                                    )}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Museum address"
                                    placeholder="Enter Museum address"
                                    value={museum?.ADDRESS ?? ''}
                                    onChange={(event) => {
                                        const value = event.target.value;

                                        setMuseum((prev) => ({
                                            ...prev,
                                            ADDRESS: value,
                                        }));

                                        isEmpty2(setSubmitted, value)
                                    }}
                                    error={getFieldError(museum?.ADDRESS)}
                                    helperText={getFieldHelperText(
                                        museum?.ADDRESS,
                                        "Museum address"
                                    )}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Phone"
                                    placeholder="Enter phone"
                                    value={museum?.PHONE ?? ''}
                                    onChange={(event) => {
                                        const value = event.target.value;

                                        setMuseum((prev) => ({
                                            ...prev,
                                            PHONE: value,
                                        }));

                                        isEmpty2(setSubmitted, value)
                                    }}
                                    error={getFieldError(museum?.PHONE)}
                                    helperText={getFieldHelperText(
                                        museum?.PHONE,
                                        "PHONE"
                                    )}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Url"
                                    placeholder="Enter museum Url"
                                    value={museum?.URL ?? ''}
                                    onChange={(event) =>
                                        setMuseum((prev) => ({
                                            ...prev,
                                            URL: event.target.value,
                                        }))
                                    }
                                />
                            </Grid>


                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="City"
                                    placeholder="Enter City"
                                    value={museum?.CITY ?? ''}
                                    onChange={(event) => {
                                        const value = event.target.value;

                                        setMuseum((prev) => ({
                                            ...prev,
                                            CITY: value,
                                        }));

                                        isEmpty2(setSubmitted, value)
                                    }}
                                    error={getFieldError(museum?.CITY)}
                                    helperText={getFieldHelperText(
                                        museum?.CITY,
                                        "CITY"
                                    )}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="State"
                                    placeholder="Enter State"
                                    value={museum?.STATE ?? ''}
                                    onChange={(event) => {
                                        const value = event.target.value;

                                        setMuseum((prev) => ({
                                            ...prev,
                                            STATE: value,
                                        }));

                                        isEmpty2(setSubmitted, value)
                                    }}
                                    error={getFieldError(museum?.STATE)}
                                    helperText={getFieldHelperText(
                                        museum?.STATE,
                                        "STATE"
                                    )}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Country"
                                    placeholder="Enter country"
                                    value={museum?.COUNTRY ?? ''}
                                    onChange={(event) => {
                                        const value = event.target.value;

                                        setMuseum((prev) => ({
                                            ...prev,
                                            COUNTRY: value,
                                        }));

                                        isEmpty2(setSubmitted, value)
                                    }}
                                    error={getFieldError(museum?.COUNTRY)}
                                    helperText={getFieldHelperText(
                                        museum?.COUNTRY,
                                        "COUNTRY"
                                    )}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Postal"
                                    placeholder="Enter postal code"
                                    value={museum?.POSTAL ?? ''}
                                    onChange={(event) => {
                                        const value = event.target.value;

                                        setMuseum((prev) => ({
                                            ...prev,
                                            POSTAL: value,
                                        }));

                                        isEmpty2(setSubmitted, value)
                                    }}
                                    error={getFieldError(museum?.POSTAL)}
                                    helperText={getFieldHelperText(
                                        museum?.POSTAL,
                                        "POSTAL"
                                    )}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Create Date"
                                    placeholder="Enter postal code"
                                    value={formatDateTime(museum?.CREATE_DT ?? '')}
                                    disabled
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <Autocomplete
                                    options={museumStatus}
                                    getOptionLabel={(option) => option.CONTENT ?? ""}
                                    getOptionValue={(option) => option.CD_VAL}
                                    value={isEmpty(museum?.STATUS) ? "" : museum?.STATUS}
                                    onChange={(_, newValue) => {
                                        console.log("Selected value:", newValue);
                                        setMuseum((prev) => ({
                                            ...prev,
                                            STATUS: newValue,
                                        }));
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Museum Status" />
                                    )}
                                />
                            </Grid>

                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default MuseumEdit;
