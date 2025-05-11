"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <div className="relative min-h-screen bg-black text-white pt-24 pb-8 px-8">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#4F6BFF10_1px,transparent_1px),linear-gradient(to_bottom,#4F6BFF10_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="fixed top-0 -left-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse" />
            <div className="fixed bottom-0 -right-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse delay-700" />

            <div className="relative max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                    <p className="text-xl text-gray-400">
                        We'd love to hear from you. Please fill out this form or use our
                        contact information below.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <MapPin className="w-6 h-6 text-[#4F6BFF] mt-1" />
                                <div>
                                    <h3 className="font-semibold mb-1">Address</h3>
                                    <p className="text-gray-400">
                                        123 Innovation Drive<br />
                                        San Francisco, CA 94105
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Phone className="w-6 h-6 text-[#4F6BFF] mt-1" />
                                <div>
                                    <h3 className="font-semibold mb-1">Phone</h3>
                                    <p className="text-gray-400">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Mail className="w-6 h-6 text-[#4F6BFF] mt-1" />
                                <div>
                                    <h3 className="font-semibold mb-1">Email</h3>
                                    <p className="text-gray-400">contact@summarizeai.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20">
                            <h3 className="font-semibold mb-2">Business Hours</h3>
                            <p className="text-gray-400">
                                Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                                Saturday - Sunday: Closed
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20 p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-300 mb-1"
                                >
                                    Name
                                </label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border-[#4F6BFF]/30 text-white placeholder:text-gray-500 focus:border-[#4F6BFF] focus:ring-1 focus:ring-[#4F6BFF] transition-all duration-300"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-300 mb-1"
                                >
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border-[#4F6BFF]/30 text-white placeholder:text-gray-500 focus:border-[#4F6BFF] focus:ring-1 focus:ring-[#4F6BFF] transition-all duration-300"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="subject"
                                    className="block text-sm font-medium text-gray-300 mb-1"
                                >
                                    Subject
                                </label>
                                <Input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border-[#4F6BFF]/30 text-white placeholder:text-gray-500 focus:border-[#4F6BFF] focus:ring-1 focus:ring-[#4F6BFF] transition-all duration-300"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-300 mb-1"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border-[#4F6BFF]/30 text-white placeholder:text-gray-500 focus:border-[#4F6BFF] focus:ring-1 focus:ring-[#4F6BFF] transition-all duration-300 rounded-md"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-[#4F6BFF] hover:bg-[#4F6BFF]/90 transition-all duration-300"
                            >
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
} 