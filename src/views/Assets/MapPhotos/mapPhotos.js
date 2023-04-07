/* eslint-disable max-len */
import React, {useEffect, useState} from 'react'
import {
  Box,
  FormControl,
  Select,
  Typography,
  MenuItem,
  Grid,
} from '@mui/material'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {AlertMessage, CustomButton, CustomTextBox, Loader} from '../../../components'
import {AssetIdList, ImagesList} from '../components'
import {getMakeCapacityAction} from '../../../redux/lines/LineActions'
import {
  getLocationsDataAction,
} from '../../../redux/home/HomeActions'
import {getAssetsByAppraiserAction, getPhotosByAssetAction, getPhotosByAppraiserAction, postAssignPhotosAction, deleteAssignPhotosAction} from '../../../redux/assets/AssetsActions'
import {assetsListActions} from '../../../redux/assets/assets'
import MyDiv from './mapPhotos.style'

const StyledMenuItem = styled(MenuItem)(() => ({
  '&.MuiMenuItem-root': {
    borderBottom: '1px solid #ccc',
    color: '#000000',
    fontWeight: '400',
    fontSize: '14px',
    fontFamily: 'Poppins,sans-serif',
  },
  '&.MuiMenuItem-root:first-child': {
    marginTop: '-8px',
  },
  '&.MuiMenuItem-root:last-child': {
    marginBottom: '-8px',
  },
}))

const ITEM_HEIGHT = 60
const Menu = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5,
    },
  },
}

// const imagesList = [
//   {
//     id: 1,
//     fileName: 'test.m4a',
//     image:
//       'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISDxUPEhMVFRUVFRUVFRUVFxUVFRUVFRUXFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFQ8QGCsdFR0tNi0rKy0tKy8tKy03LS01LSsrKysrLS0tKy0rLS0rNS0tKy0rLS0yLSstKysyLS0tK//AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwABBAUGB//EAEQQAAICAQICBgYECgkFAAAAAAABAgMREiEEMQUGE0FRcQciYYGxwUKRktEyQ1NUgpOhwtLwFBc0RFJyotPhFRZio7L/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIEAwX/xAAkEQEAAgICAQQCAwAAAAAAAAAAARECAxJRYSExQZEEFBPh8P/aAAwDAQACEQMRAD8A+NkwEkXg9QJfsz/P8pFovAFELLCKIXgLGf5wWiwYJgPSTApLCWl/PIvBaRaSw4JgLBMCgOCYDwXgUWDBMBaS9IosGCYC0l4FFgwTAeCtIoAWluFpLURRZeCYDwU0KWwYJgPBWBRYSg8ez/grAosJAsEwSiw5KCwVgLaiFkIKLUQsF6S0lhwTAaReC0WqET03WXoTh6KKJ1XRslZFuSU4T5fSxFeovY8vywzzaCci0heCYGYLwEBpIoh4LwAGkvAeC9ISy8EwM0lqJaLLwTA3SXpFFlYJgbpJpFFlYJga0TSKLK0lYHaSOIosrBWBukmBRZWCsDdJWkUWW0U4jcE0gsorAzSRoLZWCmhrRTRArBFEa0C0KWy8FhYIKLVgvAekvAQKReAki0gBSLwHpCSLSWBRJpDUQlEtJZaQSiMUS9JaQtRL0jVEvSKCtJekaoBaC0WRpL0j9BagKQjQTQaNBNAoZ9BNBo0E0FoZ9JWk0aCOJKGfSVpNGgjgKVn0lOI/QVoFBGkrQPcCsEoI0laR+kpxFBBTiPcSlEUtk6f5/n3AtDnEFxJRZeEQPSQUthSCUQ1ENR9hEsrSHFBKIaiWkLUQoxDUQ1EtBekLQMUQlEtIUoBKA5RyGqy0EKASgPVYSgWkIUAlWaFWEqzVFs2gvQalWEqy0lsnZk0GzsydmKLY+zJoNnZk7IUWx9mV2ZsdQPZkpbZXWC6zW6ynWSi2TswXA1usFwJSsriDoNbgA6xQzaAXA0uspxJQzaCnE0OILiBncQXE0OJTgRWfSQdpIKC0glEYohqBKCowDUBigMUDSFKASiOUA41gJVYarHqsZGstJbOqw1WaVUGqjSMyrGKs1KoZGkqMiqDVJtjSMjQaRhVISpOgqDB0lxUIepnd4zjnFZ59/wADOeUYxctY4zlNQtUF9gcKfE2SSk7JYWE8PSmksvOPPw5YMk7GptRk8eKk16vsOX9yL9MXT+rNXMvT9iV2Jzur/HpJwtsikvwVLaSx3Jd65+PI9FXCMkpRaafJrdM6deyM4uHPnhOM05rpBdJ1Hw4DoNsOY6gZVHSlSLdJFc51gus6DpAdRlWB1gOs3uoB1AYXWC6za6gXWRWJ1gOs2usB1gY3ABwNrrAcCUrJpIaezIKCVAJQHxrGKsyERrGRrHRgNjWVCVWHGsfGsbGooRGobGo0RqGxpKjNGobGk1wpHQpKjHGgdCg2QpHwoLYxRoHRoN0KB0eHFowKg850pCKucYvVlrZacxksZS23fPbOd+R6npabqqcorfkuS9vf5HjuIrjOa5tz04UsOeNsasvnth8uRx/lbfSMY93Z+Lrubn2c7io97alvhr8HMf8AEnnHclv7DPCKTazpSkubW+c7N5b9y547ng2cVwU2pN59VNtNPOhbOXsjl7ePIyWOXaOU99Uc6sN55JP27rd7fJ8mMzHrLqziJ9IBPgE84cm2st7p7YzjKzyzv3o9H1Ppi01l64/hRaxhPlp335eHejz1t8pVpN6km0oSS7kllR8Vyy1u/ajudU+kJz4iqDe+mUZKT1beKjs4Puz375OjXlEZQ5dmM8XqXw4D4c7L4cXLhzu5OSnGlQKlQdmXDipUEtaceVAuVB15UCpUiynJlSLlSdWVIuVIscp1AOo6kqRbqFjmOoB1HRlSLdQHPdYEqzoSqFyqAw9mQ19mUFZYxGRgcaPT0O+Evc4v5j4dP1d6mv0fuZ4/y49vT+PLp1oxGwgcuvp2h/Tx5xl9xsq6Vof42HvePiWM8e2Zwy6b4VjoVCaOLqfKyD8pR+831NPk0/Jo1yhmgwqHwqGwrHQrFoVCofCkbCBohAciioUj4Ujq4GiusnJaIhSPhQaIVD41k5FPPdaOBU+GaaWFJP1nJJYy/o9/wznuPARllShFS9X1m45mtuTx9HwPrnSHR/bVSqy46ljKbXwONDqdCOlJqWdrHLZyWefNruXi92ce7XOedu3RujDCp93y9cTNxdMZYypNxwo6tsY57ye6xhZ2W/I03QhYqpqWvNVUcPZ5hUnYkvZKSWPby3R9Zh1dpinprSdiSs3eGt9kvHfmseZ4zqL1TVfG8bVZLtIVSVcc88WJW5afinHPc3HfuwjXMRUpO6Jm4cP/AKbOVUpfhaJKbytk4prVLTlJbY0y2Wp77nS6kRT4pWPKliScdW2/jnLf0fqXgke74noXM4uuMIqKS1Pnt3x54/5fixHQ/QkqOIlLTDQ01GWIqSi3lQTSTwvDyPSMamHlOdxLe6RUqDpuAuVZ78ni5cqBMqTrSrEzpHIcmdIqVJ07KTPOBeRTnSpFSpOjKAqUC8kpzpVC5VHQlWJlEtlMEqhcqjdKIqURYwyqFSrN0kKlEtox9mQ0OUfFfWiDkU+U6iaiaSYPnPoJkiKbQUIN8k35JsgpoPQh0OAufKqx/oS+41V9CcTLlTP3rHxLUnKGOF8o8pNeTaNFfSdy5W2LynJfM2R6scW/xL+1BfvGmrqfxb+go+c4fJscZ6k5Y9wxV9PcUuV9v25P4s0R60cZ3Xz/ANP3G6vqNxT76l5yfyiaY+j/AIh/jKV75/wl45+WeWHhzI9buNX4+X1QfxiaKeuvHp/2h++ul/GB0qvRze+dtS+2/kjVV6NLO/iIfYk/mOOzyvLX4+mOrr/xq+nB+dcflguXpC478pFeVcPmjsV+jJ9/FL9S38bA/wCq5/nUf1LX75njt8/a8tPj6cH/AL66Qf8AeZLyro/2yLrv0hn+0y+xQ/jWd5ei+zu4iv3wl95I+i+78vV9ibfxM8dvn7bjPT4+v6cOPXrpBb/0lvzqo+UEBwHXDi6bbroyhKV7jKzXBYbhHSsKLWNj0X9Vtn5zD9VJ/vGHobqG7uI4mmV+Fw9ka8xr3m5QU87yenGcY3Lx2pOenx9Dq9JPGLeVfDyXsVkX9etja/SxPlLhIvytcfjBnYr9GHD59a+9+xOtZ/0s01ejTgFzjbLzsa/+Uj0xx2/MvLLLT05dPpVp+nw1if8A4zhP46R8vSjwn5HiPs1f7h2aOofR0P7upf552T/Y5YHy6pcB+aU/YRuIz7YnLV1LzMvSnwn5DiPqq/3AJ+lLhvyF/wD6v4z0kuqHR/5pT9kXZ1O6P/NavcmvgzVZ9s3r6l5i30n0d1F3vda/eMsvSTW+XDz984/cenv6m9Hv+7Q9znH4SMNnUjo/upf627+MlbO1vV1LztnpH8OG+u35aBT9IkvzdfrH/Cd+fUjge6uS/Tm/ixMuo/B+E1+mxW3teWrr/fbgS9INj5Uw98pMx8R154hvaFUf0ZP949HLqJwv+K1fpR/hMV/USnPq22LzUX8kTjtXlq6efn1w4p/SivKC+eRD6zcU/wAa/s1r907dnUTwv+uv5qYiXUma5WxfnFr5sk47PP21GWvx9OPLrBxD27WXuwv2pGO7jrJfhTnLzk38TvT6n2rlKt++S+Riv6s8QvoKX+WUfnuYnHP5iW4yw+Jhx+0Ibn0Jf+Sn9lkMcfDXLy7MOi6f8C97b+Y+vgKlyrh9lBKYamfQjDHpwcp7NrpiuUYrySNVbMkZjYzNUzLfXM0wmc2Ng6FpaR04WD4WHMhcOhaKHVhYPhYcmFw+Fw4jr12GiFpx4Xj4Xk4luzXcPhacaF4+F5OK209M9ISqolOLWrHq8t37M5y/Zhnkq+vEpY1Sw4LMknGEZPwXe9nyT322N3W3pCUOH9RvLfJY3WN28p4S23Pn0E9Wd1OTSSeZPddyUcpfccG/PLHZUPofj68ctdzD6BDr9RLaOpThvFbt2pJ5Sxldzy29t33PHl+o3Wa6HEcRxF+/9Jamkk8OUebWFt6rglnnv3o4fEdGWRhJ6lnRJuO0W49+Xvlctvay+K43evlpVdb9TZYjBVuWlr1XhJY3xjngsbJq592Z1Y3MR7PplvWNTfaVzlCKS1vlHLeMPVyeduXPzE9WOmlfxc5Oc3lPCw9CWVpi5Z5rL2x7z5z/AE9qpw14e2NPquPNPbvXisrGfadzqNxcVxUa1KOMSecPMmt8RlyW7w136WemOVzDyywiMZl9ZdouVpifEC5XnRxc9tkrRU7zHK8TK8vEtqsuETsM0rxMry8UtplYKlYZpXipXF4ltMrBUpmaVouVpaGiUxMpiZWipWikOlIXKQmVoqVooadRDH2pBQ4KmGrDHGf/AAEpkabo2BxsMKmMVhRvVgyNpgjaMjYaR0Y2jI3HOjaMjaVHThcPhccmNo2NwR14XDoXHGjeOheWh2oXjocQcWN42PEFpHR4+Ha16M43Xtyk8tezJ4/iq5RsUVGSe+lacbZ+j47Z9jx3no1xJw+l+lozmk23FdzyvPD2x9TOL8vVjMRPy6/xdkxNfDznHznl1vPf6uO9Nye3c1hvCM3ZaHJy3xjfD/YvvTxj3mjjZrOc5WU/DVjlyS8P2dwjh+IxmaeHu/HlHKWfNLZ9+OZyY4/Dqzy+TVTlRhqTi3lRWz9ZZWc7R2Sz5HouqHDwV0JRbzCL1OKbjnH4M3Jeo9+S8DytnEzefV1b899L5bt8m/VXM9Z1SVlcGnFxjL1k8YzssZz7Dp1YxOUOXZMxj6vbviRcuJOa+IFy4g7uLlt0ZcSKlxBzpcQLlxIodCV4qV5glxAuV5KG+V4uV5hdwDtFK2yuFu4xu0B2Aa5XC3aZXYA7ANTtAlYZnYA7CDR2hZk7QgVyFMJTM2QlI87appUw1MyqQSkaRqUw1YZVIJSA2RmGrDEphqZbSm1WBqwxqYSmaG6NoyNpgVgasLaOjG4ZG85qsDVppHTV4njIqa57rl5rdeeH3cjIrQu2ExExUkTXq5dnRNqSwoy35JpY5c2/eZ10Ta550d+ctxS5Y5ZO72xO3OX9TD4mXR+zn1BHQHByqTlN4bylDbCTxnVjm/VR2HxJze3K7c6MMIwioeGWU5Tcui+IAd5h7YF3GkpudwDuMTtBdxFbXaA7TG7AXYQbHaA7TK7AXYRWp2AO0zOYOshTQ7AXYZ3MFzAe7AXYIcgXIlqf2hDPqILGBSCUiEPJpakEpEIWEWpBaiENA1IJSIQqCUwlMhCglMLWQgsWphKbIQ0i1Yy+0ZCCxfaF9oQhbRNZNZZBaq7QrWQhLFaytZCATWDrIQgrWU5kIFC5lOWWQhALkC2QhALkC5EIFVqIQhB//9k=',
//   },
//   {
//     id: 2,
//     fileName: 'test1.m4a',
//     image:
//       'data:image/jpeg;base64,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',
//   },
// ]

export default function MapPhotos() {

  const dispatch = useDispatch()
  const [appraisersList, setAppraisersList] = useState([])
  const [filterAppraisersList, setFilterAppraisersList] = useState([])
  const [inputValues, setInputValues] = useState({})
  const [locationData, setLocationData] = useState([])
  const [assetsData, setAssetsData] = useState()
  const [photosAssetData, setPhotosAssetData] = useState()
  const [imagesList, setImagesList] = useState([])
  const [expanded, setExpanded] = useState(false)
  const [searchName, setSearchName] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [selectedIndex, setSelectedIndex] = useState([])
  const [typeId, setTypeId] = useState()

  const lineState = useSelector((state) => state.line)
  const homeState = useSelector((state) => state.home)
  const assetsState = useSelector((state) => state.assets)

  const url = process.env.REACT_APP_IMAGE_BASE_URL
  const locationsDataFull = locationData?.locationsDataFull

  let appraiserData = {
    type: 'appraiserList',
    project_id_crm: 'ed69ffa3-7089-da7c-2bbb-5661f3c0d433',
  }

  useEffect(() => {
    dispatch(getMakeCapacityAction(appraiserData)) // this action is basically accepts type, common api for getting list of make, capacity, appraiser etc....
  }, [dispatch])

  useEffect(() => {
    setAppraisersList(lineState?.makeCapacityList?.makeCapacityList?.data?.appraiserList)
    setFilterAppraisersList(lineState?.makeCapacityList?.makeCapacityList?.data?.appraiserList)
  }, [lineState?.makeCapacityList?.makeCapacityList?.data])

  useEffect(() => {
    setLocationData(homeState?.locationsList?.locationsList?.data)
  }, [homeState?.locationsList?.locationsList])

  useEffect(() => {
    setAssetsData(assetsState?.assetsByAppraiser?.assetsByAppraiser)
  }, [assetsState?.assetsByAppraiser?.assetsByAppraiser])

  useEffect(() => {
    setPhotosAssetData(assetsState?.photosByAsset?.photosByAsset)
  }, [assetsState?.photosByAsset?.photosByAsset])

  useEffect(() => {
    setImagesList(assetsState?.photosByAppraiser?.photosByAppraiser)
  }, [assetsState?.photosByAppraiser?.photosByAppraiser])

  const handleChange = (e) => {
    setInputValues({...inputValues, [e?.target?.name]: e?.target?.value})
    if (e.target.name === 'appraiser') {
      let obj = {
        asset_id: '',
        location_id: '',
        user_id: e.target.value?.toString(),
      }
      let imageData = {
        user_id: e.target.value?.toString(),
      }
      dispatch(getLocationsDataAction())
      dispatch(getAssetsByAppraiserAction(obj))
      dispatch(getPhotosByAssetAction())
      dispatch(getPhotosByAppraiserAction(imageData))
      setInputValues({...inputValues, asset_id: null, max: null, min: null, location_id: null, appraiser: e.target.value?.toString()})
    }
    if (e.target.name === 'location_id') {
      let obj = {
        max: inputValues?.max ?? '',
        min: inputValues?.min ?? '',
        asset_id: inputValues?.asset_id ?? '',
        location_id: e.target.value?.toString() ?? '',
        user_id: inputValues?.appraiser.toString() ?? '',
      }
      dispatch(getAssetsByAppraiserAction(obj))
    }
  }

  const handleSearch = (e) => {
    const searchValue = e.target.value
    setSearchName(searchValue)
    if (searchValue !== '') {
      const result = appraisersList?.filter((item) => {
        return item?.name?.toLowerCase()?.startsWith(searchValue?.toLowerCase()) || item?.last_name?.toLowerCase().includes(searchValue.toLowerCase())
      })
      setFilterAppraisersList(result)
    } else {
      setFilterAppraisersList(appraisersList)
    }
  }

  const handleListItemClick = (index) => {
    let imagesIndex = selectedIndex.find((item) => item === index)

    if (!imagesIndex) {
      setSelectedIndex([...selectedIndex, index])
    } else if (imagesIndex) {
      setSelectedIndex(selectedIndex?.filter((item) => item !== index))
    }
  }

  const handleSubmit = () => {
    if (!inputValues?.asset_id) {
      setMessage('Please Select Asset Id')
      setStatus('warning')
      return
    }
    let obj = {
      max: inputValues?.max ?? '',
      min: inputValues?.min ?? '',
      asset_id: inputValues?.asset_id ?? '',
      location_id: inputValues?.location_id?.toString() ?? '',
      user_id: inputValues?.appraiser?.toString() ?? '',
    }
    dispatch(getAssetsByAppraiserAction(obj))
  }

  const handleReset = () => {
    setInputValues({...inputValues, asset_id: null, max: null, min: null, location_id: null})
  }

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleAccordionClick = (item) => {
    setTypeId(item.toString())
  }

  const handleAssign = () => {
    let obj = {
      images: selectedIndex?.join('~~~'),
      type: 'line',
      type_id: typeId?.toString(),
    }
    if (selectedIndex?.length === 0) {
      setMessage('Please choose at least one image.')
      setStatus('warning')
      return
    }
    if (typeId === undefined) {
      setMessage('Please choose Asset Id.')
      setStatus('warning')
    } else if (typeId) {
      dispatch(postAssignPhotosAction(obj, {user_id: inputValues?.appraiser?.toString() ?? ''}))
    }
  }

  const handleDelete = (imagePath) => {
    let obj = {
      photo_location: imagePath,
      type: 'line',
      type_id: typeId.toString(),
    }
    dispatch(deleteAssignPhotosAction(obj, {user_id: inputValues?.appraiser?.toString() ?? ''}))
  }

  const handleSnackBarClose = () => {
    setMessage('')
    setStatus('')
    dispatch(assetsListActions.clearMessageData())
  }

  return (
    <MyDiv>
      {(lineState?.makeCapacityList?.loading || homeState?.locationList?.loading || assetsState?.assetsByAppraiser?.loading || assetsState?.photosByAsset?.loading ||
      assetsState?.photosByAppraiser?.loading || assetsState?.photosToAssets?.loading || assetsState?.deleteAssignPhotos?.loading) &&
      <div>
        <Loader />
      </div>
      }
      <Box className="page_heading">
        <Typography>Map Photos</Typography>
      </Box>
      <Box className="admin_card">
        <Grid container columnSpacing={{md: 4}} className="action_grid">
          <Grid item md={2}>
            <Box className="input_box">
              <Typography>Select Appraiser</Typography>
              <FormControl size="small" fullWidth>
                <Select
                  id="select_input"
                  className="select_value"
                  value={inputValues?.appraiser || 0}
                  onChange={handleChange}
                  name="appraiser"
                  MenuProps={{...Menu, autoFocus: false}}
                >
                  <CustomTextBox
                    onKeyDown={(e) => {
                      e.stopPropagation()
                    }}
                    autoFocus
                    value={searchName}
                    onChange={handleSearch}
                    className="search_box"
                    fieldLabel="Search"
                  />
                  <StyledMenuItem value={0}>Please Select</StyledMenuItem>
                  {filterAppraisersList?.map((item) => {
                    return (
                      <StyledMenuItem key={item.user_id} value={item.user_id}>
                        {item.last_name}{' '}{item.name}
                      </StyledMenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          {inputValues?.appraiser !== 0 && inputValues?.appraiser && (
            <Grid item md={2}>
              <Box className="input_box">
                <Typography>From</Typography>
                <CustomTextBox
                  onChange={handleChange}
                  value={inputValues?.min ?? ''}
                  name="min"
                  fieldLabel="Min. Asset Id"
                  type="number"
                />
              </Box>
            </Grid>
          )}
          {inputValues?.appraiser !== 0 && inputValues?.appraiser && (
            <Grid item md={2}>
              <Box className="input_box">
                <Typography>To</Typography>
                <CustomTextBox
                  value={inputValues?.max ?? ''}
                  onChange={handleChange}
                  name="max"
                  type="number"
                  fieldLabel="Max. Asset Id"
                />
              </Box>
            </Grid>
          )}
          {inputValues?.appraiser !== 0 && inputValues?.appraiser && (
            <Grid item md={2}>
              <Box className="input_box">
                <Typography>Go To</Typography>
                <CustomTextBox
                  onChange={handleChange}
                  value={inputValues?.asset_id ?? ''}
                  name="asset_id"
                  type="number"
                  fieldLabel="Asset Id"
                />
              </Box>
            </Grid>
          )}
          {inputValues?.appraiser !== 0 && inputValues?.appraiser && (
            <Grid item md={2}>
              <Box className="input_box">
                <Typography>Select Location</Typography>
                <FormControl size="small" fullWidth>
                  <Select
                    id="select_input"
                    className="select_value"
                    value={inputValues?.location_id || 0}
                    onChange={handleChange}
                    name="location_id"
                    MenuProps={Menu}
                  >
                    <StyledMenuItem value={0}>Please Select</StyledMenuItem>
                    {locationsDataFull?.map((item) => {
                      return (
                        <StyledMenuItem key={item.location_id} value={item.location_id}>
                          {item.name} [{item.location_id}]
                        </StyledMenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          )}
          {inputValues?.appraiser !== 0 && inputValues?.appraiser && (
            <Grid item md={2}>
              <Box className="d-flex bottom_actions">
                <CustomButton title="Search" className="btn_theme" variant="contained" onClick={handleSubmit} />
                <CustomButton title="Reset" className="btn_reset" variant="contained" onClick={handleReset} />
              </Box>
            </Grid>
          )}
        </Grid>
        {inputValues?.appraiser !== 0 && inputValues?.appraiser && (
          <Box className="content_box">
            <Grid container columnSpacing={{md: 4}}>
              <Grid item md={6}>
                <ImagesList imagesList={imagesList} url={url} handleListItemClick={handleListItemClick} selectedIndex={selectedIndex}
                  handleAssign={handleAssign} photosAssetData={photosAssetData}
                />
              </Grid>
              <Grid item md={6}>
                <AssetIdList assetsData={assetsData} expanded={expanded} handleAccordionChange={handleAccordionChange} handleDelete={handleDelete}
                  photosAssetData={photosAssetData} url={url} handleAccordionClick={handleAccordionClick}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
      <AlertMessage
        message={message}
        severity={status}
        open={message?.length > 0}
        close={handleSnackBarClose}
      />
    </MyDiv>
  )
}
