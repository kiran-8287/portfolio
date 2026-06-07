import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FiMail, FiMessageSquare, FiUser } from 'react-icons/fi';
import GooeyButton from './GooeyButton';

interface ContactFormData {
    fullName: string;
    email: string;
    message: string;
}

const inputClassName =
    'w-full px-3.5 py-3 md:px-4 md:py-4 bg-white dark:bg-background/80 border-0 border-l-2 border-l-foreground/15 rounded-r-lg text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-l-foreground focus:ring-0 transition-all text-sm md:text-base';

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
            <div className="max-w-[560px] mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-primary mb-4">Let's Talk</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Got an idea, an opportunity, or just want to say hi? My inbox is always open.
                    </p>
                </div>

                <div className="bg-[#F7F7F7] dark:bg-secondary/20 rounded-xl p-5 sm:p-8 md:p-10 border border-border/40">
                    <form ref={form} onSubmit={handleSubmit} className="contact-form space-y-6">
                        <div className="form-group">
                            <label htmlFor="fullName" className="flex items-center gap-1.5 text-sm font-medium mb-2">
                                <FiUser className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="What should I call you?"
                                required
                                className={inputClassName}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="flex items-center gap-1.5 text-sm font-medium mb-2">
                                <FiMail className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Where can I reply?"
                                required
                                className={inputClassName}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message" className="flex items-center gap-1.5 text-sm font-medium mb-2">
                                <FiMessageSquare className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="What's on your mind?"
                                required
                                rows={6}
                                className={`${inputClassName} min-h-[160px] resize-y`}
                            />
                        </div>

                        <GooeyButton
                            type="submit"
                            disabled={isSubmitting}
                            className="contact-submit-btn w-full py-4 px-6 rounded-lg font-medium bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                'Sending...'
                            ) : (
                                <>
                                    Send
                                    <span aria-hidden="true">→</span>
                                </>
                            )}
                        </GooeyButton>

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
            </div>
        </section>
    );
};

export default ContactSection;
