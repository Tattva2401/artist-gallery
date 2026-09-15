import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 pb-32">

      {/* Header Section */}
      <header className="pt-24 pb-16 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-serif tracking-tight mb-4 text-zinc-900">
          Kavita Brijesh Rajput
        </h1>
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 font-medium mb-8">
          Artist | Creative Explorer | Mentor
        </p>
        <div className="w-16 h-px bg-zinc-300 mx-auto"></div>
      </header>

      {/* Main Content Grid: Biography */}
      <section className="px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-24">

        {/* Left Side: Main Portrait/Image */}
        <div className="relative aspect-[3/4] w-full shadow-lg rounded-sm overflow-hidden bg-zinc-200 sticky top-24">
          <Image
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop"
            alt="Kavita Brijesh Rajput in her Studio"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side: Bio Text */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-3xl font-serif text-zinc-900 tracking-tight mb-2">Artist Biography</h2>

          <div className="space-y-5 text-lg text-zinc-600 leading-relaxed font-light">
            <p>
              Based in Vadodara, Gujarat, Kavita Brijesh Rajput is a self-taught contemporary artist whose creative journey has evolved from a lifelong passion for colour, ideas, and artistic expression into a full-time artistic practice.
            </p>
            <p>
              At 47, Kavita brings to her work a rich blend of experiences shaped by the different places and cultures that have been part of her life. Born into a Malayali family, brought up in Madhya Pradesh, and now rooted in Gujarat, her artistic perspective carries an appreciation for diversity, tradition, and the changing landscapes of human experience.
            </p>
            <p>
              A teacher turned full-time artist, Kavita has gradually transformed her love for painting into a dedicated creative pursuit. Her journey is driven not by formal artistic training, but by an innate curiosity and an enduring desire to learn, experiment, and discover. Her self-taught background has given her the freedom to develop an artistic vocabulary that is distinctly her own.
            </p>
            <p>
              A defining characteristic of Kavita's art is her vibrant use of colour. Her palettes are energetic, expressive, and often emotionally charged, creating an immediate visual impact while inviting the viewer to look deeper. Beneath the richness of colour and composition lies a thoughtful intent—her artworks often carry a message, an emotion, or a reflection on life and human experiences. Rather than simply creating aesthetically pleasing images, Kavita seeks to communicate, evoke, and connect.
            </p>
            <p>
              As a self-taught artist, she has developed her artistic vocabulary through continuous practice, experimentation, and personal exploration. Her journey reflects an artist who is not confined by conventional boundaries, but instead allows intuition and imagination to guide the creative process. Each canvas becomes an opportunity to explore new ideas, moods, textures, and perspectives.
            </p>
            <p>
              Kavita's work reflects a balance between visual beauty and meaningful expression. Her art is vibrant yet contemplative, spontaneous yet purposeful. She believes that art can speak without words, and through her paintings she strives to create a dialogue between the artwork and the viewer.
            </p>
          </div>
        </div>
      </section>

      {/* Artist Statement Section (Full Width Blockquote) */}
      <section className="px-6 max-w-4xl mx-auto mb-24">
        <div className="bg-white p-8 md:p-12 shadow-sm border border-zinc-100 rounded-sm">
          <h2 className="text-2xl font-serif text-zinc-900 tracking-tight mb-6">Artist Statement</h2>
          <div className="border-l-2 border-zinc-900 pl-6 space-y-6 text-xl text-zinc-800 italic font-serif leading-relaxed">
            <p>
              "For me, painting is a language without boundaries. Colour, texture, form, and imagination allow me to express thoughts and emotions that words often cannot capture.
            </p>
            <p>
              I am constantly inspired by the world around me—the people I meet, experiences I encounter, emotions I observe, and ideas that emerge within me. I enjoy experimenting with these ideas and allowing them to evolve organically on the canvas.
            </p>
            <p>
              Vibrant colour is an important part of my visual expression. I use it not only to create beauty and energy, but also to convey emotion and meaning. Every artwork I create begins with an intention, and I hope that each painting leaves the viewer with a thought, a feeling, or a question of their own.
            </p>
            <p>
              Being a self-taught artist has made experimentation an essential part of my journey. I do not see the canvas as a space governed by limitations; I see it as a space of possibilities. Each new work is an opportunity to explore, learn, take risks, and discover something unexpected."
            </p>
          </div>
        </div>
      </section>

      {/* Secondary Section: Philosophy & Background */}
      <section className="px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start flex-col-reverse md:flex-row-reverse mb-24">

        {/* Right Side (Text) */}
        <div className="flex flex-col space-y-10 md:order-1">

          {/* Artistic Philosophy */}
          <div>
            <h2 className="text-2xl font-serif text-zinc-900 tracking-tight mb-4">
              Artistic Philosophy
            </h2>
            <div className="space-y-4 text-lg text-zinc-600 leading-relaxed font-light">
              <p>
                Kavita believes that art should communicate, evoke, and connect. For her, a painting is more than an arrangement of colours and forms—it is a visual narrative that can hold an emotion, an idea, a memory, or a perspective.
              </p>
              <p>
                Her creative philosophy is grounded in freedom, experimentation, and authenticity. She embraces the unexpected and allows the creative process to guide her, rather than restricting herself to a predetermined style or formula.
              </p>
              <p>
                Colour is central to her artistic vocabulary. Her vibrant palettes create energy and movement, while textures and mixed-media elements add depth and dimension. Through this interplay of colour, material, and thought, Kavita creates works that are visually engaging while retaining a deeper sense of purpose.
              </p>
              <p>
                She believes that every artist has a story to tell and every artwork has a story waiting to be discovered. Her aim is not to dictate what the viewer should see, but to create a space where each person can find their own meaning.
              </p>
            </div>
          </div>

          {/* From Teaching to Art */}
          <div>
            <h2 className="text-2xl font-serif text-zinc-900 tracking-tight mb-4">
              From Teaching to Art
            </h2>
            <div className="space-y-4 text-lg text-zinc-600 leading-relaxed font-light">
              <p>
                Before dedicating herself fully to art, Kavita was a teacher—a profession that continues to influence her approach to creativity and learning. Her transition from teaching to becoming a full-time artist represents a deeply personal decision to follow a long-held creative calling.
              </p>
              <p>
                Today, she also conducts art workshops, sharing her knowledge, enthusiasm, and creative approach with others. Through these workshops, she encourages participants to explore their own imagination, experiment without fear, and discover the joy of creating.
              </p>
              <p>
                For Kavita, teaching and art remain naturally connected: both are journeys of exploration, discovery, and growth.
              </p>
            </div>
          </div>
        </div>

        {/* Left Side: Secondary Image */}
        <div className="relative aspect-square w-full shadow-md rounded-sm overflow-hidden bg-zinc-200 md:order-2 sticky top-24">
          <Image
            src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1000&auto=format&fit=crop"
            alt="Artistic Process"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

      </section>

      {/* Bottom Section: Family & The Future */}
      <section className="px-6 max-w-4xl mx-auto border-t border-zinc-200 pt-16">
        <div className="grid md:grid-cols-2 gap-12">

          <div>
            <h2 className="text-2xl font-serif text-zinc-900 tracking-tight mb-4">
              A Journey Supported by Family
            </h2>
            <div className="space-y-4 text-lg text-zinc-600 leading-relaxed font-light">
              <p>
                Behind every creative journey is often a circle of encouragement, and Kavita's artistic path has been strengthened by the unwavering support of her husband, Brijesh Rajput. His encouragement and belief in her artistic potential have inspired her to pursue her passion wholeheartedly and embrace art as a full-time vocation.
              </p>
              <p>
                Her son, Tattva Rajput, has also played an important role in bringing her artistic world to a wider audience. Tattva Art Studio, the digital home of her creative practice, was created by Tattva to showcase and share Kavita's work and artistic journey.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif text-zinc-900 tracking-tight mb-4">
              The Evolving Canvas
            </h2>
            <div className="space-y-4 text-lg text-zinc-600 leading-relaxed font-light">
              <p>
                Kavita Brijesh Rajput continues to evolve as an artist—exploring new ideas, experimenting with different mediums, and allowing her creative instincts to lead the way. Her work reflects not only her love for colour and painting, but also her belief that creativity has no age, no fixed boundaries, and no single definition.
              </p>
              <p>
                From the vibrant colours of her canvases to the messages embedded within them, her art is an ongoing conversation between experience, imagination, emotion, and possibility.
              </p>
              <p className="font-medium text-zinc-800">
                Her journey is still unfolding—and every new canvas is another chapter.
              </p>
            </div>
          </div>

        </div>

        <div className="mt-16 text-center">
          <Link
            href="/commissions"
            className="inline-block text-sm font-semibold uppercase tracking-widest text-zinc-900 border-b border-zinc-900 pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-colors"
          >
            Request a Commission →
          </Link>
        </div>
      </section>

    </main>
  );
}