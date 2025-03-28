

import React, { useState, useEffect } from "react";
import Loading from "./Loading";

export default function SingleUpload({ sid, setRegular }) {
    const [formData, setFormData] = useState({});
    const [simg, setSimg] = useState('')

    const [categoryBadges, setCategoryBadges] = useState([
        ["Electronics", "fas fa-plug"],
        ["Food", "fas fa-utensils"],
        ["Clothes", "fas fa-shirt"],
        ["Grocery", "fas fa-basket-shopping"],
        ["Books", "fas fa-book"],
        ["Kitchen", "fas fa-kitchen-set"],
        ["Stationery", "fas fa-store"],
        ["Health", "fas fa-heart-pulse"],
        ["Toys", "fas fa-car-side"],
        ["Sports", "fas fa-futbol"],
        ["Beauty", "fa-brands fa-gratipay"],

    ]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(
        categoryBadges[0][0]
    );
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState([]);

    useEffect(() => {
        let isMounted = true; // Track if the component is mounted
        const fetchData = async () => {
            try {
                const res = await fetch("https://gcrneuratechserver.vercel.app/seller/gettemplate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ category: "All", sid }),
                });
                if (res.ok) {
                    const data = await res.json();
                    if (isMounted) {
                        setTemplates(data.templates);
                        setSelectedTemplate(
                            data.templates.filter((tp) => tp.category === selectedCategory)
                        );
                        setIsLoading(false);

                        // Dynamically update categoryBadges
                        const newCategoryBadges = [...categoryBadges]; // Copy current badges
                        data.templates.forEach((template) => {
                            // Check if the category already exists in the state
                            const exists = newCategoryBadges.some((badge) => badge[0] === template.category);
                            if (!exists) {
                                // Add new category with the default icon
                                newCategoryBadges.push([template.category, "fas fa-home"]);
                            }
                        });
                        setCategoryBadges(newCategoryBadges); // Update state with new badges
                    }
                }
            } catch (error) {
                console.error("Error fetching templates:", error);
            }
        };
        fetchData();

        // Cleanup function
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const filteredTemplate = templates.filter(
            (tp) => tp.category === selectedCategory
        );
        setSelectedTemplate(filteredTemplate);
    }, [selectedCategory, templates]);






    const handleInputChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const handleSubmit = async () => {
        const payload = {
            category: selectedCategory || "",
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

    const mapInputType = (type) => {
        if (type === "string") return "text";
        if (type === "number") return "number";
        if (type === "Number") return "number";
        if (type === "date") return "date";
        return "text"; // Default to text if no match
    };


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

    return (
        <div className="s-singleUpload">
            <div className="s-badges">
                {categoryBadges.map((badge, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedCategory(badge[0])}
                        className={selectedCategory !== badge[0] ? "s-t-active" : ""}
                    >
                        <i className={badge[1]}></i> {badge[0]}
                    </div>
                ))}
                <div className="myAddButton" onClick={() => setRegular(false)} style={{ marginLeft: "auto" }}>
                    <i className="fas fa-add" ></i> Add Template
                </div>
            </div>

            {isLoading ? (
                <Loading />
            ) : (

                <div className="s-singleForm">
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
                    <div className="s-f2">
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
                        <button onClick={() => setFormData({})}>Reset</button>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>

            )}
        </div>
    );
}
