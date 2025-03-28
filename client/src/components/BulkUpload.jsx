

import React, { useState } from 'react';
import Table from './Table';

export default function BulkUpload() {
    const [uploadStatus, setUploadStatus] = useState('');

    async function handleBulkUpload({sid}) {
        

        // Open file selection dialog
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.csv,.xlsx'; // Allow only CSV and XLSX files
        
        input.onchange = async (event) => {
            const file = event.target.files[0];

            if (!file) {
                alert('No file selected');
                return;
            }

            const allowedExtensions = ["csv", "xlsx"];
            const fileExtension = file.name.split('.').pop().toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                alert('Invalid file type. Please upload a .csv or .xlsx file.');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);
            formData.append('sid', localStorage.getItem("sid"));

            try {
                setUploadStatus('Uploading...');

                const response = await fetch('https://gcrneuratechserver.vercel.app/seller/addproductsfile', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const result = await response.json();
                    setUploadStatus('File uploaded successfully!');
                    console.log('Response:', result);
                } else {
                    setUploadStatus('Upload failed. Please try again.');
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                setUploadStatus('An error occurred during upload.');
                console.error('Error:', error);
            }
            setTimeout(() => {
                setUploadStatus('');
            }, 2000);
        };

        input.click(); // Programmatically open the file dialog
        
    }

    return (
        <div className='s-bulkUpload'>
            <div className="s-b-f1">
                <div className="s-uploadBtn" onClick={handleBulkUpload}>
                    <i className='fas fa-plus' style={{ fontSize: '50px' }}></i>
                    <p>Select .CSV / .XLSX</p>
                </div>
                <div className="s-uploadBtn">
                    <i className='fas fa-link' style={{ fontSize: '50px' }}></i>
                    <p>Connect to Internet</p>
                </div>
            </div>

            {uploadStatus && <p style={{position:'absolute', top:'10px', left:'50%', transform:"translateX(50%)", padding:'10px', background:'var(--lmaterial2)', borderRadius:'10px'}} className="upload-status">{uploadStatus}</p>}

            <Table />
        </div>
    );
}
