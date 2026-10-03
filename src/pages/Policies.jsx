import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import PageBanner from '../components/PageBanner';

const policies = {
  '/privacy-policy': {
    title: 'Privacy Policy',
    description: 'How OMNY X handles information shared through our website and partner services.',
    sections: [
      ['Information we collect', 'When you contact us, apply as a dealer or vendor, or use a partner service, we may collect details such as your name, business, contact information, address, and the information you submit in forms. Vendor applications may include supply, banking, and document details.'],
      ['How we use information', 'We use submitted information to respond to enquiries, review partner applications, manage accounts and requests, coordinate orders and support, and protect the operation of our services.'],
      ['Sharing and service providers', 'We may share relevant information with our authorized team and service providers who help us operate the website, communications, and business workflows. We do not publish your submitted contact or business information for general access.'],
      ['Storage and security', 'We use reasonable administrative and technical measures to protect submitted information. Online transmission and storage cannot be guaranteed to be completely secure, so please avoid sending information that is not needed for your request.'],
      ['Retention and your choices', 'We retain information for as long as it is needed for the purpose it was collected, business records, or applicable legal requirements. To request access, correction, or deletion, contact us using the details on our Contact Us page.'],
      ['Updates and contact', 'This policy may be updated as our services change. The current version will be published on this page. For privacy questions, contact OMNY X through our Contact Us page.'],
    ],
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions',
    description: 'Terms for using the OMNY X website and requesting information about our products and partner services.',
    sections: [
      ['Website information', 'Product descriptions, images, grades, prices, and stock information are provided to help you evaluate available inventory. Availability and pricing may change; confirm the final product condition, quantity, price, and terms with our team before placing an order.'],
      ['Dealer and vendor applications', 'Submitting an application does not by itself create an approved dealer or vendor relationship. Applications are reviewed by OMNY X, and access or onboarding may depend on verification and approval. Please provide accurate and current information.'],
      ['Orders and confirmation', 'An enquiry or request submitted through the website is not an order confirmation. A transaction is confirmed only after the relevant details and terms have been agreed with OMNY X through an authorized communication channel.'],
      ['Website use', 'You agree not to misuse the website, interfere with its operation, submit misleading information, or attempt to access accounts or data without authorization.'],
      ['Third-party services and changes', 'The website may link to third-party services. Their content and terms are controlled by those providers. We may update website content or these terms as our services change.'],
      ['Contact', 'For questions about these terms or a specific transaction, contact OMNY X using the details on our Contact Us page. Transaction-specific written terms take precedence where applicable.'],
    ],
  },
  '/return-policy': {
    title: 'Returns & Warranty Policy',
    description: 'Guidance for reporting product issues and requesting warranty, return, or replacement support.',
    sections: [
      ['Check the order terms', 'Return, replacement, and warranty eligibility depends on the product, invoice, and written terms agreed for that transaction. Please review those terms before purchase.'],
      ['Report an issue', 'If a product arrives damaged or develops an issue, contact our team promptly. Include your invoice or order reference, product serial number where available, a description of the issue, and clear supporting photos or video.'],
      ['Assessment and authorization', 'Our team will review the details and explain the next steps. Please do not send a product back before receiving return instructions. Inspection may be required before a return, repair, replacement, or other resolution is confirmed.'],
      ['Dealer warranty', 'Any dealer warranty applies only where it is stated for the relevant purchase and is subject to the invoice or accompanying warranty terms. The advertised 45-day dealer warranty is not a substitute for checking the terms supplied with your specific order.'],
      ['Contact support', 'For help with a return, replacement, or warranty request, use the Contact Us page and include your purchase details so our team can review the request.'],
    ],
  },
  '/shipping-policy': {
    title: 'Shipping & Dispatch Policy',
    description: 'What to expect when dispatch and delivery arrangements are confirmed for an OMNY X order.',
    sections: [
      ['Dispatch confirmation', 'Dispatch is arranged after an order and its commercial terms have been confirmed. Estimated timing depends on stock readiness, order details, destination, and carrier availability. Our team will share the applicable dispatch information.'],
      ['Tracking and delivery', 'Tracking details are shared when they are available from the carrier. Delivery estimates are indicative and may change due to carrier operations, weather, or other events outside our control.'],
      ['Delivery details', 'Please provide a complete and accurate delivery address and a reachable contact number. Let our team know promptly if delivery details need to be corrected before dispatch.'],
      ['Inspecting a shipment', 'Please check the outer packaging at delivery. If it appears damaged or a shipment is incomplete, record the issue with the carrier where possible and contact OMNY X promptly with the invoice or order reference and supporting photos.'],
      ['Shipping charges and questions', 'Any shipping charges and delivery arrangements applicable to an order will be confirmed with you before dispatch. For order-specific information, contact our team through the Contact Us page.'],
    ],
  },
};

export default function Policies() {
  const { pathname } = useLocation();
  const policy = policies[pathname];

  return <main>
    <PageBanner title={policy.title} description={policy.description} />
    <section className="bg-slate-50 px-4 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-start gap-4 border-b border-slate-200 pb-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand"><ShieldCheck size={22} /></span>
          <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">OMNY X policies</p><p className="mt-1 text-sm leading-6 text-slate-600">Please read the policy relevant to your visit, application, or order. For transaction-specific terms, refer to the written confirmation or invoice from our team.</p></div>
        </div>
        <div className="divide-y divide-slate-200">
          {policy.sections.map(([heading, body], index) => <section key={heading} className="grid gap-2 py-6 sm:grid-cols-[44px_190px_minmax(0,1fr)] sm:gap-5">
            <span className="text-xs font-bold text-brand">{String(index + 1).padStart(2, '0')}</span>
            <h2 className="text-sm font-bold text-navy-950">{heading}</h2>
            <p className="text-sm leading-6 text-slate-600">{body}</p>
          </section>)}
        </div>
        <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-dark"><ArrowLeft size={16} />Back to home</Link>
          <Link to="/contact" className="btn-primary">Contact OMNY X <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  </main>;
}