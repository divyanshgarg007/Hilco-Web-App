import React from 'react'
import {
  Box,
  IconButton,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import {Delete} from '@mui/icons-material'
import {FixedSizeList as WindowList} from 'react-window'
import {useSelector} from 'react-redux'
import {Loader} from '../../../../../components'
import MyDiv from './associatedAsset.style'

export default function AssociatedAsset(props) {

  const adminState = useSelector((state) => state.admin)

  const RenderItem = ({index, style}) => (
    <Box style={style}>
      <Box className="list_item" key={props?.filterAssetTypesList[index]?.asset_type_id}>
        <ListItemButton
          key={props?.filterAssetTypesList[index]?.asset_type_id}
          className="list_btn"
        >
          <ListItemText primary={props?.filterAssetTypesList[index]?.type} className="label_name" />
        </ListItemButton>
        <IconButton onClick={() => props.handleDisassociate(props?.filterAssetTypesList[index]?.asset_type_id)}>
          <Delete />
        </IconButton>
      </Box>
    </Box>
  )

  return (
    <MyDiv>
      {(adminState?.assetTypesClasses?.loading) &&
      <div>
        <Loader />
      </div>
      }
      <Box className="wrapper">
        <WindowList height={565} itemCount={props.filterAssetTypesList?.length} itemSize={35} width="100%">
          {RenderItem}
        </WindowList>
      </Box>
    </MyDiv>
  )
}
