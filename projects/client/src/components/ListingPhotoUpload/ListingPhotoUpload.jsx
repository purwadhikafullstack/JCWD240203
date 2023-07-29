import { Container, Text, List } from "@mantine/core";
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FileButton, Button } from "@mantine/core";
import './ListingPhotoUpload'

const ListingPhotoUpload = () => {
  const { user } = useAuth0();
  const [image, setImage] = useState(null);
  const [files, setFiles] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    }
  };

  return (
    <div className="flexColCenter uploadWrapper">
      {image ? (
        <div className="uploadedImage">
          <img src={image} alt="Uploaded" />
        </div>
      ) : (
        <div className="flexColCenter uploadZone">
          <AiOutlineCloudUpload size={100} color="grey" />
          <span>Upload Image</span>
          <FileButton
            style={{ display: "block", background: "#0ca678", marginTop: "10px", width: "150px" }}
            onChange={(files) => {
              setFiles(files);
            }}
            accept="image/png,image/jpeg"
            multiple
          >
            {(props) => <Button {...props} className="rounded-[20px] text-[18px] font-bold bg-green-800/70 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl">Browse</Button>}
          </FileButton>
        </div>
      )}

      <Container position="center" mt="sm">
        {files.length > 0 && <Text size="sm">Picked files:</Text>}
      </Container>

      <List size="sm" mt={5} withPadding>
        {files.map((file, index) => (
          <List.Item key={index}>{file.name}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default ListingPhotoUpload;
