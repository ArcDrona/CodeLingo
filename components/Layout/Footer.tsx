import { Pacifico } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

export default function Footer() {
    return (
        <footer className="bg-gray-50 py-12 px-16">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Image
                                src="/LogoWithoutText.png"
                                alt="CodeLingo-Logo"
                                height={50}
                                width={50}
                                className="filter brightness-0"
                            />
                            <h3 className={`${pacifico.className} text-2xl`}>
                                CodeLingo
                            </h3>
                        </div>
                        
                        <p className="text-gray-600 text-sm max-w-md">
                            Subscribe to our newsletter for the latest features and updates from CodeLingo.
                        </p>
                        
                        <div className="flex max-w-md">
                            <input
                                type="email"
                                placeholder="Your Email Here"
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                            />
                            <Link href="/auth/signup">
                                <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-r-lg font-medium transition-colors text-sm">
                                    Join
                                </button>
                            </Link>
                        </div>
                        
                        <p className="text-gray-500 text-xs max-w-md">
                            By subscribing, you agree to our Privacy Policy and consent to receive updates.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4 text-sm">Quick Links</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {['Home Page', 'Our Courses', 'Support Center', 'Contact Us', 'Blog Posts'].map((link) => (
                                    <li key={link} className="hover:text-teal-600 cursor-pointer transition-colors">
                                        {link}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4 text-sm">Resources</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {['Help Center', 'FAQs', 'User Guide', 'Feedback', 'Community'].map((link) => (
                                    <li key={link} className="hover:text-teal-600 cursor-pointer transition-colors">
                                        {link}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4 text-sm">Connect With Us</h4>
                            <div className="flex space-x-4">
                                {['Facebook', 'Instagram', 'LinkedIn', 'YouTube'].map((social) => (
                                    <div key={social} className="hover:text-teal-600 cursor-pointer transition-colors">
                                        <span className="text-sm text-gray-600 hover:text-teal-600">{social}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-200 my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-gray-500 text-xs">
                        © 2025 CodeLingo. All rights reserved.
                    </p>
                    
                    <div className="flex space-x-6">
                        {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((link) => (
                            <span key={link} className="text-gray-500 hover:text-teal-600 cursor-pointer transition-colors text-xs">
                                {link}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}