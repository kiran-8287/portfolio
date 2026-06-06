import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

interface ContactFormData {
    fullName: string;
    email: string;
    message: string;
}

const ContactSection = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        fullName: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const form = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey || templateId === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
            console.error('EmailJS credentials missing');
            setSubmitStatus('error');
            return;
        }

        setIsSubmitting(true);

        try {
            await emailjs.sendForm(
                serviceId,
                templateId,
                form.current!,
                publicKey
            );

            setSubmitStatus('success');
            setFormData({ fullName: '', email: '', message: '' });

            // Reset status after success
            setTimeout(() => {
                setSubmitStatus('idle');
            }, 5000);
        } catch (error) {
            console.error('Email error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="animate-in fade-in slide-in-from-bottom duration-700">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-primary mb-4">Let's Talk</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Whether you're looking to build a new website, or a existing platform,
                        or to bring a project to life, I'm here to help.
                    </p>
                </div>

                <form ref={form} onSubmit={handleSubmit} className="contact-form space-y-6">
                    <div className="form-group">
                        <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Violet"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Violet@gmail.com"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Share your thoughts"
                            required
                            rows={5}
                            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="contact-submit-btn w-full py-3 px-6 rounded-lg font-medium text-black bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Sending...' : 'Send'}
                    </button>

                    {submitStatus === 'success' && (
                        <div className="text-center text-sm text-green-600 dark:text-green-400 animate-in fade-in">
                            Message sent successfully! I'll get back to you soon.
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="text-center text-sm text-red-600 dark:text-red-400 animate-in fade-in">
                            Failed to send message. Please check your credentials or try again later.
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
};

export default ContactSection;
