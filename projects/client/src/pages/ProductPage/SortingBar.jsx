import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { setSort, setType } from "../../redux/features/property/propertySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../../redux/features/category/categorySlice";

export default function SortingBar(props) {
    const categories = useSelector((state) => state.category.category);
    const sort = useSelector((state) => state.property.sort);
    const type = useSelector((state) => state.property.type);
    const call = useDispatch();

    const handleChangeSort = (e) => {
        call(setSort(e.target.value));
        if(props?.setLoading) {props?.setLoading(true)};
    };
    const handleChangeType = (e) => {
        call(setType(e.target.value));
        if(props?.setLoading) {props?.setLoading(true)};
    };

    useEffect(() => {
        call(getCategories()).then(
            () => {},
            (error) => {console.log(error)}
        )
    }, [call])

    return(
        <div className="flex gap-[20px] w-full">
            <div className="w-[150px]">
                <FormControl fullWidth>
                    <InputLabel id="sortByLabel" size="small">Sort by:</InputLabel>
                    <Select id="sortByLabel" label='Sort by:' onChange={handleChangeSort} value={sort} fullWidth size="small">
                        <MenuItem value={'Price'}>Price</MenuItem>
                        <MenuItem value={'Review'}>Review</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="w-[150px]">
                <FormControl fullWidth>
                    <InputLabel id="sortByLabel" size="small">Category:</InputLabel>
                    <Select id="sortByLabel" label='Category:' onChange={handleChangeType} value={type} fullWidth size="small">
                        <MenuItem value={'All'}>All</MenuItem>
                        {
                            categories?.map((value, index) => {
                                return(
                                    <MenuItem key={index} value={value?.type}>{value?.type}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}