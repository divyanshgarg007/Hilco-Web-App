import React, {useState, useEffect} from 'react'
import {Grid} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {getAssetDetailsAction} from '../../redux/lines/LineActions'
import {getResearchTypeAction, showResearchAction} from '../../redux/research/ResearchActions'
import {Loader} from '../../components'
import {ResearchColumns, ResearchForm, ResearchTable} from './components'
import MyDiv from './research.style'

const displyColumns = [
  {
    id: '1',
    label: 'Make',
  },
  {
    id: '2',
    label: 'Model',
  },
  {
    id: '3',
    label: 'Capacity',
  },
  {
    id: '4',
    label: 'Asset Type',
  },
  {
    id: '5',
    label: 'Year',
  },
  {
    id: '6',
    label: 'Company',
  },
  {
    id: '7',
    label: 'Client',
  },
  {
    id: '8',
    label: 'Appraiser',
  },
  {
    id: '9',
    label: 'Date Appraiser',
  },
  {
    id: '10',
    label: 'Cost',
  },
]

const values = [
  {
    id: '11',
    label: 'FLV',
  },
  {
    id: '12',
    label: 'OLV',
  },
  {
    id: '13',
    label: 'OLVIP',
  },
  {
    id: '14',
    label: 'FMV',
  },
  {
    id: '15',
    label: 'FMVIP',
  },
  {
    id: '16',
    label: 'FAS',
  },
  {
    id: '17',
    label: 'RCN',
  },
]

export default function Research() {

  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState([])
  const [showList, setShowList] = useState(false)
  const [assetData, setAssetData] = useState([])
  const [searchName, setSearchName] = useState('')
  const [filterAssetData, setFilterAssetData] = useState([])
  const [searchAppraiser, setSearchAppraiser] = useState([])
  const [assetTypes, setAssetTypes] = useState([])
  const [inputValues, setInputValues] = useState({})
  const [checkValue, setCheckValue] = useState('1')
  const [checkLine, setCheckLine] = useState(false)
  const [appraisalData, setAppraisalData] = useState([])
  const [importedData, setImportedData] = useState([])
  const [searchedData, setSearchedData] = useState([])

  const lineState = useSelector((state) => state.line)
  const researchState = useSelector((state) => state.research)

  useEffect(() => {
    dispatch(getAssetDetailsAction())
    dispatch(getResearchTypeAction({app_type: 'appraisal'}))
    dispatch(getResearchTypeAction({app_type: 'imported'}))
  }, [dispatch])

  useEffect(() => {
    setAssetData(lineState?.assetDetails?.assetDetails)
  }, [lineState?.assetDetails?.assetDetails])

  useEffect(() => {
    setAppraisalData(researchState?.appraisalType?.appraisalType)
    setImportedData(researchState?.importedType?.importedType)
    setSearchedData(researchState?.showResearch?.showResearch)
  }, [researchState?.appraisalType?.appraisalType, researchState?.importedType?.importedType, researchState?.showResearch?.showResearch])

  useEffect(() => {
    const filterData = []
    assetData?.appraiserList?.filter((item) => {
      let index = filterData.findIndex((data) => data.id === item.user_id)
      if (index <= -1) {
        filterData.push({id: item.user_id, name: item.name, last_name: item.last_name})
      }
      return null
    })
    setFilterAssetData(filterData)
    setSearchAppraiser(filterData)
  }, [assetData?.appraiserList])

  const handleSearch = (e, type) => {
    const searchValue = e.target.value
    setSearchName(searchValue)
    if (type === 'appraiser') {
      if (searchValue !== '') {
        const result = searchAppraiser?.filter((item) => {
          return item?.name?.toLowerCase()?.startsWith(searchValue?.toLowerCase()) || item?.last_name?.toLowerCase().includes(searchValue.toLowerCase())
        })
        setFilterAssetData(result)
      } else {
        setFilterAssetData(searchAppraiser)
      }
    } else if (type === 'assetType') {
      if (searchValue !== '') {
        const result = assetData?.assetTypeList?.filter((item) => {
          return item.asset_type.toLowerCase().startsWith(searchValue.toLowerCase())
        })
        setAssetTypes(result)
      } else {
        setAssetTypes(assetData?.assetTypeList)
      }
    }
  }

  const handleChangeInput = (e) => {
    setInputValues({...inputValues, [e.target.name]: e.target.value})
  }

  const handleOnSelect = (item, type) => {
    switch (type) {
      case 'lineData':
        return setInputValues({...inputValues, line_name: item.line_name})
      case 'makeData':
        return setInputValues({...inputValues, make: item.make, make_id: item.make_id})
      case 'clientData':
        return setInputValues({...inputValues, client_name: item.client_name})
      case 'companyData':
        return setInputValues({...inputValues, company_name: item.company_name})
      default:
        break
    }
  }

  const formatResult = (item, type) => {
    switch (type) {
      case 'lineData':
        return <span style={{display: 'block', textAlign: 'left'}}>{item.line_name}</span>
      case 'makeData':
        return <span style={{display: 'block', textAlign: 'left'}}>{item.make}</span>
      case 'clientData':
        return <span style={{display: 'block', textAlign: 'left'}}>{item.client_name}</span>
      case 'companyData':
        return <span style={{display: 'block', textAlign: 'left'}}>{item.company_name}</span>
      default:
        break
    }
  }

  const handleCheckbox = (e) => {
    setCheckValue(e.target.value)
    setCheckLine(e.target.checked)
  }

  const handleShow = () => {
    let obj = {
      app_type: checkValue === '1' ? 'appraisal' : 'imported',
      filterOptions: {
        app_type: 'all',
        appraisers: inputValues?.appraisers?.toString() ?? null,
        asset_no: inputValues?.asset_no ?? null,
        asset_type: inputValues?.asset_type?.toString() ?? null,
        asset_type_ind: null,
        capacity: inputValues?.capacity ?? null,
        client_name: inputValues?.client_name ?? null,
        company_name: inputValues?.company_name ?? null,
        cost: inputValues?.cost ?? null,
        description: inputValues?.description ?? null,
        date_appraised_from: inputValues?.date_appraised_from ?? null,
        date_appraised_to: inputValues?.date_appraised_to ?? null,
        includeLine: checkLine,
        make: inputValues?.make ?? null,
        make_id: inputValues.make_id ?? null,
        model: inputValues?.model ?? null,
        line_name: inputValues?.line_name ?? null,
        pageNumber: 1,
        pageSize: 60,
        sale_name: null,
        serial_number: inputValues?.serial_number ?? null,
        sortCol: 'a.created_on',
        sortOrder: 'asc',
        year_app_from: inputValues?.year_app_from ?? null,
        year_app_to: inputValues?.year_app_to ?? null,
        year_from: inputValues?.year_from ?? null,
        year_to: inputValues?.year_to ?? null,
      },
      sortableData: [
        {
          name: 'Quantity',
          order: '',
        },
        {
          name: 'Make',
          order: '',
        },
        {
          name: 'Model',
          order: '',
        },
        {
          name: 'Capacity',
          order: '',
        },
        {
          name: 'Asset Type',
          order: '',
        },
        {
          name: 'Year',
          order: '',
        },
        {
          name: 'FLV',
          order: '',
        },
        {
          name: 'OLV',
          order: '',
        },
      ],
    }
    setShowList(!showList)
    dispatch(showResearchAction(obj))
  }

  const handleChange = (event) => {
    let updatedCheck = [...isChecked]
    let obj = {
      id: event?.target?.id,
      value: event?.target?.value,
    }
    if (event?.target?.checked) {
      updatedCheck = [...isChecked, obj]
    } else {
      updatedCheck.splice(isChecked.indexOf(event?.target.id), 1)
    }
    setIsChecked(updatedCheck)
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    const newItems = Array.from(isChecked)
    const [movedItem] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, movedItem)
    setIsChecked(newItems)
  }

  return (
    <MyDiv>
      {(lineState?.assetDetails?.loading || researchState?.appraisalType?.loading || researchState?.showResearch?.loading) &&
      <div>
        <Loader />
      </div>
      }
      {!showList ?
        <Grid container columnSpacing={{sm: 4, md: 4}}>
          <Grid item md={8}>
            <ResearchForm handleShow={handleShow} filterAssetData={filterAssetData}
              searchName={searchName} handleSearch={handleSearch} assetTypes={assetTypes}
              checkValue={checkValue} inputValues={inputValues} handleCheckbox={handleCheckbox}
              formatResult={formatResult} handleOnSelect={handleOnSelect} handleChangeInput={handleChangeInput}
              appraisalData={appraisalData} importedData={importedData} checkLine={checkLine}
            />
          </Grid>
          <Grid item md={4}>
            <ResearchColumns handleChange={handleChange} displyColumns={displyColumns} values={values} isChecked={isChecked} onDragEnd={onDragEnd} />
          </Grid>
        </Grid> :
        <ResearchTable handleShow={handleShow} searchedData={searchedData} />
      }
    </MyDiv>
  )
}
