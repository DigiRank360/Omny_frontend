import Hero from '../components/Hero';
import AboutOmnyx from '../components/AboutOmnyx';
import Challenges from '../components/Challenges';
import WhyChoose from '../components/WhyChoose';
import Categories from '../components/Categories';
import WhoWeServe from '../components/WhoWeServe';
import QualityProcess from '../components/QualityProcess';
import Features from '../components/Features';
import FAQ from '../components/FAQ';
import DealerRegistration from '../components/DealerRegistration';
import FinalCTA from '../components/FinalCTA';

const sections = [Hero, AboutOmnyx, Challenges, WhyChoose, Categories, WhoWeServe, QualityProcess, Features, FAQ, DealerRegistration, FinalCTA];

export default function Home() {
  return (
    <main className="flex flex-col bg-white">
      {sections.map(Section => <Section key={Section.name} />)}
    </main>
  );
}
