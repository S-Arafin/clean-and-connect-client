import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaRecycle, FaRoad, FaBuilding, FaExclamationTriangle, FaUsers, FaCheckCircle} from 'react-icons/fa';
import Banner from '../components/Banner';
import CategoryCard from '../components/CategoryCards';
import { Link } from 'react-router';

const Home = () => {
    const [recentIssues, setRecentIssues] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, totalIssues: 0 });

    useEffect(() => {
        axios.get('http://localhost:3000/issues-recent')
            .then(res => setRecentIssues(res.data))
            .catch(err => console.error(err));

        axios.get('http://localhost:3000/stats')
            .then(res => setStats(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <Banner />

            <div className="py-16 bg-base-100 container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-2">Report by Category</h2>
                    <p className="text-gray-500">Identify and report issues to help us take action.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <CategoryCard 
                        icon={<FaRecycle />} 
                        title="Garbage" 
                        desc="Overflowing bins, illegal dumping" 
                        color="text-green-500" 
                    />
                    <CategoryCard 
                        icon={<FaBuilding />} 
                        title="Illegal Construction" 
                        desc="Unapproved structures, blocking paths" 
                        color="text-blue-500" 
                    />
                    <CategoryCard 
                        icon={<FaExclamationTriangle />} 
                        title="Broken Property" 
                        desc="Damaged benches, streetlights" 
                        color="text-yellow-500" 
                    />
                    <CategoryCard 
                        icon={<FaRoad />} 
                        title="Road Damage" 
                        desc="Potholes, broken footpaths" 
                        color="text-red-500" 
                    />
                </div>
            </div>

            {/* 3. Recent Complaints Section */}
            <div className="py-16 bg-base-200">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10">Recent Reports</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recentIssues.map(issue => (
                            <div key={issue._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
                                <figure className="h-48 overflow-hidden">
                                    <img src={issue.image} alt={issue.title} className="w-full h-full object-cover" />
                                </figure>
                                <div className="card-body">
                                    <div className="badge badge-secondary badge-outline mb-2">{issue.category}</div>
                                    <h3 className="card-title">{issue.title}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-2">{issue.description}</p>
                                    <p className="text-xs mt-2 font-semibold">{issue.location}</p>
                                    <div className="card-actions justify-end mt-4">
                                        <Link to={`/issues/${issue._id}`} className="btn btn-primary btn-sm">See Details</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center mt-10">
                        <Link to="/issues" className="btn btn-outline btn-wide">View All Issues</Link>
                    </div>
                </div>
            </div>
            <div className="py-20 bg-primary text-primary-content">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-12">Our Impact</h2>
                    <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-32">
                        <div className="flex flex-col items-center">
                            <FaUsers className="text-6xl mb-4 opacity-80" />
                            <span className="text-5xl font-extrabold">{stats.totalUsers}</span>
                            <span className="text-xl mt-2 uppercase tracking-wide opacity-80">Active Users</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <FaCheckCircle className="text-6xl mb-4 opacity-80" />
                            <span className="text-5xl font-extrabold">{stats.totalIssues}</span>
                            <span className="text-xl mt-2 uppercase tracking-wide opacity-80">Issues Reported</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-20 bg-base-100 text-center container mx-auto px-4">
                <div className="max-w-2xl mx-auto space-y-6">
                    <h2 className="text-4xl font-bold">Join the Clean Drive</h2>
                    <p className="text-lg text-gray-600">
                        Be a hero in your community. Sign up for our weekly clean-up drives and make a visible difference.
                    </p>
                    <Link to='auth/login' className="btn btn-accent btn-lg rounded-full px-10 shadow-lg">Become a Volunteer</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;