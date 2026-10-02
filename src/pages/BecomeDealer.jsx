import PageBanner from '../components/PageBanner';
import DealerRegistration from '../components/DealerRegistration';

export default function BecomeDealer() {
  return (
    <main>
      <PageBanner
        title="Register as a Dealer"
        description="Get access to live inventory, grade sheets, and bulk pricing. We usually respond within one business day."
      />
      <DealerRegistration />
    </main>
  );
}