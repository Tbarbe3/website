import { useLanguage } from '@/hooks/LanguageContext.tsx';
import { Card } from '@/components/ui/card.tsx';
import { Briefcase, CheckCircle2 } from 'lucide-react';

export const School = () => {
  const { t } = useLanguage();

  const schools = Array.isArray(t('school.items')) 
    ? t('school.items') as any[]
    : [];

  return (
    <section id="school" className="py-8 px-4 bg-landscapes">
      <div className="container mx-auto">
        <div className="text-center mb-8 ">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">{t('school.title')}</h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {schools.map((exp, index) => (
            <Card
              key={index}
              className="p-6 hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{exp.position}</h3>
                    <p className="text-primary font-semibold">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.period}</p>
                  </div>

                  <p className="text-muted-foreground">{exp.description}</p>

                  <ul className="space-y-2">
                    {exp.achievements.map((achievement: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
