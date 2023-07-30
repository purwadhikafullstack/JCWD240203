import React from "react";
import { TextInput, Box, Textarea, Group, Button, NumberInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import CategoryListing from "../CategoryListing/CategoryListing";
import LocationBox from "../../components/LocationBox/locationBox";
import AddressBox from "../../components/AddressBox/AddressBox";
import FacilitySelect from "../../components/FacilitySelect/FaciltySelect";

export const validateString = (value) => {
  return value?.length < 3 || value === null
    ? "Must have at least 3 characters"
    : null;
};

const BasicDetails = ({ nextStep }) => {
  // Replace this dummyData with your actual dummy database or mock data
  const dummyData = {
    title: "1 Bedroom Villa with Private Pool for 2 Pax",
    description:
      "One Bedroom Villas for 2 pax is one type of our villa that can accommodate up to 2 person and free 1 child under 5 years old. It has a private pool right in front of the bedroom. It is suitable for you who want to spend your time with your best friend or your loved one.",
    roomsStock : 5,
    roomsDescription : "a villa with a king sized bed.",
    roomsCapacity : 3,  
    price: 1895000,
  };

  const form = useForm({
    initialValues: {
      title: dummyData.title,
      description: dummyData.description,
      roomsStock : dummyData.roomsStock,
      roomsDescription: dummyData.roomsDescription,
      roomsCapacity : dummyData.roomsCapacity,    
      price: dummyData.price,
    },
    validationRules: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      roomsStock : (value) => (value < 1 ? "Minimum of 1 room" : null),
      roomsDescription: (value) => validateString(value),
      roomsCapacity : (value) => (value > 10 ? "Maximum of 10 person" : null),    
      price: (value) => (value < 150000 ? "Must be greater than Rp150000" : null),
    },
  });

  const handleSubmit = () => {
    const { errors, values } = form.getState();
    if (!errors.title && !errors.description && !errors.price && !errors.guests) {
      // Replace this with your actual database update logic
      console.log("Form submitted:", values);
      nextStep();
    }
  };

  return (
    <Box maxWidth="50%" mx="auto" my="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Listing Title"
          placeholder="Listing title"
          {...form.getInputProps("title")}
        />
        <Textarea
          placeholder="Description"
          label="Listing description"
          withAsterisk
          {...form.getInputProps("description")}
        />
        <CategoryListing
        />
         <NumberInput
          withAsterisk
          label="Number of rooms"
          placeholder="1"
          min={0}
          {...form.getInputProps("roomsStock")}
        />
         <Textarea
          placeholder="Description"
          label="Room's description"
          withAsterisk
          {...form.getInputProps("roomsDescription")}
        />
         <NumberInput
          withAsterisk
          label="Number of guests"
          placeholder="1"
          min={0}
          {...form.getInputProps("roomsCapacity")}
        />
       <TextInput
          withAsterisk
          label="Nightly Price"
          placeholder="Min Rp150,000"
          {...form.getInputProps("price")}
        />
        <LocationBox />
        <AddressBox />
        <FacilitySelect />    
      </form>
    </Box>
  );
};

export default BasicDetails;
