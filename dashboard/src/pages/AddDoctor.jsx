import React, { useContext, useState } from 'react'
import docSkeleton from "../public/docSkeleton.jpg"
import { doctorContext } from '../contexts/DoctorContextProvider';
function AddDoctor() {
    const init = {
        name: "",
        phNumber: "",
        email: "",
        dept: "",
        gender: "",
        avatar: ""
    }

    const [formData, setFormData] = useState(init)
    const [preview, setPreview] = useState(null);
    const { addDoctor } = useContext(doctorContext)

    const handleChange = (e) => {
        if (e.target.name == "avatar") {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => { //for showing the user immediately the file which he has uploaded
                    setPreview(reader.result); // Set the preview as the file's data URL
                };
                reader.readAsDataURL(file); // Read the file as a data URL

                setFormData((prev) => ({
                    ...prev,
                    "avatar": file
                }))
            }
        } else {
            const { name, value } = e.target

            setFormData((prev) => ({
                ...prev,
                [name]: value
            }))
        }
    }



    const handleRegisterDoc = () => {


        if (
            formData.name.length == 0 || formData.phNumber.length == 0 || formData.email.length == 0 || formData    .dept.length == 0
            || formData.gender.length == 0 || formData.avatar.length == 0
        ) {
            //show error message
            console.log("fill fields first")
        }
        else {
            const formDataObj = new FormData();
            formDataObj.append("name", formData.name)
            formDataObj.append("phNumber", formData.phNumber)
            formDataObj.append("email", formData.email)
            formDataObj.append("dept", formData.dept)
            formDataObj.append("gender", formData.gender)
            formDataObj.append("avatar", formData.avatar)
            addDoctor(formDataObj)
        }

        console.log(formData)

    }



    return (
        <div className='  #e5e5e5 h-full w-full bg-[#e5e5e5] rounded-l-3xl p-10 text-center'>
            <h1 className='text-3xl font-bold'>HappyCare +++</h1>
            <h2 className='mt-7 font-semibold'>Register a new Doctor </h2>

            <div className='flex flex-col md:flex-row mt-10 gap-2'>
                <div className='flex flex-col'>
                    <img src={preview || docSkeleton} alt="" className='h-96 rounded-lg' />
                    <input type="file" name='avatar' onChange={handleChange} />
                </div>
                <div id='fields' className=''>
                    <input type="text" name='name' placeholder='name' value={formData.name} onChange={handleChange} className='h-10 p-2 w-full border border-slate-600 rounded-lg mb-4 ' />
                    <input type="text" name='phNumber' value={formData.phNumber} onChange={handleChange} placeholder='999-999-999' className='h-10 p-2 w-full border border-slate-600 rounded-lg mb-4 ' />
                    <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='eg.abc@gmail.com' className='h-10 p-2 w-full border border-slate-600 rounded-lg mb-4 ' />
                    <select name="dept" id="" value={formData.dept} onChange={handleChange} className='h-10 p-2 w-full border border-slate-600 rounded-lg mb-4 '>
                        <option value="" hidden>department</option>
                        <option value="Cardiology">cardiology</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="Psychiatry">Psychiatry</option>
                        <option value="general">General</option>
                    </select>
                    <select name="gender" id="" value={formData.gender} onChange={handleChange} className='h-10 p-2 w-full border border-slate-600 rounded-lg mb-4 '>
                        <option value="" hidden>select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">others</option>
                    </select>
                    <button className='bg-blue-500 hover:bg-blue-400 px-2 py-2 font-semibold text-white rounded-lg' onClick={handleRegisterDoc}>Register new Doctor</button>

                </div>

            </div>

        </div>
    )
}

export default AddDoctor
