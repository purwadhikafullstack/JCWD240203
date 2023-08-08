import { TextField, Button } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { createCategory } from "../../redux/features/category/categorySlice";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function AddCategoryModal(props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newType, setNewType] = useState('');
    const call = useDispatch();

    const handleClose = () => {
        if(props?.setShowModal) {props?.setShowModal(false)};
    };

    const AddCategory = async() => {
        setIsSubmitting(true);
        const loading = toast.loading('Adding category ...', {id: 'addingCategory'});
        await call(createCategory({
            type: newType,
            userId: JSON.parse(localStorage.getItem('user')).id,
            token: JSON.parse(localStorage.getItem('user')).token,
            idCard: JSON.parse(localStorage.getItem('user')).idCard
        })).then(
            () => {
                toast.success('New category added !', {id: loading});
                props?.setShowModal(false);
            },
            (error) => {
                toast.error('Unable to add category !', {id: loading});
                console.log(error)
            }
        )
        setIsSubmitting(false);
    };

    return(
        <div className={`${(props?.showModal)? '' : 'hidden'} absolute flex justify-center items-center w-full h-full bg-gray-500/70 z-50 top-0`}>
            <div className="relative flex flex-col w-[300px] h-[200px] bg-white rounded-[10px] px-[10px] py-[20px]">
                <div onClick={handleClose} className="absolute right-[10px] top-[10px] cursor-pointer">
                    <AiOutlineClose size={25}/>
                </div>
                <div className="text-[16px] font-bold">
                    Add a new Category
                </div>
                <div className="flex flex-col h-full w-full justify-center items-center gap-[20px]">
                    <div>
                        <TextField
                        onChange={(e) => setNewType(e.target.value)}
                        value={newType}
                        label='Category'
                        fullWidth
                        size="small"
                        />
                    </div>
                    <div>
                        <Button
                        onClick={AddCategory}
                        disabled={isSubmitting}
                        variant="contained"
                        size="medium"
                        color="success"
                        >
                            Create category
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}