import { useEffect, useState } from 'react';
import { Select } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/features/category/categorySlice';

function CategoryListing({form, showModal, setShowModal}) {
  const [categories, setCategories] = useState([])
  const call = useDispatch();

  const handleChange = (value) => {
    if(value === 'Add new') {
      if(setShowModal) {setShowModal(!showModal)};
    } 
    else {
      form.getInputProps("category").onChange(value);
    }
  }

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
        nothingFound="No options"
        data={categories}
        error={form.getInputProps("category").error}
        value={form.getInputProps("category").value}
        onChange={(e) => {handleChange(e)}}
        onBlur={form.getInputProps("category").onBlur}
        onFocus={form.getInputProps("category").onFocus}
      />
    </div>
  );
}

export default CategoryListing;
