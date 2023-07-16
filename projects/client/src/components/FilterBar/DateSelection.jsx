import { DayPicker } from "react-day-picker";
import { useDispatch, useSelector } from "react-redux";
import { setStart, setEnd } from "../../redux/features/property/propertySlice";
import { format } from "date-fns";
import 'react-day-picker/dist/style.css';

export default function DateSelection(props) {
    const start = useSelector((state) => state.property.start);
    const end = useSelector((state) => state.property.end);
    const call = useDispatch();

    const formatDate = (date) => {
        return format(date, "MM/dd/yyyy");
    };

    const handleSelect = (date) => {
        if(date?.from && date?.to) {
            if(new Date(date.from).getTime() <= new Date(date.to).getTime()) {
                call(setStart(formatDate(date.from)));
                call(setEnd(formatDate(date.to)));
            }
            else {
                call(setStart(formatDate(date.to)));
                call(setEnd(formatDate(date.from)));
            }
        }
        else if(date?.from) {
            call(setStart(formatDate(date.from)));
            call(setEnd(formatDate(date.from)));
        }
        else {
            call(setEnd(start))
        }
    }

    const handleClose = () => {
        if(props.toggleDate) {
            props.toggleDate(false) 
        }
    };

    return(
        <div className={`${(props.date)? 'h-[400px] border-b-[1px] border-black' : 'h-0'} z-[2] top-0 absolute transition-all duration-400 whitespace-nowrap overflow-hidden flex justify-center w-full bg-gray-300`}>
            <div className={`relative w-full flex flex-col md-flex-row justify-center`}>
                <div className="hidden md:flex flex-col items-center">
                    <div>
                        Select dates
                    </div>
                    <div>
                        <DayPicker
                        selected={{
                            from: (start !== '')? new Date(start) : '',
                            to: (end !== '')?new Date(end) : ''
                        }}
                        onSelect={handleSelect}
                        disabled={{before: new Date()}}
                        fromMonth={new Date()}
                        mode="range"
                        numberOfMonths={2}
                        style={{margin: '0', padding: '0'}}
                        />
                    </div>
                </div>
                <div className="flex md:hidden flex-col">
                    <div>
                        Select dates
                    </div>
                    {/* DayPicker DayPicker-Months DayPicker-Month DayPicker-wrapper */}
                    <div className="flex justify-center">
                        <DayPicker
                        selected={{
                            from: (start !== '')? new Date(start) : new Date(),
                            to: (end !== '')?new Date(end) : new Date()
                        }}
                        onSelect={handleSelect}
                        disabled={{before: new Date()}}
                        fromMonth={new Date()}
                        mode="range"
                        numberOfMonths={1}
                        style={{scale: '0.90', margin: '0', padding: '0'}}
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div onClick={handleClose} className="flex justify-center items-center w-[200px] h-[40px] bg-green-600 rounded-[10px] transition-all duration-400 cursor-pointer active:scale-95 active:bg-green-900 hover:bg-green-800">
                        Close
                    </div>
                </div>
            </div>
        </div>
    )
}