import React from "react";
import { Link } from "react-router-dom";
import { FaXTwitter, FaFacebook, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaLeaf, FaCode } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content pt-16 border-t-4 border-primary">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
          
          <div className="space-y-6">
            <div className="flex items-center gap-2">
            
              <h1 className="text-2xl font-black tracking-tighter text-white uppercase">
                Clean<span className="text-primary">&</span>Connect
              </h1>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Clean & Connect is a bridge between community problems and collective solutions. 
              We believe that when citizens come together to fund local repairs, real change happens instantly.
            </p>
          </div>

          <div>
            <h2 className="text-white font-bold mb-6 uppercase tracking-widest text-sm border-l-4 border-primary pl-3">
              Navigation
            </h2>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="opacity-70 hover:opacity-100 hover:text-primary transition-all">Home</Link></li>
              <li><Link to="/issues" className="opacity-70 hover:opacity-100 hover:text-primary transition-all">All Issues</Link></li>
              <li><Link to="/community-stats" className="opacity-70 hover:opacity-100 hover:text-primary transition-all">Impact Hub</Link></li>
              <li><Link to="/auth/login" className="opacity-70 hover:opacity-100 hover:text-primary transition-all">Volunteer Login</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-white font-bold mb-6 uppercase tracking-widest text-sm border-l-4 border-secondary pl-3">
              The Developer
            </h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="avatar">
                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="https://github.com/S-Arafin.png" alt="Sultanul Arafin" />
                </div>
              </div>
              <div>
                <p className="text-white font-bold text-sm">Sultanul Arafin</p>
                <p className="text-xs opacity-60">Full-Stack Developer</p>
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              <a href="https://www.facebook.com/profile.php?id=61577959433561" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://github.com/S-Arafin" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                <FaGithub size={20} />
              </a>
              <a href="https://linkedin.com/in/sultanul-arafin" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                <FaLinkedinIn size={20} />
              </a>
              <a href="mailto:arafin23103@gmail.com" className="hover:text-primary transition-colors">
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-white font-bold mb-6 uppercase tracking-widest text-sm border-l-4 border-accent pl-3">
              Contact
            </h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 opacity-70">
                <FaMapMarkerAlt className="text-primary mt-1" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 opacity-70">
                <FaPhoneAlt className="text-primary" />
                <span>+8801979817736</span>
              </li>
              <li className="flex items-center gap-3 opacity-70">
                <FaEnvelope className="text-primary" />
                <span>arafin23103@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
      <div className="bg-black/30 py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium opacity-50 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Clean & Connect. Developed by Sultanul Arafin.</p>
          <div className="flex gap-6">
             <div className="flex items-center gap-1">
               <FaCode className="text-primary" /> <span>MERN Stack Project</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;