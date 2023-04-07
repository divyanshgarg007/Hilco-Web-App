import React, { useState } from "react";

// import { kaReducer, Table } from "ka-table";

// import { DispatchFunc } from 'ka-table/types';
// import FlagSharpIcon from "@mui/icons-material/FlagSharp";
// import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
// import { fetchAssetList, fetchAssetDetails } from "../services/assetListService";
import { tableConfig } from "../../../utils/Table";
import AssetListStyled from "./assetList.style";
// import { reorderReducer } from "../reducers";
import { DataGrid } from "../../../components";

const AssetList = () => {
  const [config, setConfig] = useState(tableConfig);
  // const {
  //   dataKeys: { attributes, orders },
  // } = config;
  // const tableHeaders =

  // console.log("tableHeaders", tableHeaders);

  // const [columnChooserProps, changeColumnChooserProps] = useState(tablePropsInit);
  // const [rows, setRows] = useState([]);
  // const [lines, setLines] = useState();
  // const [fetchRequest, setFetchRequest] = useState(false);
  // const [fetchAssetDetailsRequest, setFetchAssetDetailsRequest] = useState(false);
  // const [valueCode, setValueCode] = useState([]);
  // const [assetDetails, setAssetDetails] = useState();

  return (
    <AssetListStyled className="asset-list">
      <DataGrid
        // tablePropsInit={tablePropsInit}
        config={config}
        setConfig={setConfig}
        // tableConfig={tableConfig}
      />
    </AssetListStyled>
  );
};

export default AssetList;
