import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { MultiSelect, Box, CloseButton, SelectItemProps, MultiSelectValueProps, rem, Flex } from '@mantine/core';

const facilitiesData = [
  { label: 'Pool', value: 'Pool' },
  { label: 'Wifi', value: 'Wifi' },
  { label: 'TV', value: 'TV' },
  { label: 'Air conditioning', value: 'AC' },
  { label: 'CCTV', value: 'CCTV' },
  { label: 'Free Parking', value: 'Free Parking' },
  { label: 'Pets Allowed', value: 'Pets' },
  { label: 'Breakfast', value: 'Breakfast' },
  { label: 'Bathup', value: 'Bathup' },
];

function Value({ value, label, onRemove, classNames, ...others }) {
  return (
    <div {...others}>
      <Box
        sx={(theme) => ({
          display: 'flex',
          cursor: 'default',
          alignItems: 'center',
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          border: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[4]
          }`,
          paddingLeft: theme.spacing.xs,
          borderRadius: theme.radius.sm,
        })}
      >
        <Box sx={{ lineHeight: 1, fontSize: rem(12) }}>{label}</Box>
        <CloseButton
          onMouseDown={onRemove}
          variant="transparent"
          size={22}
          iconSize={14}
          tabIndex={-1}
        />
      </Box>
    </div>
  );
}

Value.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  classNames: PropTypes.object.isRequired,
};

const Item = forwardRef(({ label, value, ...others }, ref) => {
  return (
    <div ref={ref} {...others}>
      <Flex align="center">
        <div>{label}</div>
      </Flex>
    </div>
  );
});

Item.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

function FacilitySelect() {
  return (
    <MultiSelect
      data={facilitiesData}
      limit={20}
      valueComponent={Value}
      itemComponent={Item}
      searchable
      defaultValue={['Pool', 'Wifi']}
      placeholder="These are facilities that guests typically look for in a stay."
      label="What exciting facilities does your listing offer?"
    />
  );
}

export default FacilitySelect;
