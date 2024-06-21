import { useMemo, useState } from 'react'
import './SCSS/App.scss'
import getDaysOfMonth from './getDaysOfMonth';
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import isBetween from "dayjs/plugin/isBetween";
dayjs.locale("zh-cn");
dayjs.extend(isBetween);

function App() {
  const now = dayjs()
  const [month, setMonth] = useState(dayjs());
  const days = useMemo(() => {
    return getDaysOfMonth(month.year(), month.month() + 1);
  }, [month]);
  const onMonthSwitch = (action: number) => {
    setMonth(month => {
      return month.add(action, "month");
    });
  };
  const [startActive, setStartActive] = useState(false);
  const [endActive, setEndActive] = useState(false);
  const [start, setStart] = useState(Object);
  const [end, setEnd] = useState(Object);

  return (
    <div className="App">
      <div className="calendar">
        <div className="calendar-month">
          <div
            className="calendar-month-select"
            onClick={() => {return;onMonthSwitch(-1)}}>
            {"<"}
          </div>
          <div>{month.format("YYYY")+'年'+month.format("MMM")}</div>
          <div
            className="calendar-month-select"
            onClick={() => {return;onMonthSwitch(1)}}>
            {">"}
          </div>
        </div>
        <div className="calendar-content">
          {days.map((day, i) => {
            return (
              <div 
                key={'day'+i} 
                className={`calendar-content-day ${month.month()===day.month() && 'calendar-content-currentMonth'} ${day.format("YYYY MM DD")===now.format("YYYY MM DD") && 'calendar-content-today'} ${day.isBetween(start, end)||day.isSame(start)||day.isSame(end) ? 'calendar-content-active' : ''}`}
                onClick={()=>{
                  if(!startActive && month.month()===day.month()) {
                    setStartActive(true)
                    setStart(day);
                  }
                  if(startActive && !endActive && month.month()===day.month()) {
                    if(day.isBefore(start)) {
                      console.log('再開始之前');
                      setStartActive(false)
                      setStart(null);
                    } else {
                      setEndActive(true)
                      setEnd(day);
                    }
                  }
                  if (startActive && endActive && month.month()===day.month()) {
                    setStartActive(true)
                    setStart(day);
                    setEndActive(false)
                    setEnd(null);
                  }
                }}
              >
                {parseInt(day.format("DD"))}日
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
