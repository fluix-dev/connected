/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import View from '@ioc:Adonis/Core/View'
import { DateTime } from 'luxon'

View.global('prettyDate', date => {
  return DateTime.fromISO(date).toRelativeCalendar()
})

View.global('absoluteDate', date => {
  return DateTime.fromISO(date).toISODate()
})

View.global('htmlescape', unsafe => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
})
