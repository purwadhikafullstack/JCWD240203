import { useEffect, useState } from 'react';
import { MultiSelect } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { getFacility } from '../../redux/features/facility/facilitySlice';

export default function FacilitySelect({form}) {
  const [facilitiesData, setFacilitiesData] = useState([]);
  const call = useDispatch();

  useEffect(() => {
    call(getFacility()).then(
      (response) => {
        let temp = [];
        response?.data?.data?.forEach((value) => {
          temp.push({value: value.id, label: value.name})
        });
        setFacilitiesData(temp);
      },
      (error) => {console.log(error)}
    )
  }, [call])
  
  return (
    <MultiSelect
      data={facilitiesData}
      limit={20}
      searchable
      {...form.getInputProps("facilities")}
      placeholder="These are facilities that guests typically look for in a stay."
      label="What exciting facilities does your listing offer?"
      dropdownPosition="bottom"
      transitionProps={{ transition: 'scale-y', duration: 200, timingFunction: 'ease' }}
    />
  );
}
