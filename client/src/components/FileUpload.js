import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import "./FileUpload.css"
export default function FileUpload(account, provider, contract) {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No Image Selected");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new Data();
                formData("file", file);

            } catch (e) {
                alert("Unable to upload image")
            }
        }
    };
    const retrieveFile = () => { };

    return (
        <div className='top'>FileUpload

            <form className='form' onSubmit={handleSubmit}>

                <label htmlFor='file-upload' className='choose'>Choose Image</label>
                <input disabled={!account} type='file' id='file-upload' name='data' onChange={retrieveFile}></input>
                <span className='textArea'>Image: #temp.png</span>
                <button type='submit' className='upload'>Upload File</button>
            </form>
        </div>
    )
}
