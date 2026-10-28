import { useState, useCallback, useEffect } from 'react';
import { Link, Box, Card, CardContent, CardHeader, Grid, TextField, Button, Autocomplete } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { type IMuseum_model, type IAllcode_model, Allcode_model } from '../../../api/api-client';
import { Museum_model } from '../../../api/api-client';
import { _AllcodeService, _MuseumService } from '../../../api/apiClient';
// Dùng để tạo table
import { DataTable } from '../../../components/DataTables/DataTable';
import type { Column } from '../../../components/DataTables/types';
import { useNavigate } from "react-router-dom";
import { formatDateTime } from '../../../utils/utils';

function MuseumSearch() {
    const navigate = useNavigate()

    const [museumStatus, setMuseumStatus] = useState<IAllcode_model[]>([
        // {cD_VAL: null, cONTENT: "--All--"}
    ])

    useEffect(()=> {
        const fecthMuseumOption = async () => {
            const museumOptionData = await _AllcodeService.aLLCODE_SEARCH(new Allcode_model({cDNAME: "MUSEUM_STATUS", cDTYPE: "MUSEUM"}));
            setMuseumStatus([{
                    CD_VAL: "",
                    CONTENT: "--All--",
                },
                ...museumOptionData.result.data
            ]);
            
        };
        fecthMuseumOption();
    }, []);


    // Khởi tạo tham số search
    const [searchParams, setSearchParams] = useState<IMuseum_model>({
        mUSEUM_ID: "",
        mUSEUM_NAME: "",
        aDDRESS: "",
        cITY: "",
        sTATE: "",
        // pOSTAL: "",
        cOUNTRY: "",
        // pHONE: "",
        // uRL: "",
        cREATE_DT_FROMDATE: null,
        cREATE_DT_TODATE: null,
        sTATUS: ""
    });

    // Dùng để gọi api, sẽ chỉ gọi api khi appliedSearch thay đổi (Lưu ý: museumSearch chỉ lưu state của search trên UI, chưa gọi api)
    const [appliedSearch, setAppliedSearch] = useState<IMuseum_model>({});

    const handleFetchMuseumsData = useCallback(async (params: IMuseum_model) => {
        const searchModel = new Museum_model({
            pageNumber: params.pageNumber,
            pageSize: params.pageSize,
            sortColumn: params.sortColumn,
            sortDirection: params.sortDirection,
            mUSEUM_ID: appliedSearch.mUSEUM_ID,
            mUSEUM_NAME: appliedSearch.mUSEUM_NAME,
            aDDRESS: appliedSearch.aDDRESS,
            cITY: appliedSearch.cITY,
            sTATE: appliedSearch.sTATE,
            cOUNTRY: appliedSearch.cOUNTRY,
            cREATE_DT_FROMDATE: appliedSearch.cREATE_DT_FROMDATE,
            cREATE_DT_TODATE: appliedSearch.cREATE_DT_TODATE,
            sTATUS: appliedSearch.sTATUS
        });

        const response = await _MuseumService.mUSEUM_SEARCH(searchModel);

        return {
            data: response.result.data || [],
            totalRows: response.result.totalRows || 0,
        };
    }, [appliedSearch]);

    // Trigger nút search
    async function handleSearch() {
        setAppliedSearch(searchParams);
    }

    // Xóa các search
    const handleClear = () => {
        const emptyState: IMuseum_model = {
            mUSEUM_ID: '',
            mUSEUM_NAME: '',
            aDDRESS: '',
            pageNumber: 1,
            pageSize: 10
        };
        setSearchParams(emptyState);
    };

    // Các cột trong table
    const columns: Column<IMuseum_model>[] = [
        {
            key: 'MUSEUM_ID',
            header: 'Museum Id',
            sortable: true,
            width: 140,
            minWidth: 140,
            render: (row) => (
                 <Link
            href={`/Masterdata/Museum/Edit?MUSEUM_ID=${encodeURIComponent(row.MUSEUM_ID)}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            {row.MUSEUM_ID}
        </Link>
            ),
        },
        {
            key: 'MUSEUM_NAME',
            header: 'Museum Name',
            sortable: true,
            width: 250,
            minWidth: 250,
        },
        {
            key: 'ADDRESS',
            header: 'Museum Address',
            sortable: true,
            width: 250,
            minWidth: 250,
        },
        {
            key: 'CITY',
            header: 'City',
            sortable: true
        },
        {
            key: 'STATE',
            header: 'State',
            sortable: true
        },
        {
            key: 'POSTAL',
            header: 'Postal',
            sortable: true
        },
        {
            key: 'COUNTRY',
            header: 'Country',
            sortable: true
        },
        {
            key: 'PHONE',
            header: 'Phone',
            sortable: true,
            width: 150,
            minWidth: 150,
        },
        {
            key: 'URL',
            header: 'Url',
            sortable: false,
            render: (row) => (
                <Link href={row.URL} target="_blank" rel="noopener noreferrer">
                    Link
                </Link>
            ),
        },
        {
            key: 'CREATE_DT',
            header: 'Create Date',
            sortable: true,
            width: 150,
            minWidth: 150,
            render: (row) => (
                <>{formatDateTime(row.CREATE_DT)}</>
            ),
        },
    ];

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
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button variant="contained" color="success" onClick={() => {navigate("/Masterdata/Museum/Create")}}>
                        Create
                    </Button>

                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#00838f',
                            '&:hover': {
                                bgcolor: '#006064',
                            },
                        }}
                    >
                        Export
                    </Button>
                </Box>
                {/* Search Critera */}
                {/* <Container> */}
                <Card elevation={2}>
                    <CardHeader
                        title="Museum Search"
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                        }}
                    />
                    <CardContent>
                        <Box
                            component="form"
                            onSubmit={(event) => {
                                event.preventDefault();
                                handleSearch();
                            }}
                        >
                            <Grid container spacing={2}>
                                {/* First row: Three text fields */}
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Museum Id"
                                        placeholder="Enter Museum Id"
                                        value={searchParams.mUSEUM_ID ?? ''}
                                        onChange={(event) =>
                                            setSearchParams((prev) => ({
                                                ...prev,
                                                mUSEUM_ID: event.target.value,
                                            }))
                                        }
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Museum Name"
                                        placeholder="Enter museum name"
                                        value={searchParams.mUSEUM_NAME ?? ''}
                                        onChange={(event) =>
                                            setSearchParams((prev) => ({
                                                ...prev,
                                                mUSEUM_NAME: event.target.value,
                                            }))
                                        }
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Museum address"
                                        placeholder="Enter Museum address"
                                        value={searchParams.aDDRESS ?? ''}
                                        onChange={(event) =>
                                            setSearchParams((prev) => ({
                                                ...prev,
                                                aDDRESS: event.target.value,
                                            }))
                                        }
                                    />
                                </Grid>
                                {/* First row: Three text fields */}
                                
                                {/* Second row: Three text fields */}
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="City"
                                        placeholder="Enter City"
                                        value={searchParams.cITY ?? ''}
                                        onChange={(event) =>
                                            setSearchParams((prev) => ({
                                                ...prev,
                                                cITY: event.target.value,
                                            }))
                                        }
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="State"
                                        placeholder="Enter State"
                                        value={searchParams.sTATE ?? ''}
                                        onChange={(event) =>
                                            setSearchParams((prev) => ({
                                                ...prev,
                                                mUSEUM_NAME: event.target.value,
                                            }))
                                        }
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Country"
                                        placeholder="Enter country"
                                        value={searchParams.cOUNTRY ?? ''}
                                        onChange={(event) =>
                                            setSearchParams((prev) => ({
                                                ...prev,
                                                cOUNTRY: event.target.value,
                                            }))
                                        }
                                    />
                                </Grid>
                                {/* Second row: Three text fields */}
                                
                                {/* Third row: Two date fields */}
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Grid size={{ xs: 12, md: 8 }}>
                                        <fieldset
                                            style={{
                                                border: '1px solid #ccc',
                                                borderRadius: '4px',
                                                padding: '12px 16px 16px',
                                                margin: 0,
                                                minWidth: 0,
                                            }}
                                        >
                                            <legend
                                                style={{
                                                    padding: '0 8px',
                                                    fontSize: '14px',
                                                    color: '#666',
                                                }}
                                            >
                                                Museum Created Date
                                            </legend>

                                            <Grid container spacing={2}>
                                                <Grid size={{ xs: 12, md: 6 }}>
                                                    <DatePicker
                                                        label="From"
                                                        format="DD/MM/YYYY"
                                                        value={searchParams.cREATE_DT_FROMDATE ? dayjs(searchParams.cREATE_DT_FROMDATE) : null}
                                                        onChange={(event) =>
                                                            setSearchParams((prev) => ({
                                                                ...prev,
                                                                cREATE_DT_FROMDATE: event.startOf('day').toDate() ?? null,
                                                            }))
                                                        }
                                                        slotProps={{
                                                            textField: {
                                                                fullWidth: true,
                                                            },
                                                        }}
                                                    />
                                                </Grid>

                                                <Grid size={{ xs: 12, md: 6 }}>
                                                    <DatePicker
                                                        label="To"
                                                        format="DD/MM/YYYY"
                                                        value={searchParams.cREATE_DT_TODATE ? dayjs(searchParams.cREATE_DT_TODATE) : null}
                                                        onChange={(event) =>
                                                            setSearchParams((prev) => ({
                                                                ...prev,
                                                                cREATE_DT_TODATE: event.startOf('day').toDate() ?? null,
                                                            }))
                                                        }
                                                        slotProps={{
                                                            textField: {
                                                                fullWidth: true,
                                                            },
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </fieldset>
                                    </Grid>
                                </LocalizationProvider>

                                <Grid size={{ xs: 12, md: 4 }}>
                                    {/* {museumStatus.length > 0 &&
                                        <h2>
                                            {museumStatus}
                                        </h2>
                                    } */}
                                    <Autocomplete
                                        options={museumStatus}
                                        getOptionLabel={(option) => option.CONTENT ?? ""}
                                        getOptionValue={(option) => option.CD_VAL}
                                        value={searchParams.sTATUS}
                                        onChange={(_, newValue) => {
                                            console.log("Selected value:", newValue);
                                            setSearchParams((prev) => ({
                                                ...prev,
                                                sTATUS: newValue,
                                            }));
                                        }}
                                        sx={{ pt: 4.2 }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Museum Status" />
                                        )}
                                    />
                                </Grid>

                                {/* Centered buttons */}
                                <Grid
                                    size={12}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: 1,
                                        mt: 1,
                                    }}
                                >
                                    <Button type="submit" variant="contained">
                                        Search
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outlined"
                                        onClick={handleClear}
                                    >
                                        Clear
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
                {/* </Container> */}
                <Card elevation={2}>
                    <CardContent>
                        <Box>
                            <DataTable<IMuseum_model, IMuseum_model>
                                columns={columns}
                                fetchData={handleFetchMuseumsData}
                                externalFilters={appliedSearch}
                                initialPageSize={10}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}


export default MuseumSearch;