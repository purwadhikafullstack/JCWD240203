import { useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCountry } from "../../redux/features/country/countrySlice";
import { Autocomplete } from "@mui/lab";
import { setLocation } from "../../redux/features/property/propertySlice";

export default function LocationBox(props) {
    const [locationOptions, setLocationOptions] = useState([]);
    const location = useSelector((state) => state.property.location);
    const call = useDispatch();

    const handleChange = (event, value) => {
        call(setLocation(value.value));
    };

    useEffect(() => {
        call(getCountry()).then(
            (response) => {
                let temp = [];
                for(let countries of response.data.data) {
                    countries.cities.forEach((cities) => {
                        temp.push({label: `${cities.countryCode}/${cities.name}`, value: `${cities.countryCode}/${cities.name}`})
                    })
                }
                setLocationOptions(temp);
            },
            (error) => {
                console.log(error);
            }
        )
    }, [call])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "10px",
                width: "100%",
                py: 2
            }}
        >
            <Typography
                variant="subtitle1"
                color="textSecondary"
                fontWeight="bold"
                sx={{ marginBottom: 1 }}
            >
                LOCATION
            </Typography>
            <Autocomplete
                className="locationOptions"
                freeSolo
                value={{label: location}}
                options={locationOptions}
                onChange={handleChange}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label=""
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
        </Box>
    );
}

