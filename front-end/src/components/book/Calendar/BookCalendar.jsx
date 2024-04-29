import React, { useState,  useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useSelector, useDispatch } from 'react-redux';
import { selectDate ,setBookings} from "../../../toolkitRedux/sliceToolkit";
import 'react-calendar/dist/Calendar.css';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
  isWithinInterval,
} from 'date-fns';
import axios from 'axios';

// const bookings=[

// ]

// const bookings = [
//   // {
//   //   id: 1,
//   //   start_date_time: "2023-12-30T16:00",
//   //   end_date_time: "2023-12-30T17:00"
//   // },
//   // {
//   //   id: 2,
//   //   start_date_time: "2023-12-30T13:00",
//   //   end_date_time: "2023-12-30T15:00"
//   // },
//   // {
//   //   id: 3,
//   //   start_date_time: "2023-12-30T12:00",
//   //   end_date_time: "2023-12-30T12:30"
//   // },
// ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}



export default function Example(props) {
  const longetivity = parseInt(useSelector((state) => state.toolkit.time)); 
  const bookings = useSelector((state) => state.toolkit.bookings); 
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
  const [date, setDate] = useState({
    justDate: selectedDay,
    dateTime: null
  })
  const dispatch = useDispatch()
  const [freeTimes,setFreeTimes]=useState([])

  
  useEffect(() => {
    console.log("I've worked");
    axios.get(`http://127.0.0.1:8000/api/barber/${props.barber.id}/bookings`)
      .then((response) => {
        dispatch(setBookings(response.data.bookings))
        // setBookings(response.data.bookings)
        console.log(bookings);
        // setBookings(response.data)
        // console.log(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error fetching bookings:', error);
      });
  }, [props.barber]);

  useEffect(()=>{
    const getTimes = (e, longetivity) => {
      const check = Math.ceil(longetivity / 30) * 30
      const { justDate } = date
      const beginingNumber = parseInt(e.substring(0, 2));
      const endNumber = parseInt(e.substring(3));

      const begining = add(justDate, { hours: beginingNumber })
      const end = add(justDate, { hours: endNumber })
      const interval = 30

      const times = []
      console.log(bookings);
      for (let i = begining; i < end; i = add(i, { minutes: interval })) {
        const timeTOCheck = add(i, { minutes: check })
        let isWithinAnyBooking = false;
        bookings?.some((el) => {
          const bookingStart = new Date(el.start_date_time);
          const bookingEnd = new Date(el.end_date_time);

          if (isWithinInterval(timeTOCheck, { start: bookingStart, end: bookingEnd })) {
            isWithinAnyBooking = true;
            return true; // exit the loop early since we found a booking
          }

          return false;
        });

        if (!isWithinAnyBooking) {
          times.push(i);
        }
      }
      return times
    }  


    // console.log('I re-rendered');


    const times = getTimes(props.workingTimes, longetivity)
    setFreeTimes(times)
  },[bookings,props.barber])


  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  // let selectedDayMeetings = meetings.filter((meeting) =>
  //   isSameDay(parseISO(meeting.startDatetime), selectedDay)
  // );
  // const GetTimes = (e) => {
  //   // e.split('-')
  //   // console.log(e);

  //   const longetivity = parseInt(useSelector((state) => state.toolkit.time));

  //   const check = Math.ceil(longetivity / 30) * 30
  //   const { justDate } = date
  //   const beginingNumber = parseInt(e.substring(0, 2));
  //   const endNumber = parseInt(e.substring(3));

  //   const begining = add(justDate, { hours: beginingNumber })
  //   const end = add(justDate, { hours: endNumber })
  //   const interval = 30

  //   const times = []

  //   for (let i = begining; i < end; i = add(i, { minutes: interval })) {
  //     const timeTOCheck = add(i, { minutes: check })
  //     let isWithinAnyBooking = false;

  //     bookings?.some((el) => {
  //       const bookingStart = new Date(el.startDateTime);
  //       const bookingEnd = new Date(el.endDateTime);

  //       if (isWithinInterval(timeTOCheck, { start: bookingStart, end: bookingEnd })) {
  //         isWithinAnyBooking = true;
  //         return true; // exit the loop early since we found a booking
  //       }

  //       return false;
  //     });

  //     if (!isWithinAnyBooking) {
  //       times.push(i);
  //     }
  //   }
  //   return times
  // }

  // const times = GetTimes(props.workingTimes)
  // console.log(times);
  useEffect(() => {
    const getTimes = (e, longetivity) => {
      const check = Math.ceil(longetivity / 30) * 30
      const { justDate } = date
      const beginingNumber = parseInt(e.substring(0, 2));
      const endNumber = parseInt(e.substring(3));

      const begining = add(justDate, { hours: beginingNumber })
      const end = add(justDate, { hours: endNumber })
      const interval = 30

      const times = []

      for (let i = begining; i < end; i = add(i, { minutes: interval })) {
        const timeTOCheck = add(i, { minutes: check })
        let isWithinAnyBooking = false;

        bookings?.some((el) => {
          const bookingStart = new Date(el.start_date_time);
          const bookingEnd = new Date(el.end_date_time);

          if (isWithinInterval(timeTOCheck, { start: bookingStart, end: bookingEnd })) {
            isWithinAnyBooking = true;
            return true; // exit the loop early since we found a booking
          }

          return false;
        });

        if (!isWithinAnyBooking) {
          times.push(i);
        }
      }
      return times
    }


    // console.log('I re-rendered');


    const times = getTimes(props.workingTimes, longetivity)
    setFreeTimes(times)
    console.log(freeTimes);
  }, [date.justDate, longetivity])



  useEffect(() => {
    console.log(date.dateTime);

    const interval = Math.ceil(longetivity / 30) * 30;

    if (date.dateTime !== null) {
      const unformattedStartDate = new Date(date.dateTime);
      const start = format(unformattedStartDate, 'yyyy-MM-dd  HH:mm');

      const unformattedEndDate = add(unformattedStartDate, { minutes: interval });
      const end = format(unformattedEndDate, 'yyyy-MM-dd  HH:mm');

      // console.log(interval, start, end);
      dispatch(selectDate({ start, end }));
    }
  }, [date.dateTime, longetivity]);

  return (
    <div className="pt-16">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-gray-900">
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5'
                  )}
                >
                  <button
                    type="button"
                    // onClick={() => setSelectedDay(day)}
                    onClick={() => setDate((prev) => ({ ...prev, justDate: day }))}
                    className={classNames(
                      isEqual(day, date.justDate) && 'text-white',
                      !isEqual(day, date.justDate) &&
                      isToday(day) &&
                      'text-red-500',
                      !isEqual(day, date.justDate) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      'text-gray-900',
                      !isEqual(day, date.justDate) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      'text-gray-400',
                      isEqual(day, date.justDate) && isToday(day) && 'bg-red-500',
                      isEqual(day, date.justDate) &&
                      !isToday(day) &&
                      'bg-gray-900',
                      !isEqual(day, date.justDate) && 'hover:bg-gray-200',
                      (isEqual(day, date.justDate) || isToday(day)) &&
                      'font-semibold',
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-14">
            <h2 className="font-semibold text-gray-900">
              Schedule for{' '}
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(date.justDate, 'MMM dd, yyy')}
              </time>
            </h2>
            <ol className="mt-4  text-sm leading-6 grid grid-cols-7 gap-1 text-gray-500">
              {freeTimes?.map((time, i) => {
                return <div key={`time-${i}`} className='rounded-sm bg-gray-100  hover:cursor-pointer hover:bg-gray-300'>
                  <button className='p-2' onClick={() => {
                    setDate((prev) => ({ ...prev, dateTime: time }))
                  }}>
                    {format(time, "kk:mm")}
                  </button>
                </div>
              })}

            </ol>
            <div className='mt-2'>
              {date.dateTime !== null
                ? <h1 className='flex-1'>{format(date.dateTime, "yyyy-MM-dd' 'kk:mm")}</h1>
                : null
              }
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];