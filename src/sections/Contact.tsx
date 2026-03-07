import { useLanguage } from '@/hooks/LanguageContext.tsx';
import { Card } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Label } from '@/components/ui/label.tsx';
import {Mail, MapPin, Phone, Github, Linkedin, Instagram} from 'lucide-react';
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast.ts";

export const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: "fa213c4d-2d88-4a51-8a6f-aa1b67175efc",
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        toast({
          title: t('contact.form.success'),
          duration: 3000,
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast({
          title: result.message || t('contact.form.error'),
          variant: 'destructive',
          duration: 5000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-20 px-0 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('contact.title')}</h2>
          <p className="text-xl text-muted-foreground">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="p-6 hover-lift animate-slide-in-left">
              <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{t('contact.info.email')}</h3>
                  <a
                    href="mailto:thomas.barbe.3@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    thomas.barbe.3@gmail.com
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover-lift animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{t('contact.info.phone')}</h3>
                  <a
                    href="tel:+33637233268"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +33 6 37 23 32 68
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover-lift animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{t('contact.info.location')}</h3>
                  <p className="text-muted-foreground">Nancy, Meurthe-et-Moselle, France</p>
                </div>
              </div>
            </Card>

            {/* Social Media */}
            <Card className="p-6 animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
              <h3 className="font-semibold text-lg mb-4">{t('contact.info.socials')}</h3>
              <div className="flex gap-4">
                <Button size="icon" variant="outline" asChild>
                  <a href="https://github.com/Tbarbe3" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button size="icon" variant="outline" asChild>
                  <a href="https://www.linkedin.com/in/thomas-barb%C3%A9-862b89304/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button size="icon" variant="outline" asChild>
                  <a href="https://www.instagram.com/thomas.brb.3/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-6 animate-slide-in-right">
              <h2 className="font-bold text-xl mb-3">{t('hero.contact')}</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                      <Label htmlFor="name">{t('contact.form.name')}</Label>
                      <Input
                          id="from_name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={t('contact.form.namePlaceholder')}
                          required
                      />
                  </div>

                  <div>
                      <Label htmlFor="email">{t('contact.form.email')}</Label>
                      <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t('contact.form.emailPlaceholder')}
                          required
                      />
                  </div>

                  <div>
                      <Label htmlFor="subject">{t('contact.form.subject')}</Label>
                      <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder={t('contact.form.subjectPlaceholder')}
                          required
                      />
                  </div>

                  <div>
                      <Label htmlFor="message">{t('contact.form.message')}</Label>
                      <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={t('contact.form.messagePlaceholder')}
                          rows={5}
                          required
                      />
                  </div>

                  <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-primary-dark hover:opacity-90"
                      disabled={isSubmitting}
                  >
                      {isSubmitting ? (t('contact.form.sending') || 'Envoi en cours...') : t('contact.form.send')}
                  </Button>
              </form>
          </Card>
        </div>
      </div>
    </section>
  );
};
