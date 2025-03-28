
import React, { useState } from 'react';

const Table = () => {
    const [rows, setRows] = useState([
        { id: 1, name: 'Dave Gamache', age: 26, 
            sex: 'Male',
            
         },
    ]);

    const [editingRow, setEditingRow] = useState(null);
    const [editedRow, setEditedRow] = useState({});

    const addRow = () => {
        const newRow = { id: Date.now(), name: '', age: '', sex: '' };
        setRows([newRow, ...rows]);
        setEditingRow(newRow.id);
        setEditedRow(newRow);
    };

    const editRow = (id) => {
        setEditingRow(id);
        const rowToEdit = rows.find((row) => row.id === id);
        setEditedRow({ ...rowToEdit });
    };

    const saveRow = (id) => {
        setRows(rows.map((row) => (row.id === id ? editedRow : row)));
        setEditingRow(null);
    };

    const cancelEdit = () => {
        setEditingRow(null);
        setEditedRow({});
    };

    const deleteRow = (id) => {
        if (window.confirm('Are you sure you want to delete this row?')) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const handleInputChange = (field, value) => {
        setEditedRow({ ...editedRow, [field]: value });
    };

    return (



        <div className='s-b-f2'>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <br />
                        <button className="myPointer btn pull-right add-row" onClick={addRow}>
                            <i className="fa fa-plus"></i>&nbsp;&nbsp; Add Row
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-bordered" id="editableTable">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>sex</th>
                                    
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row) => (
                                    <tr key={row.id}>
                                        <td>
                                            {editingRow === row.id ? (
                                                <input
                                                    type="text"
                                                    value={editedRow.name}
                                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                                />
                                            ) : (
                                                row.name
                                            )}
                                        </td>
                                        <td>
                                            {editingRow === row.id ? (
                                                <input
                                                    type="number"
                                                    value={editedRow.age}
                                                    onChange={(e) => handleInputChange('age', e.target.value)}
                                                />
                                            ) : (
                                                row.age
                                            )}
                                        </td>
                                        <td>
                                            {editingRow === row.id ? (
                                                <select
                                                    value={editedRow.sex}
                                                    onChange={(e) => handleInputChange('sex', e.target.value)}
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            ) : (
                                                row.sex
                                            )}
                                        </td>
                                        
                                        
                                        <td>
                                            {editingRow === row.id ? (
                                                <span style={{ display: "flex", justifyContent: 'space-evenly' }}>

                                                    <i className='fas fa-save myPointer' onClick={() => saveRow(row.id)}></i>
                                                    <i className='fas fa-close myPointer' onClick={cancelEdit}></i>
                                                </span>
                                            ) : (
                                                <span style={{ display: "flex", justifyContent: 'space-evenly' }}>

                                                    <i className='fas fa-edit myPointer' onClick={() => editRow(row.id)}></i>
                                                    <i className='fas fa-trash-can myPointer' onClick={() => deleteRow(row.id)}></i>
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <br />
                        <button className="myPointer btn pull-right add-row" >
                            <i className="fa fa-upload"></i>&nbsp;&nbsp; Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Table;
