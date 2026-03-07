import { useLanguage } from '@/hooks/LanguageContext.tsx';
import { Card } from '@/components/ui/card.tsx';
import { Badge } from '@/components/ui/badge.tsx';

export const Skills = () => {
  const { t } = useLanguage();

  const categories = ['frontend', 'backend', 'tools', 'other'];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('skills.title')}</h2>
          <p className="text-xl text-muted-foreground">{t('skills.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {categories.map((category, index) => (
            <Card
              key={category}
              className="p-6 hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                {t(`skills.categories.${category}`)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(t(`skills.items.${category}`)) 
                  ? t(`skills.items.${category}`) as string[]
                  : []
                ).map((skill, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="text-sm px-3 py-1"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
