import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function FilterData() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterId, setFilterId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/fetchData");
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = useCallback((e) => {
    const value = e.target.value;
    setFilterId(value);
  }, []);

  useEffect(() => {
   
    const timeoutId = setTimeout(() => {
      if (!filterId) {
        setFilteredData(data);
        return;
      }

      const filtered = data.filter(item => item.id.toString() === filterId);
      setFilteredData(filtered);
    }, 1000);

    return () => clearTimeout(timeoutId); 
  }, [filterId, data]);


  return (
    <>
      <Link to="/">Home page</Link>

      <form style={{ margin: '20px 0', textAlign: 'center', backgroundColor: '#3498db', padding: '20px', borderRadius: '10px' }}>
        <label htmlFor="filterId" style={{ color: '#fff', marginRight: '10px' }}>Filter by ID: </label>
        <input
          type="number"
          id="filterId"
          name="filterId"
          min="1"
          max="10"
          value={filterId}
          onChange={handleFilterChange}
          style={{ padding: '10px', fontSize: '16px' }}
        />
      </form>

      {filteredData.length === 0 ? (
        <h1 style={{ textAlign: 'center' }}>Not Found</h1>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'center', border: '2px solid black' }}>id</th>
              <th style={{ padding: '12px', textAlign: 'center', border: '2px solid black' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'center', border: '2px solid black' }}>UserName</th>
              <th style={{ padding: '12px', textAlign: 'center', border: '2px solid black' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'center', border: '2px solid black' }}>address</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td style={{ padding: '12px', textAlign: 'center', border: '2px solid black' }}>{item.id}</td>
                <td style={{ padding: '12px', textAlign: 'center', border: '2px solid black' }}>{item.name}</td>
                <td style={{ padding: '12px', textAlign: 'center', border: '2px solid black' }}>{item.username}</td>
                <td style={{ padding: '12px', textAlign: 'center', border: '2px solid black' }}>{item.email}</td>
                <td style={{ padding: '12px', textAlign: 'center', border: '2px solid black' }}>{item.address.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default FilterData;
