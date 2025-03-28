import React, { useState } from 'react'

export default function AddTemplate({sid,setRegular}) {

    const [formData, setFormData] = useState({});
    const [simg, setSimg] = useState('')


    const [categoryBadges, setCategoryBadges] = useState([
        ["Brand"],
        ["Warranty"],
        ["Model"],
        ["Color"],
        ["Weight"],
        ["Ingredients"],
        ["ExpiryDate"],
        ["Size"],
        ["Material"],
        ["Age Group"],
        ["Pages"],
        ["Publisher"],
        ["ISBN"],
        ["Skin Type"],
        ["Application Method"],
        ["Image URL"]
    ]);

    const [selectedFields, setSelectedFields] = useState([])



    const handleImageSelect = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*"; // Allow only image files

        input.onchange = (event) => {
            const file = event.target.files[0];

            if (file) {
                setFormData((prevData) => ({
                    ...prevData,
                    img: 'https://artattackk.com/blogs/wp-content/uploads/2024/04/cover-8.jpg', // Set img field to the file name
                    // img: file.name, // Set img field to the file name
                }));
                const localURL = URL.createObjectURL(file);
                setSimg(localURL)
                // setSimg('https://artattackk.com/blogs/wp-content/uploads/2024/04/cover-8.jpg')

            }
        };

        input.click(); // Open the file dialog
    };


    const handleInputChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };


    const [selectedTemplate, setSelectedTemplate] = useState([
        {
            "category": "Custom",
            "fields":
                [
                    { "name": "category", "type": "string", "required": true, "label": "Category" },
                    { "name": "productName", "type": "string", "required": true, "label": "Product Name" },
                    { "name": "price", "type": "number", "required": true, "label": "Price" },
                    { "name": "availability", "type": "number", "required": true, "label": "Availability" },

                ]
        }
    ]);


    const mapInputType = (type) => {
        if (type === "string") return "text";
        if (type === "number") return "number";
        if (type === "Number") return "number";
        if (type === "date") return "date";
        return "text"; // Default to text if no match
    };




    const handleSubmit = async () => {
        const payload = {
            category: formData.category || "",
            productName: formData.productName || "",
            brand: formData.brand || "",
            warranty: formData.warranty || "",
            model: formData.model || "",
            color: formData.color || "",
            img: formData.img || "", // Add logic to handle image URLs
            dynamicFields: {
                price: formData.price || null,
                availability: formData.availability || null,
            },
            weight: formData.weight || "",
            ingredients: formData.ingredients || "",
            expiryDate: formData.expiryDate || "",
            size: formData.size || "",
            material: formData.material || "",
            ageGroup: formData.ageGroup || "",
            pages: formData.pages || null,
            publisher: formData.publisher || null,
            ISBN: formData.ISBN || null,
            skinType: formData.skinType || null,
            applicationMethod: formData.applicationMethod || null,
            sid: sid
        };

        const templatePayload = {
            category: formData.category || "Custom",
            fields: selectedTemplate[0]?.fields || [],
        };


        try {
            const templateResponse = await fetch("https://gcrneuratechserver.vercel.app/seller/addtemplate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(templatePayload),
            });
    
            if (templateResponse.ok) {
                alert("Template saved successfully!");
            } else {
                alert("Failed to save template.");
            }
        } catch (error) {
            console.error("Error saving template:", error);
            alert("An error occurred while saving the template.");
        }






        try {
            const response = await fetch("https://gcrneuratechserver.vercel.app/seller/addproduct", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Product added successfully!");
                setFormData({}); // Reset form
            } else {
                alert("Failed to add product.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred.");
        }
    };

    function addField(fieldName) {
        const fieldMapping = {
            "Brand": { name: "brand", type: "string", required: false, label: "Brand" },
            "Warranty": { name: "warranty", type: "string", required: false, label: "Warranty" },
            "Model": { name: "model", type: "string", required: false, label: "Model" },
            "Color": { name: "color", type: "string", required: false, label: "Color" },
            "Weight": { name: "weight", type: "string", required: false, label: "Weight" },
            "Ingredients": { name: "ingredients", type: "string", required: false, label: "Ingredients" },
            "ExpiryDate": { name: "expiryDate", type: "date", required: false, label: "Expiry Date" },
            "Size": { name: "size", type: "string", required: false, label: "Size" },
            "Material": { name: "material", type: "string", required: false, label: "Material" },
            "Age Group": { name: "ageGroup", type: "string", required: false, label: "Age Group" },
            "Pages": { name: "pages", type: "number", required: false, label: "Pages" },
            "Publisher": { name: "publisher", type: "string", required: false, label: "Publisher" },
            "ISBN": { name: "ISBN", type: "string", required: false, label: "ISBN" },
            "Skin Type": { name: "skinType", type: "string", required: false, label: "Skin Type" },
            "Application Method": { name: "applicationMethod", type: "string", required: false, label: "Application Method" },
            "Image URL": { name: "img", type: "string", required: false, label: "Image URL" },
        };
    
        if (fieldMapping[fieldName]) {
            setSelectedTemplate((prevTemplates) => {
                const currentTemplate = { ...prevTemplates[0] };
    
                // Check if the field already exists in the fields array
                const fieldIndex = currentTemplate.fields.findIndex(
                    (field) => field.name === fieldMapping[fieldName].name
                );
    
                if (fieldIndex !== -1) {
                    // Field exists, remove it
                    currentTemplate.fields.splice(fieldIndex, 1);
                    
                    setSelectedFields((prevFields) =>
                        prevFields.filter((field) => field !== fieldName)
                    );
                } else {
                    // Field does not exist, add it
                    currentTemplate.fields.push(fieldMapping[fieldName]);
                    setSelectedFields((prevFields) => [...prevFields, fieldName]);
                }
    
                return [currentTemplate];
            });
        } else {
            alert("Field not recognized!");
        }
    }
    
    




    return (
        <>
            <div className="s-singleForm" style={{boxSizing:"border-box", paddingLeft:'20px', width:'95%'}}>
                <div className="s-badges">
                    {categoryBadges.map((badge, index) => (
                        <div
                            key={index}
                            
                            onClick={() => addField(badge[0])}

                            className={selectedFields.includes(badge[0]) ? 's-t-active' : ''}

                        >
                            {badge[0]} <i className='fas fa-add'></i> 
                        </div>
                    ))}
                    <div className="myAddButton" onClick={() => setRegular(true)}>
                        Cancel  <i className="fas fa-close"></i> 
                    </div>
                </div>
                <div className="s-f1">

                    <div className="s-uploadBtn" onClick={handleImageSelect}>
                        {simg ? <img height={'100%'} width={'100%'} src={simg} /> :
                            <>
                                <i className="fas fa-plus" style={{ fontSize: "50px" }}></i>
                                <p>Select Image</p>
                            </>
                        }
                    </div>

                    <div className="s-side1">
                        {selectedTemplate[0]?.fields?.slice(0, 4).map((formField, index) => (
                            <span key={index}>
                                <label>{formField.label}</label>
                                <input
                                    type={mapInputType(formField.type)}
                                    placeholder={formField.name}
                                    required={formField.required}
                                    value={formData[formField.name] || ""}
                                    onChange={(e) => handleInputChange(formField.name, e.target.value)}
                                />
                            </span>
                        ))}
                    </div>
                </div>
                <div className="s-f2" style={{ width: "95%" }}>
                    {selectedTemplate[0]?.fields?.slice(4).map((formField, index) => (
                        <span key={index}>
                            <label>{formField.label}</label>
                            <input
                                type={mapInputType(formField.type)}
                                placeholder={formField.name}
                                required={formField.required}
                                value={formData[formField.name] || ""}
                                onChange={(e) => handleInputChange(formField.name, e.target.value)}
                            />
                        </span>
                    ))}

                    <button style={{ marginLeft: 'auto' }} onClick={() => setFormData({})}>Reset</button>
                    <button onClick={handleSubmit}>Save Template</button>

                </div>
            </div>
        </>
    )
}
