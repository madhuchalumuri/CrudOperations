import { DataArray } from '@mui/icons-material';
import { useGridFilter } from 'ag-grid-react';
import React, { useCallback } from 'react'

const MyFilter = ({model,onModelChange, getValue,colDef }) => {

    const valueChanged = useCallback((p)=>{
        const newValue = p.target.value;
        onModelChange(newValue == "" ? null : newValue);
    })
    const doesFilterPass = useCallback(({data,node})=>{
        console.log(node)
        const value = getValue(node);
        return value==model;
    });

    useGridFilter({doesFilterPass})

  return (
    <div>
        <input type='text' value={model || ""} onChange={valueChanged} />
    </div>
  )
}

export default MyFilter