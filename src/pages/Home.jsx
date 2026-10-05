import Hero from '../components/Hero';
import Challenges from '../components/Challenges';
import WhyChoose from '../components/WhyChoose';
import Categories from '../components/Categories';
import Features from '../components/Features';
import DealerRegistration from '../components/DealerRegistration';

const sections = [Hero, Challenges, WhyChoose, Categories, Features, DealerRegistration];

export default function Home() {
  return (
    <main className="flex flex-col bg-white">
      {sections.map(Section => <Section key={Section.name} />)}
    </main>
  );
}
