import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        businessName: "",
        email: "",
        password: "",
        contactNumber: "",
        businessAddress: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
            phoneNumber: "",
        },
        taxId: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("businessAddress.")) {
            const addressField = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                businessAddress: {
                    ...prev.businessAddress,
                    [addressField]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log("Form Data Submitted: ", formData);

        try {

            const response = await fetch('https://gcrneuratechserver.vercel.app/seller/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json();
            if (response.ok) {
                alert("Seller registered successfully!");
                console.log("Response Data: ", data);
                // Optionally, clear the form or redirect the user
                setFormData({
                    businessName: "",
                    email: "",
                    password: "",
                    contactNumber: "",
                    businessAddress: {
                        street: "",
                        city: "",
                        state: "",
                        zipCode: "",
                        country: "",
                        phoneNumber: "",
                    },
                    taxId: "",
                })

                navigate("/")
            }

            else {
                alert('Error: ${data.message}');
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    return (

        // <div className="register">
        //     <div className="register-container">
        //         <h2>Register</h2>
        //         <form onSubmit={handleSubmit} className="register-form">
        //             <div>
        //                 <label>Business Name</label>
        //                 <input
        //                     type="text"
        //                     name="businessName"
        //                     value={formData.businessName}
        //                     onChange={handleChange}
        //                     required
        //                 />
        //             </div>
        //             <div>
        //                 <label>Email</label>
        //                 <input
        //                     type="email"
        //                     name="email"
        //                     value={formData.email}
        //                     onChange={handleChange}
        //                     required
        //                 />
        //             </div>
        //             <div>
        //                 <label>Password</label>
        //                 <input
        //                     type="password"
        //                     name="password"
        //                     value={formData.password}
        //                     onChange={handleChange}
        //                     required
        //                 />
        //             </div>
        //             <div>
        //                 <label>Contact Number</label>
        //                 <input
        //                     type="tel"
        //                     name="contactNumber"
        //                     value={formData.contactNumber}
        //                     onChange={handleChange}
        //                     required
        //                 />
        //             </div>
        //             <fieldset>
        //                 <legend>Business Address</legend>
        //                 <div>
        //                     <label>Street</label>
        //                     <input
        //                         type="text"
        //                         name="businessAddress.street"
        //                         value={formData.businessAddress.street}
        //                         onChange={handleChange}
        //                         required
        //                     />
        //                 </div>
        //                 <div>
        //                     <label>City</label>
        //                     <input
        //                         type="text"
        //                         name="businessAddress.city"
        //                         value={formData.businessAddress.city}
        //                         onChange={handleChange}
        //                         required
        //                     />
        //                 </div>
        //                 <div>
        //                     <label>State</label>
        //                     <input
        //                         type="text"
        //                         name="businessAddress.state"
        //                         value={formData.businessAddress.state}
        //                         onChange={handleChange}
        //                         required
        //                     />
        //                 </div>
        //                 <div>
        //                     <label>Zip Code</label>
        //                     <input
        //                         type="text"
        //                         name="businessAddress.zipCode"
        //                         value={formData.businessAddress.zipCode}
        //                         onChange={handleChange}
        //                         required
        //                     />
        //                 </div>
        //                 <div>
        //                     <label>Country</label>
        //                     <input
        //                         type="text"
        //                         name="businessAddress.country"
        //                         value={formData.businessAddress.country}
        //                         onChange={handleChange}
        //                         required
        //                     />
        //                 </div>
        //                 <div>
        //                     <label>Phone Number</label>
        //                     <input
        //                         type="tel"
        //                         name="businessAddress.phoneNumber"
        //                         value={formData.businessAddress.phoneNumber}
        //                         onChange={handleChange}
        //                         required
        //                     />
        //                 </div>
        //             </fieldset>
        //             <div>
        //                 <label>Tax ID</label>
        //                 <input
        //                     type="text"
        //                     name="taxId"
        //                     value={formData.taxId}
        //                     onChange={handleChange}
        //                     required
        //                 />
        //             </div>
        //             <button type="submit">Register</button>
        //         </form>
        //     </div>
        // </div>



        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="register-form-group">
                    <label>Business Name</label>
                    <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="register-form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="register-form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="register-form-group">
                    <label>Contact Number</label>
                    <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <fieldset className="register-form-fieldset">
                    <legend>Business Address</legend>
                    <div className="register-form-group">
                        <label>Street</label>
                        <input
                            type="text"
                            name="businessAddress.street"
                            value={formData.businessAddress.street}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="register-form-group">
                        <label>City</label>
                        <input
                            type="text"
                            name="businessAddress.city"
                            value={formData.businessAddress.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="register-form-group">
                        <label>State</label>
                        <input
                            type="text"
                            name="businessAddress.state"
                            value={formData.businessAddress.state}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="register-form-group">
                        <label>Zip Code</label>
                        <input
                            type="text"
                            name="businessAddress.zipCode"
                            value={formData.businessAddress.zipCode}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="register-form-group">
                        <label>Country</label>
                        <input
                            type="text"
                            name="businessAddress.country"
                            value={formData.businessAddress.country}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="register-form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="businessAddress.phoneNumber"
                            value={formData.businessAddress.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </fieldset>
                <div className="register-form-group">
                    <label>Tax ID</label>
                    <input
                        type="text"
                        name="taxId"
                        value={formData.taxId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="register-submit-btn">Register</button>
            </form>
        </div>


    );
};

export default Register;