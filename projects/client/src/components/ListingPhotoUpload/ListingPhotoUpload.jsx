import { Text, List } from "@mantine/core";
//import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FileButton, Button } from "@mantine/core";
import { toast } from "react-hot-toast";
import './ListingPhotoUpload'

const ListingPhotoUpload = ({image, setImage}) => {
  // const { user } = useAuth0();

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       setImage(reader.result);
  //     };
  //   }
  // };

  return (
    <div className="flex h-[225px]">
      <div className="flex flex-col justify-center items-center w-[150px]">
        <AiOutlineCloudUpload size={100} color="grey" />
        <span>Upload Image</span>
        <FileButton
          style={{ display: "block", background: "#0ca678", marginTop: "10px", width: "150px" }}
          onChange={(files) => {
            if(files.length <= 6) {setImage(files)}
            else {toast.error('max 6 photos')}
          }}
          accept="image/png,image/jpeg"
          multiple
          
        >
          {(props) => <Button {...props} className="rounded-[20px] text-[18px] font-bold bg-green-800/70 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl">Browse</Button>}
        </FileButton>
      </div>
      <div className="flex flex-col w-full h-full px-[10px]">
        <div>
          {image?.length > 0 && <Text size="sm">Picked files:</Text>}
        </div>

        <List size="sm" mt={5} className="grid grid-cols-2 lg:grid-cols-4 gap-[10px] w-full h-full overflow-y-scroll md:overflow-y-auto mobileScroll">
          {image?.map((file, index) => (
            <div key={index} className="w-[75px] h-[75px] md:w-[175px] md:h-[175px] border-[1px] border-gray-600">
              <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover"/>
            </div>
          ))}
        </List>
      </div>
    </div>
  );
};

export default ListingPhotoUpload;
