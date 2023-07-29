import { useState } from "react";
import { Card, CardBody } from "@material-tailwind/react";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../../redux/features/review/reviewSlice";
import { toast } from "react-hot-toast";

export default function CustomerReview(props) {
    const [rating, setRating] = useState(0);
    const start = useSelector((state) => state.property.start);
    const end = useSelector((state) => state.property.end);
    const [description, setDescription] = useState('');
    const call = useDispatch();

    const handleChangeDesc = (e) => {
        setDescription(e.target.value);
    };

    const handleChangeRating = (value) => {
        setRating(value);
    };

    const handlePostReview = () => {
        if(localStorage.getItem('user')) {
            const loading = toast.loading('Posting review ...');
            call(postReview({
               userId: JSON.parse(localStorage.getItem('user')).id,
               propertyId: props?.property?.id,
               rating: rating,
               description: description
            })).then(
                () => {
                    toast.success('Review posted !', {id: loading});
                    if(props?.setLoad) {props?.setLoad(!props?.load)};
                },
                (error) => {console.log(error)}
            )
        }
    };
    return (
        <Card className="w-full drop-shadow-2xl bg-white rounded-[10px] p-[5px]">
            <CardBody>
                <div className="flex gap-1.5 justify-between items-center text-[17px] text-left">
                    <div className="flex gap-[10px] items-center">
                        <div>
                            <AiFillStar size={30}/>
                        </div>
                        <div className="text-[24px] font-bold">
                            {props?.average || 0}
                        </div>
                    </div>
                    <div className="text-[24px] font-bold">
                        {props?.reviews?.length || 0} reviews
                    </div>
                </div>
                <div className="flex flex-col gap-[10px]">
                    <div className={`${(Object.keys(props?.currentUser).length > 0 && !props?.hasReviewed)? '' : 'hidden'} flex flex-col bg-gray-200 rounded-[10px] p-[10px] gap-[10px]`}>
                        <div className="flex gap-[5px]">
                            {
                                [...Array(5)].map((value, index) => {
                                    if(index + 1 <= rating) {
                                        return(
                                            <div key={index} className="cursor-pointer" onClick={() => handleChangeRating(index + 1)}>
                                                <AiFillStar size={25}/>
                                            </div>
                                        )
                                    }
                                    else {
                                        return(
                                            <div key={index} className="cursor-pointer" onClick={() => handleChangeRating(index + 1)}>
                                                <AiOutlineStar size={25}/>
                                            </div>
                                        )
                                    }
                                        
                                })
                            }
                        </div>
                        <div className="w-full text-start">
                            <textarea maxLength={255} value={description} onChange={handleChangeDesc} className="w-full min-h-[100px] border-[1px] border-gray-600 resize-none rounded-[5px] p-[5px]"/>
                        </div>
                        <div className="flex justify-end w-full">
                            <button onClick={handlePostReview} className="w-[125px] h-[45px] bg-green-500 rounded-[5px] transition-all duration-400 hover:bg-green-600 active:bg-green-700 active:scale-95">
                                Post Review
                            </button>
                        </div>
                    </div>
                    {
                        props?.reviews?.map((value, index) => {
                            return(
                                <div key={index} className="bg-gray-200 rounded-[10px] p-[10px]">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-[10px] items-center">
                                            <div className="rounded-full overflow-hidden w-[35px] h-[35px]">
                                                <img src={value?.user?.profilePicture} alt="" className="w-full h-full object-cover"/>
                                            </div>
                                            <div>
                                                {value?.user?.username || ''}
                                            </div>
                                        </div>
                                        <div className="flex gap-[5px]">
                                            {
                                                [...Array(value?.rating)].map((value, index) => {
                                                    return(
                                                        <AiFillStar size={25} key={index}/>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="w-full text-start">
                                        <textarea maxLength={255} value={value?.description} disabled className="w-full min-h-[100px] resize-none rounded-[5px] p-[5px]"/>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </CardBody>
        </Card>
    )
}