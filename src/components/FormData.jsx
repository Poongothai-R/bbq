import { useRef, useState } from "react";
import EmailJS from "emailjs-com";

export default function FormData() {
    const formRef = useRef();
    const [formSubmit, setFormSubmit] = useState(false);
    const now = new Date();
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const dateLocal = new Date(now.getTime() + (2 * 60 * 60 * 1000) - offsetMs);
    const minTime = dateLocal.toISOString().slice(0, 19).replace(/-/g, "-");

    const handleSubmit = (e) => {
        e.preventDefault();
        EmailJS.sendForm(
            "service_l6h5jmk",
            "template_x2fdt3b",
            formRef.current,
            "7lOVdyYSzgSmQbCw4"
        )
            .then(result => (setFormSubmit(true)),
                (error => alert("sorry,your booking has failed")));
        e.target.reset();
    };

    return (
        <div className="book-table">
            <form ref={formRef} onSubmit={handleSubmit} className="form-section">
                <h1>Book a Table</h1>
                <div className="form_content">
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Name" name="user_name" id="name" required />
                    <label>Email</label>
                    <input type="email" placeholder="Email" name="user_email" required />
                    <label>No of Seats</label>
                    <input type="number" placeholder="No of Seats" name="user_seats" required />
                    <label>Booking date</label>
                    <input type="datetime-local" min={minTime} step="any" placeholder="Date" name="date" required />
                    <button className="form-btn">Submit</button>
                </div>
                {formSubmit && "Thank you for contacting us! "}
            </form>
        </div>
    );
};