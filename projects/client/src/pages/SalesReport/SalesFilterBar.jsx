import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function SalesFilterBar(props) {
    const handleYearChange = (e) => {if(props?.setYear) {props?.setYear(e.target.value)}};

    const handleStart = (e) => {if(props?.setStartingMonth) {props?.setStartingMonth(e)}};

    const handleEnd = (e) => {if(props?.setEndingMonth) {props?.setEndingMonth(e)}};

    return(
        <div className="flex items-center justify-center w-full h-[75px] gap-[20px] rounded-[10px] border-[1px] border-gray-600">
            <FormControl className="w-[125px]">
                <InputLabel size="small">Year</InputLabel>
                <Select size='small' label='Year' value={props?.year} onChange={handleYearChange} fullWidth>
                    <MenuItem value={new Date().getFullYear()}>{new Date().getFullYear()}</MenuItem>
                    <MenuItem value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</MenuItem>
                    <MenuItem value={new Date().getFullYear() - 2}>{new Date().getFullYear() - 2}</MenuItem>
                </Select>
            </FormControl>
            <FormControl className="w-[125px]">
                <InputLabel size="small">From:</InputLabel>
                <Select size='small' label='From:' defaultValue={""} value={props?.months[props?.startingMonth]} fullWidth>
                    {
                        props?.months?.map((value, index) => {
                            if(index < props?.endingMonth) {
                                return(
                                    <MenuItem key={index} onClick={() => handleStart(index)} value={value}>{value}</MenuItem>
                                )
                            }
                        })
                    }
                </Select>
            </FormControl>
            <FormControl className="w-[125px]">
                <InputLabel size="small">To:</InputLabel>
                {console.log(props?.months[props?.endingMonth])}
                <Select size='small' label='To:' value={props?.months[props?.endingMonth]} fullWidth>
                    {
                        props?.months?.map((value, index) => {
                            if(index > props?.startingMonth) {
                                return(
                                    <MenuItem key={index} onClick={() => handleEnd(index)} value={value}>{value}</MenuItem>
                                )
                            }
                        })
                    }
                </Select>
            </FormControl>
        </div>
    )
}