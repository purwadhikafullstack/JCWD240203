import { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MultiSelect, Box, CloseButton, SelectItemProps, MultiSelectValueProps, rem, Flex } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { getFacility } from '../../redux/features/facility/facilitySlice';

// function Value({ label, onRemove }) {
//   return (
//     <div>
//       <Box
//         sx={(theme) => ({
//           display: 'flex',
//           cursor: 'default',
//           alignItems: 'center',
//           backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
//           border: `${rem(1)} solid ${
//             theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[4]
//           }`,
//           paddingLeft: theme.spacing.xs,
//           borderRadius: theme.radius.sm,
//         })}
//       >
//         <Box sx={{ lineHeight: 1, fontSize: rem(12) }}>{label}</Box>
//         <CloseButton
//           onMouseDown={onRemove}
//           variant="transparent"
//           size={22}
//           iconSize={14}
//           tabIndex={-1}
//         />
//       </Box>
//     </div>
//   );
// }

// Value.propTypes = {
//   value: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   onRemove: PropTypes.func.isRequired,
//   classNames: PropTypes.object.isRequired,
// };

// const Item = forwardRef(({ label, value, ...others }, ref) => {
//   return (
//     <div ref={ref} {...others}>
//       <Flex align="center">
//         <div>{label}</div>
//       </Flex>
//     </div>
//   );
// });

// Item.propTypes = {
//   label: PropTypes.string.isRequired,
//   value: PropTypes.string.isRequired,
// };

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
    />
  );
}
