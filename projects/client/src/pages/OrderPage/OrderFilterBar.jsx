import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function OrderFilterBar(props) {
    const currentYear = new Date().getFullYear();

    const handleChangeYear = (e) => {
        if(props?.setYear) {props?.setYear(e.target.value)};
        if(props?.setLoading) {props?.setLoading(true)};
    };

    const handleChangeStatus = (e) => {
        if(props?.setStatus) {props?.setStatus(e.target.value)};
        if(props?.setLoading) {props?.setLoading(true)}
    };

    const handleChangeMonth = (value) => {
        if(props?.setMonth) {props?.setMonth(value)};
        if(props?.setLoading) {props?.setLoading(true)}
    };

    return(
        <div className="flex items-center justify-center w-full h-[65px] gap-[20px] rounded-[10px] border-gray-600 border-[1px] mb-[10px] px-[10px]">
            <FormControl className="w-[75px] sm:w-[100px] md:w-[125px]">
                <InputLabel size="small" >Year:</InputLabel>
                <Select size="small" label={'Year:'} onChange={handleChangeYear} value={props?.year} fullWidth>
                    <MenuItem value={currentYear}>{currentYear}</MenuItem>
                    <MenuItem value={currentYear - 1}>{currentYear - 1}</MenuItem>
                    <MenuItem value={currentYear - 2}>{currentYear - 2}</MenuItem>
                    <MenuItem value={currentYear - 3}>{currentYear - 3}</MenuItem>
                </Select>
            </FormControl>
            <FormControl className="w-[75px] sm:w-[100px] md:w-[125px]">
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
            <FormControl className="w-[75px] sm:w-[100px] md:w-[125px]">
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