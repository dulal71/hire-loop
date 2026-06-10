import { redirect } from 'next/navigation'
import Link from 'next/link'
import { stripe } from '@/lib/stripe'


export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const status = session?.status
  const customerEmail = session?.customer_details?.email

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <section className="min-h-screen  flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
          
          {/* Success Checkmark Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <svg 
              className="h-10 w-10 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Thank you!
          </h1>
          <p className="text-gray-500 font-medium mb-6">
            Your payment was processed successfully.
          </p>

          <hr className="border-gray-100 my-6" />

          {/* Details */}
          <div className="text-sm text-gray-600 space-y-4 mb-8 text-left bg-gray-50 p-4 rounded-xl">
            <p>
              We appreciate your business! A confirmation email has been sent to:{' '}
              <span className="font-semibold text-gray-900 break-all">{customerEmail || 'your email'}</span>.
            </p>
            <p className="text-xs text-gray-400">
              Have questions? Reach out to us at{' '}
              <a 
                href="mailto:orders@example.com" 
                className="text-indigo-600 hover:underline font-medium"
              >
                orders@example.com
              </a>
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 shadow-sm"
            >
              Continue Shopping
            </Link>
          </div>
          
        </div>
      </section>
    )
  }

  // Fallback for unexpected statuses
  return redirect('/')
}