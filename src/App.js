import React, { useEffect, useState } from "react";
import './index.css'


function App() {
  const [dates, setDates] = useState([])
  const [completeDates, setCompleteDates] = useState([])
  const [weekDayDates, setWeekDayDates] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  })
  
  useEffect(() => {
    fetch("https://dpg.gg/test/calendar.json")
      .then(response => response.json())
      .then(json => setDates(Object.entries(json)))
  }, [])

  useEffect(() => {    
      let getDaysArray = (start, end) => {
        for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
          arr.push([new Date(dt).toISOString().split('T')[0], 0]);
        }
        return arr;
      };
    
      let date1 = new Date()
      date1.setFullYear(date1.getFullYear() - 1)
      let currYear = getDaysArray(date1.toISOString().split('T')[0], new Date().toISOString().split('T')[0])
      
      const getPrevDay = (date = new Date()) => {
        const previous = new Date(date.getTime())
        previous.setDate(date.getDate() - 1)
        return previous
      }
      
      const getFullYear = () => {
        let firstDay = new Date(currYear[0][0])
        if(firstDay.getDay() !== 1){
          currYear.unshift([getPrevDay(firstDay).toISOString().split('T')[0], 0])
          getFullYear()
        }else{
          return 
        }
      }
      getFullYear()

      const arrPos = []
      for (let i = 0; i < dates.length; i++) {
        arrPos.push(currYear.map(e => e[0]).indexOf(dates[i][0]))
      }
      if(arrPos){
        for(let i = 0;i < arrPos.length; i++){
          if(currYear[arrPos[i]]){
            currYear[arrPos[i]][1] = dates[i][1]
          }
        }
      }
      setCompleteDates(currYear)
  }, [dates])

  // if (dates.length > 0) {
    
    // for (let i = 0; i < dates.length; i++) {
      //     const compareDates = (d) => {
    //       let lastYear = new Date()
    //       lastYear.setFullYear(lastYear.getFullYear() - 1);
    //       if (d >= lastYear.toISOString().split('T')[0]) {
    //         return true
    //       }
    //     }
    //   if (compareDates(dates[i][0])) {
    //     let newArr = [...dates]
    //     newArr.reverse().splice(-i)
    //     newArr.reverse()
    //     setDates(newArr)
    //     break
    //   }
    // }
    
  // }

  
  // if(completeDates.length > 0){
    //   let getDay = new Date(completeDates[0][0])
  // }
  
  let months = ["Янв.", "Февр.", "Март", "Апр.", "Май", "Июнь", "Июль", "Авг.", "Сент.", "Окт.", "Нояб.", "Дек."]
  const currentMonth = new Date().getMonth()
  months.push(months.slice(0, currentMonth))
  months = months.flat().slice(currentMonth)
  months.push(months.shift())

  // let weekDaysArr = {...weekDayDates}
  // const getWeekDays = () => {
    // completeDates.forEach((e, i) => {
    //   if(new Date(e[0]).getDay() === 1){
    //     weekDaysArr.monday.push(e)
    //   }
    // })

    // for(let i = 0; i < completeDates.length; i++){
    //   if(new Date(completeDates[i][0]).getDay() === 2){
    //     weekDaysArr.tuesday.push(completeDates[i])
    //   }

      // if(new Date(currYear[i][0]).getDay() === 3){
      //   weekDaysArr.wednesday.push(currYear[i])
      // }
      // if(new Date(currYear[i][0]).getDay() === 4){
      //   weekDaysArr.thursday.push(currYear[i])
      // }
      // if(new Date(currYear[i][0]).getDay() === 5){
      //   weekDaysArr.friday.push(currYear[i])
      // }
      // if(new Date(currYear[i][0]).getDay() === 6){
      //   weekDaysArr.saturday.push(currYear[i])
      // }
      // if(new Date(currYear[i][0]).getDay() === 0){
      //   weekDaysArr.sunday.push(currYear[i])
      // }
    // }
  // }
  // getWeekDays()
  // console.log(weekDaysArr);


   return (
     <div className="cont">
          <div className="daysRow">
            <div>Пн</div>
            <div></div>
            <div>Ср</div>
            <div></div>
            <div>Пт</div>
            <div></div>
            <div></div>
          </div>
      <div className="table">
        <div className="thead">
            {months.map(month => (
              <div key={month}>{month}</div>
            ))}
        </div>
        <div className="tbody">
          <div className="tdRow">
            {completeDates.map((cell, index) => (
              <div 
              key={index}
              date={cell[0]} 
              contr={cell[1]} 
              onClick={(e) => console.log(e.target)} 
              className={cell[1] === 0 ? null : cell[1] < 10 ? 'sm' : cell[1] < 20 ? 'md' : cell[1] < 30 ? 'l' : 'xl'}
              >
                {cell[1] === 0 ? (<span className="span">No contributions</span>) : (<span className="span">{cell[1]} contributions</span>)}
              </div>
            ))}
          </div>
        </div>
      </div >
     </div>
   );
}
  
  export default App;

  // for (let i = 0; i < dates.length; i++) {
  //   let today = new Date(dates[i][0])
  //   let nextDay = new Date(today)
  //   nextDay.setDate(today.getDate() + 1)
  //   let newArr = [...dates]
  //   nextDay = nextDay.toISOString().split('T')[0]
  //   if (newArr[i] !== newArr[newArr.length - 1] && newArr[i + 1][0] !== nextDay) {
  //     console.log(newArr[i][0] + '   ' + newArr[i + 1][0]);
  //   }
  // }
  
  // console.log(dates);
  // console.log(currYear);
  // console.log(currYear.indexOf());
  
  // console.log(minDate);
  
  // let date = new Date(dates[1][0]).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" }).split(' ')
  // date[0] = date[0].slice(0, -1)
  // date = date.join(' ')
  // console.log(date);

  // date[0].splice(date[0][date[0].length - 1], 1)
  // date[0].length - 1
  // console.log(date[0][date[0].length - 1]);
  // let parts = dates[0][0].split('-')
  // console.log(parts);
  // let mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
  // console.log(mydate.toDateString());
  // console.log(new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date(dates[0][0])))