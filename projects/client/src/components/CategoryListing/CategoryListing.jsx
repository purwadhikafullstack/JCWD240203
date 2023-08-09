import { useEffect, useState } from 'react';
import { Select } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/features/category/categorySlice';

function CategoryListing({form, showModal, setShowModal}) {
  const rawData = useSelector((state) => state.category.category);
  const [categories, setCategories] = useState([]);
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
      () => {},
      (error) => {console.log(error)}
    );
  }, [call]);

  useEffect(() => {
    let temp = [];
    rawData?.forEach((value) => {
      temp.push({value: value.id, label: value.type});
    })
    temp.push({value: 'Add new', label: 'Add new'});
    setCategories(temp);
  }, [rawData]);

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
