import { TextInput, Textarea, List, Select } from "@mantine/core";
import { useForm } from '@mantine/form';
import UpdateRoomPreview from "./UpdateRoomPreview";
import { useState } from "react";

export default function UpdateRoomForm(props) {
    const [selectedRoom, setSelectedRoom] = useState({});
    const [selectedRoomIndex, setSelectedRoomIndex] = useState(-1);
    const form = useForm({
        initialValues: {
          roomName : '',
          roomStock : 1,
          roomDescription: '',
          roomCapacity : '',    
          price: '',
        },
        validate: {
          roomName: (value) => (value?.length < 1)? "Cannot be empty" : null,
          roomStock : (value) => (value < 1 ? "Minimum of 1 room" : null),
          roomDescription: (value) => (value?.length <= 0)? "Minimum 10 characters" : null,
          roomCapacity : (value) => (value > 10 || value <= 0 ? "Minimum capacity is 1 to 10 person" : null),    
          price: (value) => ((isNaN(value) || Number(value)) < 1000 ? "Minimum price 1000" : null),
        },
        transformValues: (values) => ({
          roomName: values.roomName,
          roomStock: values.roomStock,
          roomDescription: values.roomDescription,
          roomCapacity: values.roomCapacity,
          price: values.price
        })
      })

      const handleRoomClick = (value, index) => {
        setSelectedRoom(value);
        setSelectedRoomIndex(index);
        form.setValues({
          roomName: value?.name,
          roomStock: value?.stock,
          roomDescription: value?.description,
          roomCapacity: value?.capacity,
          price: value?.price
        });
      }

      const onSaveChanges = () => {
        if(selectedRoomIndex !== -1) {
          const data = form.getTransformedValues();
          const formatted = formatRoomData(data);
          if(props?.setRooms && props?.rooms) {
            let temp = [...props?.rooms];
            temp.splice(selectedRoomIndex, 1, formatted)
            props?.setRooms(temp);
          }
          setSelectedRoom({});
          setSelectedRoomIndex(-1);
          form.reset();
        }
      }

      const formatRoomData = (data) => {
        let temp = {...selectedRoom};
        temp.name = data.roomName;
        temp.stock = data.roomStock;
        temp.capacity = data.roomCapacity;
        temp.description = data.roomDescription;
        temp.price = Number(data.price);
        return temp;
      }

      const addRoom = () => {
          if(props?.setRooms && props?.rooms) {
              const {roomName, roomStock, roomDescription, roomCapacity, price} = form.getTransformedValues();
              let temp = props?.rooms;
              temp.push({
                  name: roomName,
                  description: roomDescription,
                  stock: roomStock,
                  price: Number(price),
                  capacity: roomCapacity,
                  deleted: 'false'
              })
              props?.setRooms(temp);
              form.reset();
          }
      }

      return(
          <div className="w-full mt-[10px] rounded-[10px]">
            <div>
                All rooms :
            </div>
            <div className="w-full h-[250px] mt-[10px] rounded-[5px] border-[1px] border-gray-600">
              <List className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center w-full h-full gap-[15px] overflow-y-auto mobileScroll removeScroll px-[10px] py-[5px]">
                  {
                      props?.rooms?.map((value, index) => {
                          return(
                          <div key={index} className="w-full h-[200px]">
                              <UpdateRoomPreview handleRoomClick={handleRoomClick} data={value} index={index} rooms={props?.rooms} setRooms={props?.setRooms}/>
                          </div>
                          )
                      })
                  }
              </List>
            </div>
            <TextInput
              placeholder="Name of the room"
              label="Room name"
              withAsterisk
              {...form.getInputProps("roomName")}
            />
            <TextInput
              withAsterisk
              label="Total rooms"
              placeholder="1"
              error={form.getInputProps("roomStock").error}
              value={form.getInputProps("roomStock").value}
              onChange={(e) => {if(!isNaN(e.target.value)) {form.getInputProps("roomStock").onChange(e)}}}
              onBlur={form.getInputProps("roomStock").onBlur}
              onFocus={form.getInputProps("roomStock").onFocus}
            />
            <Textarea
              placeholder="Description"
              label="Room's description"
              withAsterisk
              {...form.getInputProps("roomDescription")}
            />
            <Select
              label="Room capacity"
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              data={[{value: 1, label: '1'}, {value: 2, label: '2'}, {value: 3, label: '3'}, {value: 4, label: '4'}, {value: 5, label: '5'}]}
              {...form.getInputProps("roomCapacity")}
              dropdownPosition="bottom"
              transitionProps={{ transition: 'scale-y', duration: 200, timingFunction: 'ease' }}
            />
            <TextInput
              withAsterisk
              label="Nightly Price"
              placeholder="Min 1000"
              error={form.getInputProps("price").error}
              value={form.getInputProps("price").value}
              onChange={(e) => {if(!isNaN(e.target.value)) {form.getInputProps("price").onChange(e)}}}
              onBlur={form.getInputProps("price").onBlur}
              onFocus={form.getInputProps("price").onFocus}
            />
            <div className="flex mt-[10px] w-full justify-end">
              {
                (Object.keys(selectedRoom)?.length > 0)?
                <button onClick={form.onSubmit(onSaveChanges)} className="flex items-center justify-center w-[125px] h-[45px] bg-green-500 transition-all duration-400 rounded-[5px] hover:bg-green-600 active:bg-green-700 active:scale-95">
                  Save Changes
                </button>
                :
                <button onClick={form.onSubmit(addRoom)} className="flex items-center justify-center w-[125px] h-[45px] bg-green-500 transition-all duration-400 rounded-[5px] hover:bg-green-600 active:bg-green-700 active:scale-95">
                  Add room
                </button>
              }
            </div>
          </div>
      )
}