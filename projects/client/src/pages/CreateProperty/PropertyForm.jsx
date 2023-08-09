import { useState } from "react";
import { TextInput, Box, Textarea } from "@mantine/core";
import { useForm } from '@mantine/form';
import CategoryListing from "../../components/CategoryListing/CategoryListing";
import FacilitySelect from "../../components/FacilitySelect/FaciltySelect";
import RoomForm from "./RoomForm";
import LocationListing from "../../components/LocationListing/LocationListing";

export default function PropertyForm(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rooms, setRooms] = useState([]);

  const form = useForm({
    initialValues: {
      propertyName: '',
      description: '',
      category: '',
      city: '',
      address: '',
      facilities: []
    },
    validate: {
      propertyName: (value) => (value?.length <= 0)? "Must not be empty" : null,
      description: (value) => (value?.length <= 0)? "Must not be empty" : null,
      category: (value) => (!value)? "Must not be empty" : null,
      city: (value) => (!value)? "Required !" : null,
      address: (value) => (!value)? "Required !" : null
    },
    transformValues: (values) => ({
      propertyName: values.propertyName,
      description: values.description,
      category: values.category,
      city: values.city,
      address: values.address,
      facilities: values.facilities
    }),
  });

  const handleSubmit = () => {
    setIsSubmitting(true);
    const values = form.getTransformedValues();
    if(props?.addProperty) {
      const res = props?.addProperty({property: values, propertyRooms: rooms});
      if(res) {
        form.reset();
      }
    }
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
        <form>
          <div className="drop-shadow-xl bg-white border-2 rounded-xl border-gray-500 mb-8 photosTitle text-left text-[20px] font-bold w-full border rounded-[10px] px-4 py-4">
              <div className="text-left text-[30px] font-bold mb-[20px]">
                  Listing basics
              </div>
              <div className="listingName text-left text-[18px]">
                <Box>
                    <TextInput
                      withAsterisk
                      label="Listing Title"
                      placeholder="Listing title"
                      {...form.getInputProps("propertyName")}
                    />
                    <Textarea
                      placeholder="Description"
                      label="Listing description"
                      withAsterisk
                      {...form.getInputProps("description")}
                    />
                    <CategoryListing
                      form={form}
                    />
                    <LocationListing form={form}/>
                    <Textarea
                      placeholder="Address"
                      label="Address Details"
                      withAsterisk
                      {...form.getInputProps("address")}
                    />
                    <FacilitySelect form={form}/>
                </Box>
                <RoomForm rooms={rooms} setRooms={setRooms}/>
              </div>
          </div>
          <div className="flex justify-end">
              <button
                  disabled={isSubmitting}
                  onClick={form.onSubmit(handleSubmit)}
                  className="submitButton text-[25px] text-white font-bold flex items-center justify-center font-sans h-[45px] w-[200px] rounded-[35px] bg-green-700 hover:bg-green-800 active:bg-green-900 cursor-pointer select-none active:scale-95 active:border-b-[0px] transition-all duration-150 mb-6"
                  type="submit"
              >
                  Submit
              </button>
          </div>
        </form>
  );
};

