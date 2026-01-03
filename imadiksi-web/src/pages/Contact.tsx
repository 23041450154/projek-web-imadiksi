import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

const contactSchema = z.object({
    name: z.string().min(2, { message: "Nama minimal 2 karakter" }),
    email: z.string().email({ message: "Email tidak valid" }),
    subject: z.string().min(5, { message: "Subjek minimal 5 karakter" }),
    message: z.string().min(10, { message: "Pesan minimal 10 karakter" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(data);
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 max-w-4xl">
                <SectionHeading title="Hubungi Kami" subtitle="Punya pertanyaan atau ingin berkolaborasi? Kami siap mendengar." />

                <div className="grid md:grid-cols-2 gap-12 mt-12 bg-white dark:bg-gray-950 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                    {/* Info Side */}
                    <div className="p-8 bg-primary-700 text-white flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Informasi Kontak</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 shrink-0 text-primary-200" />
                                    <div>
                                        <h4 className="font-semibold text-primary-100">Alamat</h4>
                                        <p className="text-white/80 text-sm">Gedung Student Center Lt. 2, Universitas Islam Negeri, Indonesia.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Mail className="w-6 h-6 shrink-0 text-primary-200" />
                                    <div>
                                        <h4 className="font-semibold text-primary-100">Email</h4>
                                        <p className="text-white/80 text-sm">info@imadiksi.org</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Phone className="w-6 h-6 shrink-0 text-primary-200" />
                                    <div>
                                        <h4 className="font-semibold text-primary-100">Telepon</h4>
                                        <p className="text-white/80 text-sm">+62 812-3456-7890</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <p className="text-white/60 text-sm">
                                &copy; {new Date().getFullYear()} IMADIKSI Support Center
                            </p>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="p-8">
                        {isSubmitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                    <Send className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pesan Terkirim!</h3>
                                <p className="text-gray-600 dark:text-gray-400">Terima kasih telah menghubungi kami. Kami akan segera membalas pesan Anda.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap</label>
                                    <Input id="name" placeholder="John Doe" {...register("name")} className={errors.name ? "border-red-500" : ""} />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                    <Input id="email" type="email" placeholder="john@example.com" {...register("email")} className={errors.email ? "border-red-500" : ""} />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subjek</label>
                                    <Input id="subject" placeholder="Tujuan menghubungi..." {...register("subject")} className={errors.subject ? "border-red-500" : ""} />
                                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pesan</label>
                                    <Textarea id="message" rows={5} placeholder="Isi pesan Anda di sini..." {...register("message")} className={errors.message ? "border-red-500" : ""} />
                                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                                </div>

                                <Button type="submit" disabled={isSubmitting} className="w-full">
                                    {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
