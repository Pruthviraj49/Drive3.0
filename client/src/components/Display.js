import React from 'react'
import './Display.css'
import { useState, useEffect } from 'react';
const Display = ({ contract, account }) => {
    const [data, setData] = useState("");
    const getData = async () => {
        let dataArray;
        const OtherAddress = document.querySelector(".address").value;
        try {
            if (OtherAddress) {
                dataArray = await contract.display(OtherAddress);
                console.log(dataArray);
            } else {
                dataArray = await contract.display(account);

            }
        } catch (e) {
            alert("You don't have access")
        }
        const isEmpty = Object.keys(dataArray).length === 0;
        if (!isEmpty) {
            const str = dataArray.toString();
            const str_array = str.split(",");
            const images = str_array.map((item, i) => {
                return (
                    <a href={item} key={i} target="_blank">
                        <img key={i} src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`} alt="img" className='"image-list'></img>

                    </a>
                )
            });
            setData(images);
        }
        else {
            alert("No images to display");
        }

    };

    return (
        <div>
            <div className='image-list'>{data}</div>
            <input type="text" placeholder='Enter Address' className='address'></input>
            <button className='center button' onClick={getData}> Get Data</button>
        </div>
    )
}
export default Display;