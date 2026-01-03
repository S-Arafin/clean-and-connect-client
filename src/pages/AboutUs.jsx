import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaBullseye, FaUsers, FaCheckCircle } from 'react-icons/fa';

const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
  };

  const steps = [
    { 
        title: "Identify", 
        desc: "Citizens report environmental issues like garbage buildup or road damage with location details and budgets.", 
        icon: <FaBullseye />, 
        color: "text-primary", 
        border: "border-primary" 
    },
    { 
        title: "Contribute", 
        desc: "Community members donate to specific causes. All contributions are tracked with transparent PDF reporting.", 
        icon: <FaUsers />, 
        color: "text-secondary", 
        border: "border-secondary" 
    },
    { 
        title: "Resolve", 
        desc: "The system automatically marks issues as 'Resolved' once the funding goal is met through collective support.", 
        icon: <FaCheckCircle />, 
        color: "text-primary", 
        border: "border-primary" 
    }
  ];

  return (
    <div className="bg-base-100 min-h-screen">
      <section className="py-20 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary mb-6"
          >
            Empowering Communities, One Issue at a Time.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-base-content/80 leading-relaxed"
          >
            <span className='text-secondary'>Clean And Connect</span> is a bridge between community problems and collective solutions. We believe that when citizens come together to fund local repairs and environmental needs, real change happens instantly.
          </motion.p>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className={`card bg-base-200 shadow-xl border-t-4 ${step.border}`}
            >
              <div className="card-body items-center text-center">
                <div className={`text-4xl ${step.color} mb-2`}>{step.icon}</div>
                <h3 className={`card-title ${step.color}`}>{step.title}</h3>
                <p className="text-base-content/70">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-16 px-4 bg-base-200/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Meet the Developer</h2>
              <p className="text-lg mb-6">
                I am <span className="font-bold text-primary">Sultanul Arafin</span>, a Full-Stack Developer 
                passionate about building modern web applications that solve real-world community problems.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:arafin23103@gmail.com" className="btn btn-primary gap-2">
                  <FaEnvelope /> Email
                </a>
                <a href="https://linkedin.com/in/sultanul-arafin" target="_blank" rel="noreferrer" className="btn btn-secondary btn-outline gap-2">
                    <div className='flex items-center gap-1 text-white'>
                        <FaLinkedin /> LinkedIn
                    </div>
                </a>
                <a href="https://github.com/S-Arafin" target="_blank" rel="noreferrer" className="btn btn-ghost gap-2">
                  <FaGithub /> GitHub
                </a>
              </div>
            </div>
            <div className="flex-none">
              <div className="avatar">
                <div className="w-48 h-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="https://github.com/S-Arafin.png" alt="Sultanul Arafin" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;