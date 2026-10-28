import { useState, useCallback } from 'react';
import {
    Container,
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    TextField, Button
} from "@mui/material";
import type { Column } from '../../../components/DataTables/types';
import type { IMuseum_model } from '../../../api/api-client';
import { Museum_model } from '../../../api/api-client';
import { _MuseumService } from '../../../api/apiClient';
import { DataTable } from '../../../components/DataTables/DataTable';

function MuseumSearch() {
    const [search, setSearch] = useState<IMuseum_model>({
        mUSEUM_ID: '',
        mUSEUM_NAME: '',
        aDDRESS: '',
    });

    // 2. Applied search state (only updates when Search button or Clear is clicked)
    const [appliedSearch, setAppliedSearch] = useState<IMuseum_model>({});

    const columns: Column<IMuseum_model>[] = [
        { key: 'MUSEUM_ID', header: 'ID', sortable: false },
        { key: 'MUSEUM_NAME', header: 'Museum Name', sortable: true },
        { key: 'CITY', header: 'City', sortable: true },
        { key: 'COUNTRY', header: 'Country', sortable: true },
    ];

    const handleFetchMuseums = useCallback(async (params: IMuseum_model) => {
        // Combine pagination/sorting with your explicitly applied search filters
        console.log("DataTable sent these params:", params);
        const searchModel = new Museum_model({
            pageNumber: params.pageNumber,
            pageSize: params.pageSize,
            sortColumn: params.sortColumn,
            sortDirection: params.sortDirection,
            mUSEUM_ID: appliedSearch.mUSEUM_ID,
            mUSEUM_NAME: appliedSearch.mUSEUM_NAME,
            aDDRESS: appliedSearch.aDDRESS,
        });
        console.log("NSwag Museum_model object built:", searchModel);

        // Call your NSwag-generated service using Axios
        const response = await _MuseumService.mUSEUM_SEARCH(searchModel);

        return {
            data: response.result.data || [],
            totalRows: response.result.totalRows || 0,
        };
    }, [appliedSearch]);

    async function handleSearch() {
        setAppliedSearch(search); // Commits input values to API triggers
    }

    const handleClear = () => {
        const emptyState: IMuseum_model = {
            mUSEUM_ID: '',
            mUSEUM_NAME: '',
            aDDRESS: '',
            pageNumber: 1,
            pageSize: 10
        };
        setSearch(emptyState);
        setAppliedSearch(emptyState); // Resets table data
    };


    return (
        <>
            <Box sx={{
                pt: 2,
                pl: 2,
                pr:2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}>
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
                                            label="Museum_Id"
                                            placeholder="Enter Museum Id"
                                            value={search.mUSEUM_ID ?? ''}
                                            onChange={(event) =>
                                                setSearch((prev) => ({
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
                                            value={search.mUSEUM_NAME ?? ''}
                                            onChange={(event) =>
                                                setSearch((prev) => ({
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
                                            value={search.aDDRESS ?? ''}
                                            onChange={(event) =>
                                                setSearch((prev) => ({
                                                    ...prev,
                                                    aDDRESS: event.target.value,
                                                }))
                                            }
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
                <Container>
                    <Card elevation={2}>
                        <CardContent>
                            <Box>
                                <DataTable<IMuseum_model, IMuseum_model>
                                    columns={columns}
                                    fetchData={handleFetchMuseums}
                                    externalFilters={appliedSearch}
                                    initialPageSize={10}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
            {JSON.stringify(search, null, 2)}
        </>
    );
}

export default MuseumSearch
