import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import "../sass/datatable.scss";

export default function DataTable() {
  const [data, setData] = useState([]);

  const columns = [
    { field: 'rank', headerName: 'Rank', type: 'number', flex: 1, headerAlign: 'center', align: 'center', headerClassName: 'header' },
    { field: 'user_name', headerName: 'Username', flex: 3, headerAlign: 'center', align: 'center', headerClassName: 'header' },
    { field: 'wins', headerName: 'Total wins', type: 'number', flex: 1, headerAlign: 'center', align: 'center', headerClassName: 'header' },
  ];
  
  const rows = data;

  useEffect(() => {
    axios.get('/users/top')
    .then(response => {
      console.log(response.data);
      setData(response.data);
    })
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        getRowId={(row) => row.user_name}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        sx={{border: 2, borderColor: 'white'}}
      />
    </div>
  );
}