import { Box } from '@mui/material'
import MUIDataTable from 'mui-datatables';
import React from 'react'

const GridData = () => {
    const data = [
        { id: 1, col1: 'Alice', col2: 'Johnson' },
        { id: 2, col1: 'Bob', col2: 'Smith' },
        { id: 3, col1: 'Charlie', col2: 'Brown' },
        { id: 4, col1: 'David', col2: 'Williams' },
        { id: 5, col1: 'Eve', col2: 'Davis' },
        { id: 6, col1: 'Frank', col2: 'Miller' },
        { id: 7, col1: 'Grace', col2: 'Wilson' },
        { id: 8, col1: 'Hank', col2: 'Moore' },
        { id: 9, col1: 'Ivy', col2: 'Taylor' },
        { id: 10, col1: 'Jack', col2: 'Anderson' },
        { id: 11, col1: 'Kara', col2: 'Thomas' },
        { id: 12, col1: 'Leo', col2: 'Jackson' },
        { id: 13, col1: 'Mia', col2: 'White' },
        { id: 14, col1: 'Nate', col2: 'Harris' },
        { id: 15, col1: 'Olivia', col2: 'Martin' },
        { id: 16, col1: 'Paul', col2: 'Thompson' },
        { id: 17, col1: 'Quinn', col2: 'Garcia' },
        { id: 18, col1: 'Rose', col2: 'Martinez' },
        { id: 19, col1: 'Sam', col2: 'Robinson' },
        { id: 20, col1: 'Tina', col2: 'Clark' },
        { id: 21, col1: 'Uma', col2: 'Rodriguez' },
        { id: 22, col1: 'Vince', col2: 'Lewis' },
        { id: 23, col1: 'Wendy', col2: 'Lee' },
        { id: 24, col1: 'Xander', col2: 'Walker' },
        { id: 25, col1: 'Yara', col2: 'Hall' },
        { id: 26, col1: 'Zane', col2: 'Allen' },
        { id: 27, col1: 'Ann', col2: 'Young' },
        { id: 28, col1: 'Ben', col2: 'Hernandez' },
        { id: 29, col1: 'Cathy', col2: 'King' },
        { id: 30, col1: 'Dan', col2: 'Wright' }
    ];
    
    const columns = [
        {
            name:"id",
            label : "S.No",

        },
        {
            name :"col1",
            label : "First Name",
        },
        {
            name :"col2",
            label : "Last Name",
        },
    ];
    
     
  return (
    <div>
        <Box sx={{height:"600px", width:"100%"}}>
            <MUIDataTable  data={data} columns={columns} />
        </Box>
    </div>
  )
}

export default GridData