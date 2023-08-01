import { useEffect, useState } from 'react';
import { Select } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/features/category/categorySlice';

function CategoryListing({form}) {
  const [categories, setCategories] = useState([])
  const call = useDispatch();

  useEffect(() => {
    call(getCategories()).then(
      (response) => {
        let temp = [];
        response?.data?.data?.forEach((value) => {
          temp.push({value: value.id, label: value.type});
        })
        setCategories(temp);
      },
      (error) => {console.log(error)}
    );
  }, []);

  return (
    <div>
      <Select
        label="Listing type"
        placeholder="Pick one"
        searchable
        nothingFound="No options"
        data={categories}
        {...form.getInputProps("category")}
      />
    </div>
  );
}

export default CategoryListing;
