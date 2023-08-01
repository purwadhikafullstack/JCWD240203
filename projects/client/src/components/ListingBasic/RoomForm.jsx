import { TextInput, Textarea, NumberInput, List } from "@mantine/core";
import { useForm } from '@mantine/form';
import RoomPreview from "./RoomPreview";

export default function RoomForm(props) {
    const form = useForm({
        initialValues: {
          roomName : '',
          roomsStock : '',
          roomsDescription: '',
          roomsCapacity : '',    
          price: '',
        },
        validate: {
          roomName: (value) => (value?.length <= 5)? "Minimum 5 characters" : null,
          roomsStock : (value) => (value < 1 ? "Minimum of 1 room" : null),
          roomsDescription: (value) => (value?.length <= 0)? "Minimum 10 characters" : null,
          roomsCapacity : (value) => (value > 10 || value <= 0 ? "Minimum capacity is 1 to 10 person" : null),    
          price: (value) => ((isNaN(value) || Number(value)) < 1000 ? "Minimum price 1000" : null),
        },
        transformValues: (values) => ({
          roomName: values.roomName,
          roomsStock: values.roomsStock,
          roomsDescription: values.roomsDescription,
          roomsCapacity: values.roomsCapacity,
          price: values.price
        }),
      })

    const addRoom = () => {
        if(props?.setRooms && props?.rooms) {
            const {roomName, roomsStock, roomsDescription, roomsCapacity, price} = form.getTransformedValues();
            let temp = props?.rooms;
            temp.push({
                name: roomName,
                description: roomsDescription,
                stock: roomsStock,
                price: Number(price),
                capacity: roomsCapacity
            })
            props?.setRooms(temp);
            form.reset();
        }
    }
    return(
        <form className="w-full mt-[10px] border-[1px] border-gray-600 rounded-[10px] p-[10px]">
            Add rooms
          <div className="text-[20px]">
          </div>
          <TextInput
            placeholder="Name of the room"
            label="Room name"
            withAsterisk
            {...form.getInputProps("roomName")}
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
            placeholder="Min 1000"
            error={form.getInputProps("price").error}
            value={form.getInputProps("price").value}
            onChange={(e) => {if(!isNaN(e.target.value)) {form.getInputProps("price").onChange(e)}}}
            onBlur={form.getInputProps("price").onBlur}
            onFocus={form.getInputProps("price").onFocus}
          />
          <div className="flex mt-[10px] w-full justify-end">
            <button onClick={form.onSubmit(addRoom)} className="flex items-center justify-center w-[125px] h-[45px] bg-green-500 transition-all duration-400 rounded-[5px] hover:bg-green-600 active:bg-green-700 active:scale-95">
              Add room
            </button>
          </div>
            <div>
                Room preview :
            </div>
          <div className="w-full h-[250px] mt-[10px] rounded-[5px] border-[1px] border-gray-600">
            <List className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center w-full h-full gap-[15px] overflow-y-scroll md:overflow-y-auto mobileScroll">
                {
                    props?.rooms?.map((value, index) => {
                        return(
                        <div key={index} className="w-full h-[200px]">
                            <RoomPreview data={value} index={index} rooms={props?.rooms} setRooms={props?.setRooms}/>
                        </div>
                        )
                    })
                }
            </List>
          </div>
        </form>
    )
}