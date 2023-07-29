import React from 'react';
import { Select } from '@mantine/core';

function CategoryListing() {
  return (
    <div>
      <Select
        label="Listing type"
        placeholder="Pick one"
        searchable
        nothingFound="No options"
        data={['Hotel', 'Villa', 'Beach', 'Cabin']}
      />
    </div>
  );
}

export default CategoryListing;
