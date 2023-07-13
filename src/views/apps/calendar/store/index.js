// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

const userdata = localStorage.getItem('userData')
const { user_id } = userdata ? JSON.parse(userdata) : { user_id: null }
export const fetchEvents = createAsyncThunk('appCalendar/fetchEvents', async calendars => {
  const response = await axios.post(`${process.env.REACT_APP_API}calendar/events/user/${user_id}`, { calendars })
  return response.data
})

export const addEvent = createAsyncThunk('appCalendar/addEvent', async (event, { dispatch, getState }) => {
  await axios.post(`${process.env.REACT_APP_API}calendar/add-event`, { event, user_id })
  await dispatch(fetchEvents(getState().calendar.selectedCalendars))
  return event
})

export const updateEvent = createAsyncThunk('appCalendar/updateEvent', async (event, { dispatch, getState }) => {
  await axios.put(`${process.env.REACT_APP_API}calendar/update-event`, { event })
  await dispatch(fetchEvents(getState().calendar.selectedCalendars))
  return event
})

export const updateFilter = createAsyncThunk('appCalendar/updateFilter', async (filter, { dispatch, getState }) => {
  console.log(filter)
  if (getState().calendar.selectedCalendars.includes(filter)) {
    await dispatch(fetchEvents(getState().calendar.selectedCalendars.filter(i => i !== filter)))
  } else {
    await dispatch(fetchEvents([...getState().calendar.selectedCalendars, filter]))
  }
  return filter
})

export const updateAllFilters = createAsyncThunk('appCalendar/updateAllFilters', async (value, { dispatch }) => {
  if (value === true) {
    await dispatch(fetchEvents(['Personal', 'Business', 'Family', 'Holiday', 'Meeting']))
  } else {
    await dispatch(fetchEvents([]))
  }
  return value
})

export const removeEvent = createAsyncThunk('appCalendar/removeEvent', async id => {
  await axios.delete(`${process.env.REACT_APP_API}calendar/remove-event/${id}`)
  return id
})

export const appCalendarSlice = createSlice({
  name: 'appCalendar',
  initialState: {
    events: [],
    selectedEvent: {},
    selectedCalendars: ['Personal', 'Business', 'Family', 'Holiday', 'Meeting']
  },
  reducers: {
    selectEvent: (state, action) => {
      state.selectedEvent = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload
      })
      .addCase(updateFilter.fulfilled, (state, action) => {
        if (state.selectedCalendars.includes(action.payload)) {
          state.selectedCalendars.splice(state.selectedCalendars.indexOf(action.payload), 1)
        } else {
          state.selectedCalendars.push(action.payload)
        }
      })
      .addCase(updateAllFilters.fulfilled, (state, action) => {
        const value = action.payload
        let selected = []
        if (value === true) {
          selected = ['Personal', 'Business', 'Family', 'Holiday', 'Meeting']
        } else {
          selected = []
        }
        state.selectedCalendars = selected
      })
  }
})

export const { selectEvent } = appCalendarSlice.actions

export default appCalendarSlice.reducer
