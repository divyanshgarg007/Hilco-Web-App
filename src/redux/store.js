import {configureStore} from '@reduxjs/toolkit'
import adminSlice from './admin/admin'
import homeSlice from './home/home'
import lineSlice from './lines/line'
import reportSlice from './reports/report'
import researchSlice from './research/research'
import assetsSlice from './assets/assets'

const store = configureStore({
  reducer: {
  // listing all the pure functions in the store
    admin: adminSlice,
    home: homeSlice,
    line: lineSlice,
    report: reportSlice,
    research: researchSlice,
    assets: assetsSlice,
  },
})

export default store
