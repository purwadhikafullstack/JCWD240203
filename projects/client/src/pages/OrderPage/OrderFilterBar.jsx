import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function OrderFilterBar(props) {
    const handleChangeStatus = (e) => {if(props?.setStatus) {props?.setStatus(e.target.value)}};

    const handleChangeMonth = (value) => {if(props?.setMonth) {props?.setMonth(value)}}

    return(
        <div className="flex items-center justify-center w-full h-[65px] gap-[20px] rounded-[10px] border-gray-600 border-[1px] mb-[10px]">
            <FormControl className="w-[125px]">
                <InputLabel size="small" >Month:</InputLabel>
                <Select size="small" label={'Month:'} value={props?.months[props?.month]} fullWidth>
                    {
                        props?.months?.map((value, index) => {
                            return(
                                <MenuItem key={index} onClick={() => handleChangeMonth(index)} value={value}>{value}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
            <FormControl className="w-[125px]">
                <InputLabel size="small" >Status:</InputLabel>
                <Select size="small" label={'Status:'} onChange={handleChangeStatus} value={props?.status} fullWidth>
                    <MenuItem value={'all'}>all</MenuItem>
                    <MenuItem value={'cancelled'}>cancelled</MenuItem>
                    <MenuItem value={'pending'}>pending</MenuItem>
                    <MenuItem value={'completed'}>completed</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}