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
    validate: {
      title: (value) => (value?.length <= 0)? "Must not be empty" : null,
      roomsStock : (value) => (value < 1 ? "Minimum of 1 room" : null),
      roomsDescription: (value) => validateString(value),
      roomsCapacity : (value) => (value > 10 ? "Maximum of 10 person" : null),    
      price: (value) => (value < 150000 ? "Must be greater than Rp150000" : null),
    },
    transformValues: (values) => ({
      title: values.title,
      description: values.description,
      roomsStock: values.roomsStock,
      roomsDescription: values.roomsDescription,
      roomsCapacity: values.roomsCapacity,
      price: values.price
    }),
  });

  const handleSubmit = () => {
    const values = form.getTransformedValues();
    // Replace this with your actual database update logic
    console.log("Form submitted:", values);
  };

  return (
    <div>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <div className="drop-shadow-xl bg-white border-2 rounded-xl border-gray-500 mb-8 photosTitle text-left text-[20px] font-bold w-full border rounded-[10px] px-4 py-4">
              <div className="text-left text-[30px] font-bold mb-10">
                  Listing basics
              </div>
              <div className="listingName text-left text-[18px]">
                <Box maxWidth="50%" mx="auto" my="md">
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
                </Box>
              </div>
          </div>
          <div className="flex justify-end">
              <button
                  className="submitButton text-[25px] text-white font-bold flex items-center justify-center font-sans h-[45px] w-[200px] rounded-[35px] bg-green-800/70 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl mb-6"
                  type="submit"
              >
                  Submit
              </button>
          </div>
        </form>
    </div>
  );
};

export default BasicDetails;
