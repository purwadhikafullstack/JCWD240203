import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { getCountry } from "../../redux/features/country/countrySlice";
import { Select } from "@mantine/core";

export default function LocationListing({form}) {
    const [locationOptions, setLocationOptions] = useState([]);
    const call = useDispatch();
    
    useEffect(() => {
        call(getCountry()).then(
            (response) => {
                let temp = [];
                for(let countries of response.data.data) {
                    countries.cities.forEach((cities) => {
                        temp.push({label: `${cities.countryCode}/${cities.name}`, value: `${cities.name}`})
                    })
                };
                setLocationOptions(temp);
            },
            (error) => {
                console.log(error);
            }
        )
    }, [call, setLocationOptions])
    return(
        <Select label="Location" placeholder="Pick one"
          data={locationOptions}
          {...form.getInputProps("city")}
          dropdownPosition="bottom"
          transitionProps={{ transition: 'scale-y', duration: 200, timingFunction: 'ease' }}
        />
    )
}