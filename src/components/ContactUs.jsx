import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaMapMarkerAlt, FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ContactUs = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.sendForm(
      import.meta.env.VITE_SERVICE_ID,
      import.meta.env.VITE_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_PUBLIC_KEY
    )
    .then(() => {
      Swal.fire({
        title: 'Message Sent!',
        text: 'Thank you for reaching out to CleanConnect.',
        icon: 'success',
        confirmButtonColor: 'primary'
      });
      form.current.reset();
      setIsSending(false);
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please check your credentials and try again.',
        icon: 'error'
      });
      setIsSending(false);
    });
  };

  return (
    <section className="bg-base-100 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-primary mb-4"
          >
            Get In Touch
          </motion.h2>
          <p className="text-base-content/70">Have questions about an issue or donation? We are here to help.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-6">
              <div className="bg-primary/10 p-4 rounded-full text-primary text-2xl">
                <FaEnvelope />
              </div>
              <div>
                <h4 className="font-bold text-lg">Email Us</h4>
                <p className="text-base-content/70 text-secondary font-medium">example@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="bg-secondary/10 p-4 rounded-full text-secondary text-2xl">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h4 className="font-bold text-lg">Location</h4>
                <p className="text-base-content/70 font-medium">Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="bg-base-200 p-8 rounded-2xl border-l-8 border-secondary shadow-sm">
              <h4 className="font-bold mb-2">Community Support</h4>
              <p className="text-sm text-base-content/60 italic">
                "CleanConnect is built by the community, for the community. Your feedback helps us improve our tracker and resolve issues faster."
              </p>
              <div className="flex gap-4 mt-4">
                <a href="https://github.com/S-Arafin" target="_blank" rel="noreferrer" className="text-xl hover:text-primary transition-colors">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com/in/sultanul-arafin" target="_blank" rel="noreferrer" className="text-xl hover:text-secondary transition-colors">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="card bg-base-200 shadow-xl"
          >
            <form ref={form} onSubmit={sendEmail} className="card-body gap-4">
              <input type="hidden" name="title" value="CleanConnect Issue Report" />
              
              <div className="form-control flex justify-center gap-10">
                <label className="label font-semibold">Name</label>
                <input 
                  type="text" 
                  name="user_name" 
                  placeholder="Your Name" 
                  className="input input-bordered focus:border-primary border-2" 
                  required 
                />
              </div>

              <div className="form-control flex justify-center gap-10">
                <label className="label font-semibold">Email</label>
                <input 
                  type="email" 
                  name="user_email" 
                  placeholder="arafin23103@gmail.com" 
                  className="input input-bordered focus:border-secondary border-2" 
                  required 
                />
              </div>

              <div className="form-control flex justify-center gap-7">
                <label className="label font-semibold">Message</label>
                <textarea 
                  name="message" 
                  placeholder="How can we help?" 
                  className="textarea textarea-bordered h-32 focus:border-primary border-2" 
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSending}
                className="btn btn-primary mt-4 flex items-center gap-2 group text-primary-content"
              >
                {isSending ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    Send Message 
                    <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;