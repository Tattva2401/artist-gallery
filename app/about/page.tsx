import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  // =====================================================================
  // EDITABLE CONTENT: JUST REPLACE THE TEXT INSIDE THE QUOTES BELOW
  // =====================================================================
  
  const headline = "Meet the Artist";
  
  const paragraph1 = "This is where your mom's primary bio will go. She can talk about where she grew up, how she discovered her passion for painting, and what drives her creative vision. Just delete this text and paste her words here.";
  
  const paragraph2 = "Use this space to talk about her specific style or medium. Does she prefer oil, acrylic, or mixed media? What themes does she explore in her artwork? This is a great place to connect emotionally with potential collectors.";
  
  const quote = '"Art is not just about what you see, but what you make others feel." - (Placeholder Quote)';
  
  const studioText = "Here you can describe the studio environment, the process of creating a commission, or the dedication to museum-quality prints. It gives buyers confidence in the professional quality of the work.";

  // =====================================================================

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 pb-32">
      {/* Header Section */}
      <header className="pt-24 pb-16 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-serif tracking-tight mb-6 text-zinc-900">
          {headline}
        </h1>
        <div className="w-16 h-px bg-zinc-300 mx-auto"></div>
      </header>

      {/* Main Content Grid */}
      <section className="px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
        
        {/* Left Side: Main Portrait/Image */}
        <div className="relative aspect-[3/4] w-full shadow-lg rounded-sm overflow-hidden bg-zinc-200">
          <Image 
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop" 
            alt="The Artist in Studio" 
            fill 
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side: Bio Text */}
        <div className="flex flex-col space-y-6">
          <p className="text-lg text-zinc-600 leading-relaxed font-light">
            {paragraph1}
          </p>
          <p className="text-lg text-zinc-600 leading-relaxed font-light">
            {paragraph2}
          </p>
          
          <div className="pt-8 pb-4 border-l-2 border-zinc-900 pl-6 my-8">
            <p className="text-2xl font-serif text-zinc-800 italic">
              {quote}
            </p>
          </div>
        </div>
      </section>

      {/* Secondary Section: The Studio/Process */}
      <section className="px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center flex-col-reverse md:flex-row-reverse">
        
        {/* Right Side (Visual): Studio Details */}
        <div className="flex flex-col space-y-6 md:order-1">
          <h2 className="text-3xl font-serif text-zinc-900 tracking-tight">
            The Studio Process
          </h2>
          <p className="text-lg text-zinc-600 leading-relaxed font-light">
            {studioText}
          </p>
          <div className="pt-4">
            <Link 
              href="/commissions" 
              className="inline-block text-sm font-semibold uppercase tracking-widest text-zinc-900 border-b border-zinc-900 pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-colors"
            >
              Request a Commission →
            </Link>
          </div>
        </div>

        {/* Left Side (Visual): Secondary Image */}
        <div className="relative aspect-square w-full shadow-md rounded-sm overflow-hidden bg-zinc-200 md:order-2">
          <Image 
            src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1000&auto=format&fit=crop" 
            alt="Artistic Process" 
            fill 
            className="object-cover"
          />
        </div>
        
      </section>
    </main>
  );
}