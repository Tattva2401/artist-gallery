import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL
if (!connectionString) throw new Error("DATABASE_URL is missing in .env")

// Initialize the pg Pool, then pass it to the Prisma adapter
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// ... keep your main() function exactly as it is below this line

async function main() {
  console.log('🌱 Starting database seed...')

  // 1. Wipe existing data to ensure a clean slate
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.printVariant.deleteMany()
  await prisma.artwork.deleteMany()

  // 2. Create Placeholder Artworks
  const artworks = [
    {
      title: 'Midnight Serenade',
      description: 'A striking blend of deep blues and vibrant gold, representing the quiet energy of a city at night. Hand-painted acrylic on textured canvas.',
      imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop',
    },
    {
      title: 'Ethereal Bloom',
      description: 'Soft, sweeping brushstrokes capture the delicate transition of spring. Perfect for bringing warmth and light into a minimalist space.',
      imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c026109?q=80&w=1000&auto=format&fit=crop',
    },
    {
      title: 'Crimson Horizon',
      description: 'Bold, abstract geometry meeting fluid organic shapes. This piece demands attention and serves as a powerful focal point for any studio.',
      imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1000&auto=format&fit=crop',
    }
  ]

  // 3. Inject into Database with Print Variants
  for (const art of artworks) {
    const createdArt = await prisma.artwork.create({
      data: {
        title: art.title,
        description: art.description,
        imageUrl: art.imageUrl,
        variants: {
          create: [
            { size: '8x10', price: 45.00 },
            { size: '16x20', price: 85.00 },
            { size: '24x36', price: 150.00 },
          ]
        }
      }
    })
    console.log(`✅ Created: ${createdArt.title}`)
  }

  console.log('🎉 Seeding complete! Your gallery is ready.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })