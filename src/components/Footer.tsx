import {useLanguage} from '@/hooks/LanguageContext.tsx';

export const Footer = () => {
    const {t} = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 px-4 border-t border-border bg-base text-foreground">
            <div className="container mx-auto text-center">
                <p className="flex items-center justify-center gap-2">
                    {t('footer.policy')}.
                </p>
                <p className="flex items-center justify-center gap-2">
                    © {currentYear} Thomas BARBE. {t('footer.rights')}.
                </p>
            </div>
        </footer>
    );
};
