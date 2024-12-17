import React, { useState } from "react";
import MyMap from "./Mymap";
import { toast } from "react-toastify";
import { sendEmail } from "../../Api/Api";
import { useTranslation } from "react-i18next";

const EmailForm = () => {
    const { t } = useTranslation();

    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [hisemail, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailData = {
            name,
            subject,
            content,
            hisemail,
        };

        try {
            const response = await sendEmail(emailData);
            if (response.success) {
                toast.success(t("email_sent_success"));
                setName("");
                setSubject("");
                setContent("");
                setEmail("");
            } else {
                toast.error(t("email_send_failed"));
            }
        } catch (error) {
            toast.error(t("email_error_occurred"));
            console.error("Error sending email:", error);
        }
    };

    const coffeePointCoordinates = [31.0372682, 31.3562094];
    const coffeePointHayElGammaCoordinates = [31.0369196, 31.3606581];

    return (
        <div className="container flex flex-col gap-12 p-6">
            <div className="flex flex-wrap justify-around gap-5">
                <div className="w-full md:w-1/2 flex flex-col gap-5">
                    <h2 className="text-2xl font-semibold">
                        {t("get_in_touch")}
                    </h2>
                    <div>
                        <MyMap
                            flex="flex-col"
                            address="📍Al Mashaya - in front of Ramada hotel - Mansoura"
                            position={coffeePointCoordinates}
                        />
                    </div>
                </div>

                <form
                    className="w-full md:w-1/3 flex flex-col gap-5"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="email"
                        id="email"
                        placeholder={t("placeholder_email")}
                        value={hisemail}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                        type="text"
                        id="name"
                        placeholder={t("placeholder_name")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="text"
                        id="subject"
                        placeholder={t("placeholder_subject")}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <textarea
                        id="content"
                        placeholder={t("placeholder_content")}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#F6944D] text-white font-semibold py-3 rounded-md"
                    >
                        {t("send")}
                    </button>
                </form>
            </div>

            <div className="container p-5">
                <MyMap
                    w="w-full"
                    wf="w-full"
                    address="📍Hay El Gamma - in front of University Stadium - Mansoura"
                    position={coffeePointHayElGammaCoordinates}
                    flex="md:flex-row flex-col"
                />
            </div>
        </div>
    );
};

export default EmailForm;
