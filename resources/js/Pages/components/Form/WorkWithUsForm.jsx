import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Group from '../../assets/Group.png';
import { GrAttachment } from "react-icons/gr";
import { toast } from 'react-toastify';
import { sendEmail } from "../../Api/Api";

function WorkWithUsForm() {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [hisemail, setEmail] = useState("");
  const [pdf, setPdf] = useState("");
  const [subject, setSubject] = useState(""); 
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('hisemail', hisemail);
    formData.append('subject', subject); 
    formData.append('content', content); 
    if (pdf) formData.append('pdf', pdf);

    try {
      const response = await sendEmail(formData);
     
      if (response.success) {
        toast.success(t("email_sent_success"));
        setName("");
        setPhone("");
        setPdf("");
        setEmail("");
        setSubject(""); 
        setContent("");
      } else {
        toast.error(t("email"));
        console.error("API response:", response.data);
        console.log([...formData.entries()]);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error(t("email_error_occurred"));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { 
      toast.error("File size is too large.");
    } else if (file && !file.type.startsWith('application/pdf')) {
      toast.error("Only PDF files are allowed.");
    } else {
      setPdf(file);
    }
  };

  return (
    <div className="bg-[#F6EFE7] my-10">
      <div className="p-10 lg:p-1 gap-5 flex flex-col justify-around items-center lg:flex-row">
        <div className="lg:w-[30%] flex flex-col justify-center gap-5 p-5 pr-0 lg:pr-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            {t('workWithUs.heading')}
          </h2>
          <p className="text-gray-700 mb-6">{t('workWithUs.description')}</p>
          <img
            src={Group}
            alt={t('workWithUs.imageAlt')}
            className="w-3/4 mx-auto lg:w-full"
          />
        </div>

        <div className="lg:w-[30%] p-6 lg:p-8 rounded-lg border-[1px] border-gray-400">
          <p className="text-gray-600 mb-6">{t('workWithUs.formDescription')}</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('formFields.name')}
                className="w-full bg-transparent p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8D9A88]"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t('formFields.phone')}
                className="w-full sm:w-1/2 p-3 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8D9A88]"
              />
              <input
                type="email"
                name="email"
                value={hisemail}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('formFields.email')}
                className="w-full sm:w-1/2 p-3 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8D9A88]"
              />
            </div>
            <div>
              <input
                type="text"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={t('subject')}
                className="w-full bg-transparent p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8D9A88]"
              />
            </div>
            <div>
              <textarea
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={t('content')}
                rows="4"
                className="w-full bg-transparent p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8D9A88]"
              />
            </div>
            <div>
              <label className="flex items-center bg-transparent gap-2 p-3 border border-gray-300 rounded-md cursor-pointer text-gray-500">
                <div className="flex gap-2 bg-[#E5D2BE] justify-center items-center text-[#577260] p-2 rounded-lg">
                  <GrAttachment /> {t('formFields.chooseFile')}
                </div>
                <span>{t('formFields.uploadCV')}</span>
                <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-[#F08330] text-white font-semibold py-3 rounded-md hover:bg-[#e0762c]"
            >
              {t('formFields.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default WorkWithUsForm;
