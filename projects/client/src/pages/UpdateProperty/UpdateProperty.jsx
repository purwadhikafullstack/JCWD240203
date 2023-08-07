import { useEffect, useState } from "react";
import { TextInput, Box, Textarea, Select } from "@mantine/core";
import { useForm } from '@mantine/form';
import CategoryListing from "../../components/CategoryListing/CategoryListing";
import FacilitySelect from "../../components/FacilitySelect/FaciltySelect";
import LocationListing from "../../components/LocationListing/LocationListing";
import UpdateRoomForm from "./UpdateRoom";

export default function UpdateForm(props) {
  const [rooms, setRooms] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const statuses = [{value: 'Public', label: 'Public'}, {value: 'Private', label: 'Private'}];
  const form = useForm({
    initialValues: {
      propertyName: '',
      description: '',
      category: '',
      city: '',
      address: '',
      facilities: [],
      status: ''
    },
    validate: {
      propertyName: (value) => (value?.length <= 0)? "Must not be empty" : null,
      description: (value) => (value?.length <= 0)? "Must not be empty" : null,
      category: (value) => (!value)? "Must not be empty" : null,
      city: (value) => (!value)? "Required !" : null,
      address: (value) => (!value)? "Required !" : null,
      status: (value) => (!value)? "Required !" : null
    },
    transformValues: (values) => ({
      propertyName: values.propertyName,
      description: values.description,
      category: values.category,
      city: values.city,
      address: values.address,
      facilities: values.facilities,
      status: values.status
    }),
  });

  const handleSubmit = () => {
    setIsSubmitting(true);
    const values = form.getTransformedValues();
    if(props?.onSaveChanges) {
      const res = props?.onSaveChanges({property: values, propertyRooms: rooms});
      if(res) {
        form.reset();
      }
    }
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  useEffect(() => {
    if(Object.keys(props?.property).length > 0) {
          let temp = [];
          props?.property?.propertyFacilities?.forEach((value) => {
            temp.push(value.facilityId);
          });
          form.setValues({
            propertyName: props?.property?.name,
            description: props?.property?.description,
            category: props?.property?.category?.id,
            city: props?.property?.city,
            address: props?.property?.address,
            status: props?.property?.status,
            facilities: temp
          })
          setRooms(props?.property?.rooms);
    }
  }, [props?.property])

  return (
        <form>
              <div className="drop-shadow-xl bg-white border-2 rounded-xl border-gray-500 mb-8 photosTitle text-left text-[20px] font-bold w-full border rounded-[10px] px-4 py-4">
                  <div className="text-left text-[30px] font-bold mb-[10px]">
                      Property details
                  </div>
                  <div className="listingName text-left text-[18px]">
                    <Box>
                        <TextInput
                          label="Listing Title"
                          placeholder="Listing title"
                          withAsterisk
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
                        <Select
                          placeholder="Pick one"
                          label="Status"
                          data={statuses}
                          withAsterisk
                          {...form.getInputProps("status")}
                        />
                    </Box>
                      <div>
                        <div className="text-left text-[30px] font-bold my-[10px]">
                          Room Details
                        </div>
                        <UpdateRoomForm property={props?.property} rooms={rooms} setRooms={setRooms}/>
                      </div>
                  </div>
              </div>
              <div className="flex justify-end">
                  <button
                      disabled={isSubmitting}
                      onClick={form.onSubmit(handleSubmit)}
                      className="submitButton text-[25px] text-white font-bold flex items-center justify-center font-sans h-[45px] w-[200px] rounded-[35px] bg-green-700 hover:bg-green-800 active:bg-green-900 cursor-pointer select-none active:scale-95 active:border-b-[0px] transition-all duration-150 mb-[20px]"
                      type="submit"
                  >
                      Save Changes
                  </button>
              </div>
        </form>
  );
};
