"use client";

import { useState } from 'react';

// Define the shape of our data
type Variant = { id: string; size: string; price: number };

export default function CheckoutClient({ variants }: { variants: Variant[] }) {
  // Set the first available size as the default selection
  const [selectedVariant, setSelectedVariant] = useState<Variant>(variants[0]);
  
  // State for the strict legal requirements
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedNoCopy, setAgreedNoCopy] = useState(false);

  const handleCheckout = () => {
     if (!agreedTerms || !agreedNoCopy) return;
     // This is where Stripe will hook in later
     alert(`Proceeding to secure checkout for ${selectedVariant.size} canvas at $${selectedVariant.price}`);
  };

  return (
    <div className="border-t border-stone-200 pt-8">
       {/* Variant Selection */}
       <div className="mb-8">
         <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-4">
           Select Canvas Size
         </h3>
         <div className="grid grid-cols-3 gap-3">
           {variants.map((v) => (
             <button
               key={v.id}
               onClick={() => setSelectedVariant(v)}
               className={`py-3 px-4 text-sm border rounded-sm transition-all duration-300 ${
                 selectedVariant.id === v.id
                   ? 'border-stone-800 bg-stone-800 text-stone-50 shadow-md'
                   : 'border-stone-300 text-stone-600 hover:border-stone-400 hover:bg-stone-100'
               }`}
             >
               {v.size}
             </button>
           ))}
         </div>
       </div>

       {/* Dynamic Price Display */}
       <div className="mb-8 flex items-baseline">
         <span className="text-4xl font-light text-stone-900 tracking-tight">
           ${selectedVariant.price.toFixed(2)}
         </span>
         <span className="text-sm text-stone-500 ml-2 uppercase tracking-widest">USD</span>
       </div>

       {/* Legal Compliance Snapshots */}
       <div className="space-y-4 mb-8 bg-stone-100/50 p-5 rounded-sm border border-stone-200">
         <h4 className="text-xs font-bold uppercase tracking-wide text-stone-700 mb-3">
           Required Agreements
         </h4>
         <label className="flex items-start space-x-3 cursor-pointer group">
           <input 
             type="checkbox" 
             checked={agreedTerms} 
             onChange={(e) => setAgreedTerms(e.target.checked)} 
             className="mt-1 accent-stone-800 w-4 h-4" 
           />
           <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
             I agree to the purchase terms and acknowledge this is a print-on-demand item.
           </span>
         </label>
         <label className="flex items-start space-x-3 cursor-pointer group">
           <input 
             type="checkbox" 
             checked={agreedNoCopy} 
             onChange={(e) => setAgreedNoCopy(e.target.checked)} 
             className="mt-1 accent-stone-800 w-4 h-4" 
           />
           <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
             I legally agree to not duplicate, reproduce, or resell this artwork in any form.
           </span>
         </label>
       </div>

       {/* Checkout Action */}
       <button
         onClick={handleCheckout}
         disabled={!agreedTerms || !agreedNoCopy}
         className="w-full bg-stone-900 text-stone-50 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
       >
         Proceed to Checkout
       </button>
    </div>
  )
}