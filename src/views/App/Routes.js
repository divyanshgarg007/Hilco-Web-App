/* eslint-disable no-unused-vars */
import React, {lazy, Suspense} from 'react'
import {
  Route, BrowserRouter, Routes, Switch, Redirect,
} from 'react-router-dom'
import {Loader} from '../../components'

import AppLayout from '../../config/layouts'
import * as routesNames from '../../constants/routes'
// import {
//   AddAssets,
//   AddLine,
//   AssetClasses,
//   AssetList, AssetTypes, FindReplace, AssignAppraiser, FinalAssetListReport, LineListTable, ManageArea, ManageMake, ManageModel, ManageUser,
//  PhotoReports, SerialLabels, ValuationReports, FindReplaceImport, ImportAssets, MapPhotos, AssetsList
// } from '..'

const Home = lazy(() => import('../../views/Home'))
const Research = lazy(() => import('../../views/Research'))
const AssignAppraiser = lazy(() => import('../../views/Admin/AssignAppraiser'))
const AssetClasses = lazy(() => import('../../views/Admin/AssetClasses'))
const ManageArea = lazy(() => import('../../views/Admin/ManageArea'))
const SerialLabels = lazy(() => import('../../views/Admin/SerialLabels'))
const AssetTypes = lazy(() => import('../../views/Admin/AssetTypes'))
const ManageMake = lazy(() => import('../../views/Admin/ManageMake'))
const ManageModel = lazy(() => import('../../views/Admin/ManageModel'))
const ManageUser = lazy(() => import('../../views/Admin/ManageUser'))
const LineListTable = lazy(() => import('../../views/Lines/LineListTable'))
const AddLine = lazy(() => import('../../views/Lines/AddLine'))
const PhotoReports = lazy(() => import('../../views/Reports/PhotoReports'))
const ValuationReports = lazy(() => import('../../views/Reports/ValuationReports'))
const FinalAssetListReport = lazy(() => import('../../views/Reports/FinalAssetListReport'))
const AssetList = lazy(() => import('../../views/Assets/AssetList'))
const AddAssets = lazy(() => import('../../views/Assets/AddAssets'))
const MapPhotos = lazy(() => import('../../views/Assets/MapPhotos'))
const FindReplace = lazy(() => import('../../views/Assets/FindReplace'))
const ImportAssets = lazy(() => import('../../views/Import/ImportAssets'))
const FindReplaceImport = lazy(() => import('../../views/Import/FindReplaceImport'))


const AppRoutes = () => {
  return (
    <Switch>
      <Redirect from="/" exact to={{pathname: routesNames.HOME}} />
      <Suspense fallback={<Loader />}>
        <AppLayout>
          <Route exact path={routesNames.HOME} component={Home} />

          <Route exact path={routesNames.RESEARCH} component={Research} />

          {/* Admin module routes */}
          <Route exact path={routesNames.ASSIGNAPPRAISER} component={AssignAppraiser} />
          <Route exact path={routesNames.MANAGEASSETCLASS} component={AssetClasses} />
          <Route exact path={routesNames.MANAGEAREA} component={ManageArea} />
          <Route exact path={routesNames.MANAGESERAILLABELS} component={SerialLabels} />
          <Route exact path={routesNames.MANAGEASSETTYPE} component={AssetTypes} />
          <Route exact path={routesNames.MANAGEMAKE} component={ManageMake} />
          <Route exact path={routesNames.MANAGEMODEL} component={ManageModel} />
          <Route exact path={routesNames.MANAGEUSER} component={ManageUser} />

          {/* Line module Routes */}
          <Route exact path={routesNames.LINELIST} component={LineListTable} />
          <Route exact path={routesNames.ADDLINE} component={AddLine} />

          {/* Reports module Routes */}
          <Route exact path={routesNames.PHOTOREPORTS} component={PhotoReports} />
          <Route exact path={routesNames.REPORTVALUATION} component={ValuationReports} />
          <Route exact path={routesNames.ASSETREPORTLIST} component={FinalAssetListReport} />

          {/* Assets module Routes */}
          <Route exact path={routesNames.ASSETLIST} component={AssetList} />
          <Route exact path={routesNames.ADDASSET} component={AddAssets} />
          <Route exact path={routesNames.MAPPHOTOS} component={MapPhotos} />
          <Route exact path={routesNames.FINDREPLACE} component={FindReplace} />

          {/* Import module Routes */}
          <Route exact path={routesNames.IMPORTASSET} component={ImportAssets} />
          <Route exact path={routesNames.FINDREPLACEIMPORTEDASSET} component={FindReplaceImport} />
        </AppLayout>
      </Suspense>

    </Switch>
  )
}

export default AppRoutes
