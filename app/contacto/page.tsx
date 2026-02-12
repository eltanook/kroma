"use client"

import { Navbar } from "@/components/kroma/navbar"
import { Footer } from "@/components/kroma/footer"
import { CustomCursor } from "@/components/kroma/custom-cursor"
import { useState } from "react"
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react"

export default function ContactoPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // FormSubmit.co will handle the form submission
    }

    return (
        <main>
            <CustomCursor />
            <Navbar />

            <div className="min-h-screen pt-24 pb-20">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Header */}
                    <div className="mb-16 text-center">
                        <h1 className="font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                            Hablemos de{" "}
                            <span className="chrome-text">Salud</span>
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            ¿Preguntas sobre productos, materiales o ciencia? Estamos aquí.
                        </p>
                    </div>

                    {/* Content Grid */}
                    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                        {/* Form - 8 columns */}
                        <div className="lg:col-span-8">
                            <form
                                action="https://formsubmit.co/hola@kroma.com"
                                method="POST"
                                onSubmit={handleSubmit}
                                className="glass-card rounded-2xl p-8 space-y-6"
                            >
                                {/* FormSubmit.co configuration */}
                                <input type="hidden" name="_subject" value="Nuevo mensaje desde KROMA" />
                                <input type="hidden" name="_captcha" value="false" />
                                <input type="hidden" name="_template" value="table" />

                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-foreground">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                        placeholder="Tu nombre completo"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-foreground">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                        placeholder="tu@email.com"
                                    />
                                </div>

                                {/* Subject */}
                                <div>
                                    <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-foreground">
                                        Asunto
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="_subject"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                        placeholder="¿De qué quieres hablar?"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="mb-2 block text-sm font-semibold text-foreground">
                                        Mensaje
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 resize-none"
                                        placeholder="Cuéntanos más..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="chrome-button w-full rounded-full px-8 py-4 text-sm font-bold tracking-wide transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <Send className="h-4 w-4" />
                                    Enviar Mensaje
                                </button>
                            </form>
                        </div>

                        {/* Contact Info - 4 columns */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Email */}
                            <div className="glass-card rounded-xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20">
                                        <Mail className="h-6 w-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Email</h3>
                                        <a
                                            href="mailto:hola@kroma.com"
                                            className="text-sm text-muted-foreground hover:text-orange-500 transition-colors"
                                        >
                                            hola@kroma.com
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="glass-card rounded-xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20">
                                        <Phone className="h-6 w-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Teléfono</h3>
                                        <a
                                            href="tel:+5491112345678"
                                            className="text-sm text-muted-foreground hover:text-orange-500 transition-colors"
                                        >
                                            +54 9 11 1234-5678
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="glass-card rounded-xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20">
                                        <MapPin className="h-6 w-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Ubicación</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Buenos Aires
                                            <br />
                                            Argentina
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Response Time */}
                            <div className="glass-card rounded-xl p-6 bg-orange-500/5">
                                <p className="text-xs text-muted-foreground">
                                    <span className="font-semibold text-foreground">Tiempo de respuesta:</span> Generalmente
                                    respondemos en menos de 24 horas durante días hábiles.
                                </p>
                            </div>

                            {/* WhatsApp Preference */}
                            <a
                                href="https://wa.me/5491112345678"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-card-hover rounded-xl p-6 block transition-all hover:scale-[1.02] bg-blue-500/5"
                            >
                                <div>
                                    <h3 className="font-semibold text-foreground mb-1">¿Prefieres por WhatsApp?</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Contáctanos directamente y te responderemos al instante.
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Google Maps Iframe */}
                    <div className="mt-16">
                        <div className="aspect-[21/9] w-full overflow-hidden rounded-2xl">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52562.20381653276!2d-58.45574852545649!3d-34.61566943740062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e87!2sBuenos%20Aires%2C%20CABA%2C%20Argentina!5e0!3m2!1ses!2s!4v1234567890123!5m2!1ses!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
