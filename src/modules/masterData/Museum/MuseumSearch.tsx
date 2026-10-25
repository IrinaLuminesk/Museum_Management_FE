import { useState } from 'react';
// import {
//     Box,
//     Button,
//     Card,
//     CardContent,
//     Divider,
//     Stack,
//     TextField,
//     Typography,
// } from '@mui/material';
import {
    Container,
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Stack,
    Divider,
    TextField, Typography, Button
} from "@mui/material";
import type { IMuseum_model } from '../../../api/api-client';
import { Museum_model } from '../../../api/api-client';
import { _MuseumService } from '../../../api/apiClient';
function MuseumSearch() {
    const [search, setSearch] = useState<IMuseum_model>({
        pageNumber: 1,
        pageSize: 10
    });

    async function handleSearch() {
        const response = await _MuseumService.mUSEUM_SEARCH(new Museum_model(search));
        console.log(typeof(response));
    }

    const handleCreate = () => {
        // TODO: Navigate to the museum creation page
        console.log('Create museum');
    };

    const handleClear = () => {
        setSearch({
            pageNumber: 1,
            pageSize: 10
        });
    };

    return (
        <>
            <Box sx={{
                pt: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}>
                {/* Search Critera */}
                <Container>
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
                </Container>
                <Container>
                    <Card elevation={2}>
                        <CardContent>
                            <Box>
                                Hello
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
