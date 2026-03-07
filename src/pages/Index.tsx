import {ThemeProvider} from '@/hooks/ThemeContext.tsx';
import {LanguageProvider} from '@/hooks/LanguageContext.tsx';
import {Header} from '@/components/Header';
import {Hero} from '@/sections/Hero';
import {Experience} from '@/sections/Experience';
import {Projects} from '@/sections/Projects';
import {Skills} from '@/sections/Skills';
import {Contact} from '@/sections/Contact';
import {Footer} from '@/components/Footer';
import {ScrollToTop} from '@/components/ScrollToTop';
import {School} from "@/sections/School.tsx";

const Index = () => {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <div className="min-h-screen">
                    <Header/>
                    <main>
                        <Hero/>
                        <School/>
                        <Experience/>
                        <Projects/>
                        <Skills/>
                        <Contact/>
                    </main>
                    <Footer/>
                    <ScrollToTop/>
                </div>
            </LanguageProvider>
        </ThemeProvider>
    );
};

export default Index;
