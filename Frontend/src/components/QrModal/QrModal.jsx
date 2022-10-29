import React from 'react'
import modal from './QrModal.module.css'
import {QRious} from 'react-qrious'

export default function QrModal(props) {

    // let classesObj
    // let userObj

    // // Modal JS
    // let modal = document.getElementById('qrCodeModal')
    // let btn = document.getElementById('showQrCode')
    // let span = document.getElementsByClassName("close")[0];

    // function openModal(name, roll_number) {
    //     modal.style.display = "block";
    //     setQrCode(name, roll_number)
    // }

    // span.onclick = function () {
    //     modal.style.display = "none";
    // }

    // window.onclick = function (event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //     }
    // }

    // // below code is for qrcode part as an interface of web application
    // let qr;
    // function generateQRCode(string) {
    //     qr = new QRious({
    //         element: document.getElementById('qr-code'),
    //         size: 300,
    //         value: string
    //     });
    //     qr.set({
    //         foreground: 'black',
    //         size: 300,
    //         value: string
    //     });
    // }

    // function setQrCode(name, roll_number) {
    //     let i = 0
    //     while(classesObj[i] != undefined) {
    //       if(classesObj[i].name == name) {
    //         let j = 0
    //         while(j < classesObj[i].students.length) {
    //           if(classesObj[i].students[j].roll_number == roll_number) {
    //             let res = generateQRCode(classesObj[i].students[j].qrcode_string)
    //             console.log(res);
    //           }
    //           j++
    //         }
    //       }
    //       i++
    //     }
    //   }


    return (
        <div className={modal.modal} id={modal.qrCodeModal}>
            <div className={modal.modal_content}>
                <span className={modal.close}>&times;</span>
                <p>Your QR Code</p><br />
                <canvas id="qr-code"></canvas>
            </div>
        </div>
    )
}