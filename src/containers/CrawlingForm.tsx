import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import DatePicker from '../components/DatePicker'
import PlayButton from '../components/PlayButton'
import { runCrawling } from '../data/crawling/crawlingSlice'
import { addTaskSchedule } from '../data/task/taskScheduleSlice'
import { getDateString } from '../utils/DateUtils'
import colors from 'tailwindcss/colors'
import OutLineTextField from '../components/OutLineTextField'
import Button from '../components/Button'
import CheckBox from '../components/CheckBox'
import Select from 'react-select'

export default (props) => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [reservedStartDate, setReservedStartDate] = useState(new Date())
    const [reservedEndDate, setReservedEndDate] = useState(new Date())
    const [isReservedDateFix, setReservedDateFix] = useState(false)

    const [year, setYear] = useState("*")
    const [month, setMonth] = useState("*")
    const [day, setDay] = useState("*")
    const [hour, setHour] = useState("*")
    const [minute, setMinute] = useState("*")
    const [second, setSecond] = useState("0")

    const [market, setMarket] = useState(["kospi"])
    const [reservedMarket, setReservedMarket] = useState(["kospi"])

    const dispatch = useDispatch()
    const handleRunCrawlingButton = () => {
        
        dispatch(
            runCrawling({
                taskId: "marcap",
                market,
                startDate: getDateString(startDate),
                endDate: getDateString(endDate),
            })
        )
        console.log(market, getDateString(startDate), getDateString(endDate))
    }

    const handleScheduleButton = () => {
        const startDate = isReservedDateFix?"*":getDateString(reservedStartDate)
        const endDate = isReservedDateFix?"*":getDateString(reservedEndDate)
        dispatch(
            addTaskSchedule({
                year, month, day, hour, minute, second,
                taskId: "marcap",
                market: reservedMarket,
                startDate,
                endDate
            })
        )
    }

    const hanldeReservedDateCheck = (isCheck: boolean) => {
        setReservedDateFix(isCheck)
    }

    const handleMarketChange = (arr) => {
        setMarket(arr.map(v=>v.value))
    }

    const handleMarketChangeOnReserved = (arr) => {
        setReservedMarket(arr.map(v=>v.value))
    }

    const handleDateTextField = (value, type) => {
        const checkTarget = ["year", "month", "day", "hour", "minute", "second"];
        const checkMap = {
            year:[year, setYear], 
            month:[month, setMonth], 
            day:[day, setDay], 
            hour:[hour, setHour], 
            minute:[minute, setMinute], 
            second:[second, setSecond]
        }
        // const curIndex = checkTarget.indexOf(type);
        // const replacedValue = value.replace(/[^0-9*]/g, "").replace(/0+/, "0").replace(/0(?=\d)/,"")
        checkMap[type][1](value)
        //????????? *?????? ?????? 0??????
        if(checkTarget.every(v=>checkMap[v][0]=="*")){
            setSecond("0")
        }
    }

    const handleTextFieldBlurEvent = (value, type) => {
        const checkTarget = ["year", "month", "day", "hour", "minute", "second"];
        const checkMap = {
            year:[year, setYear], 
            month:[month, setMonth], 
            day:[day, setDay], 
            hour:[hour, setHour], 
            minute:[minute, setMinute], 
            second:[second, setSecond]
        }
        if(value.length==0){
            checkMap[type][1]("0")
        }
        //????????? *?????? ?????? 0??????
        if(checkTarget.every(v=>checkMap[v][0]=="*")){
            setSecond("0")
        }

    }
    
    return <>
        <h2 className="text-gray-700 font-semibold text-xl sm:text-2xl tracking-wide mb-4 pr-10">????????? ?????? ??? ???????????? ?????????</h2>
        
        <div className={"flex items-center justify-between mb-2"}>
            <label className="block text-black text-medium font-semibold" >
                ??????
            </label>
            <PlayButton className={""} onClick={handleRunCrawlingButton} iconColor={colors.emerald[100]}/>
        </div>
        <label className="block text-gray-400 text-sm font-bold mb-2" >
            ????????????
        </label>
        <Select
            defaultValue={{value:"kospi", label:"?????????"}}
            isMulti
            placeholder={"??????"}
            name="colors"
            options={[
                {value:"kospi", label:"?????????"},
                {value:"kosdaq", label:"?????????"},
                {value:"konex", label:"?????????"},
            ]}
            onChange={handleMarketChange}
            className={"basic-multi-select w-full sm:w-80 mb-2 "}
            classNamePrefix="select"
        />
        <label className="block text-gray-400 text-sm font-bold mb-2" >
            ??????
        </label>
        <div className={"flex items-center"}>
            <DatePicker 
                className={"mr-3 focus:ring-4 w-28 sm:w-32 text-sm sm:text-base"} 
                selected={startDate} 
                onChange={date=> setStartDate(date)}/>
            ~
            <DatePicker 
                className={"ml-3 focus:ring-4 w-28 sm:w-32 text-sm sm:text-base"} 
                selected={endDate} 
                onChange={date => setEndDate(date)}/>
        </div>
        <div className={"w-full h-px bg-gray-300 mt-8 mb-4"}></div>
        <div className={"flex items-center justify-between mb-2"}>
            <label className="block text-black text-medium font-semibold" >
                ????????????
            </label>
            <PlayButton className={""} onClick={handleScheduleButton} iconColor={colors.emerald[100]}/>
        </div>
        <label className="block text-gray-400 text-sm font-bold mb-2" >
            ????????????
        </label>
        <Select
            defaultValue={{value:"kospi", label:"?????????"}}
            isMulti
            name="colors"
            options={[
                {value:"kospi", label:"?????????"},
                {value:"kosdaq", label:"?????????"},
                {value:"konex", label:"?????????"},
            ]}
            placeholder={"??????"}
            onChange={handleMarketChangeOnReserved}
            className={"basic-multi-select w-full sm:w-80 mb-2 "}
            classNamePrefix="select"
        />
        <div className={"flex flex-col"}>
            <label className="block text-gray-400 text-sm font-bold mb-2" >
                ??????
            </label>
            <CheckBox checked={isReservedDateFix} onCheck={hanldeReservedDateCheck} className={"mb-2"} label={"??????????????? ??????"} />
            {
                isReservedDateFix?null:
                <div className={"flex items-center mb-4"}>
                <DatePicker 
                    className={"mr-3 focus:ring-4 w-28 sm:w-32 text-sm sm:text-base"} 
                    selected={reservedStartDate} 
                    onChange={date=> setReservedStartDate(date)}/>
                ~
                <DatePicker 
                    className={"ml-3 focus:ring-4 w-28 sm:w-32 text-sm sm:text-base"} 
                    selected={reservedEndDate} onChange={date => 
                    setReservedEndDate(date)}/>
            </div>
            }
            
        </div>
        
        <label className="block text-gray-400 text-sm font-bold mb-2" >
            ????????????
        </label>
        <div className={"flex items-center flex-wrap"}>
            <OutLineTextField 
                onChange={(e)=>handleDateTextField(e.target.value, "year")} 
                onBlur={(e)=>handleTextFieldBlurEvent(e.target.value, "year")} 
                value={year} 
                className={"mr-1 w-24"} 
                left={10} 
                label={"???"}/>
            <OutLineTextField 
                onChange={(e)=>handleDateTextField(e.target.value, "month")} 
                onBlur={(e)=>handleTextFieldBlurEvent(e.target.value, "month")} 
                value={month} 
                className={"mx-1 w-14"} 
                left={10} 
                label={"???"}/>
            <OutLineTextField 
                onChange={(e)=>handleDateTextField(e.target.value, "day")} 
                onBlur={(e)=>handleTextFieldBlurEvent(e.target.value, "day")} 
                value={day} 
                className={"mx-1 w-14"} 
                left={10} 
                label={"???"}/>
            <OutLineTextField 
                onChange={(e)=>handleDateTextField(e.target.value, "hour")} 
                onBlur={(e)=>handleTextFieldBlurEvent(e.target.value, "hour")} 
                value={hour} 
                className={"mx-1 w-14"} 
                left={10} 
                label={"???"}/>
            <OutLineTextField 
                onChange={(e)=>handleDateTextField(e.target.value, "minute")} 
                onBlur={(e)=>handleTextFieldBlurEvent(e.target.value, "minute")} 
                value={minute} 
                className={"mx-1 w-14"} 
                left={10} 
                label={"???"}/>
            <OutLineTextField 
                onChange={(e)=>handleDateTextField(e.target.value, "second")} 
                onBlur={(e)=>handleTextFieldBlurEvent(e.target.value, "second")} 
                value={second} 
                className={"ml-1 w-14"} 
                left={10} 
                label={"???"}/>
        </div>
    </>
}