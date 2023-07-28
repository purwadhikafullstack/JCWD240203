import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function SalesFilterBar(props) {
    const handleYearChange = (e) => {if(props?.setYear) {props?.setYear(e.target.value)}};

    const handleStart = (e) => {if(props?.setStartingMonth) {props?.setStartingMonth(e)}};

    const handleEnd = (e) => {if(props?.setEndingMonth) {props?.setEndingMonth(e)}};

    const handleTypeChange = (e) => {if(props?.setType && props?.type !== e.target.value) {props?.setType(e.target.value)}};

    const handleMonth = (e) => {if(props?.setSelectedMonth) {props?.setSelectedMonth(e)}};

    return(
        <div className="flex flex-col md:flex-row items-center justify-center w-full h-auto gap-[20px] rounded-[10px] border-[1px] border-gray-600 py-[15px]">
            <div className="flex gap-[20px]">
                <FormControl className={`w-[125px]`}>
                    <InputLabel size="small">Type:</InputLabel>
                    <Select size='small' label='Type:' value={props?.type} onChange={handleTypeChange} fullWidth>
                        <MenuItem value={'Yearly'}>Yearly</MenuItem>
                        <MenuItem value={'Daily'}>Daily</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{display: `${(props?.type === 'Yearly')? '' : 'none'}`}} className={`w-[125px]`}>
                    <InputLabel size="small">Year:</InputLabel>
                    <Select size='small' label='Year:' value={props?.year} onChange={handleYearChange} fullWidth>
                        <MenuItem value={new Date().getFullYear()}>{new Date().getFullYear()}</MenuItem>
                        <MenuItem value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</MenuItem>
                        <MenuItem value={new Date().getFullYear() - 2}>{new Date().getFullYear() - 2}</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{display: `${(props?.type === 'Daily')? '' : 'none'}`}} className={`w-[125px]`}>
                    <InputLabel size="small">Month:</InputLabel>
                    <Select size='small' label='Month:' defaultValue={""} value={props?.months[props?.selectedMonth]} fullWidth>
                        {
                            props?.months?.map((value, index) => {
                                return(
                                    <MenuItem key={index} onClick={() => handleMonth(index)} value={value}>{value}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </div>
            <div className={`${(props?.type === 'Yearly')? '' : 'hidden'} flex gap-[20px]`}>
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
                                else {return null}
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl className="w-[125px]">
                    <InputLabel size="small">To:</InputLabel>
                    <Select size='small' label='To:' value={props?.months[props?.endingMonth]} fullWidth>
                        {
                            props?.months?.map((value, index) => {
                                if(index > props?.startingMonth) {
                                    return(
                                        <MenuItem key={index} onClick={() => handleEnd(index)} value={value}>{value}</MenuItem>
                                    )
                                }
                                else {return null}
                            })
                        }
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}