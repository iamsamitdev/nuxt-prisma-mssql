// POST: http://localhost:3000/api/posts
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

// Type for User
type TUser = {
    name: string
    email: string
    posts: TPost[]
}

// Type for Posts
type TPost = {
    title: string
    content: string
    published: boolean
    author: TUser
}

// Create a new instance of Prisma Client
const prisma = new PrismaClient()

// Zod Schema
const PostSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    content: z.string().min(1, "Content is required").max(5000),
    published: z.boolean(),
    author: z.object({
      name: z.string().min(1, "Author name is required"),
      email: z.string().email("Invalid email format")
    })
})

export default defineEventHandler(async(event) => {

    try {
        // Get the request body
        const body = await readBody<TPost>(event)

        // Validate with Zod
        const validatedData = PostSchema.parse(body)

        // Create a new post
        const post = await prisma.post.create({
            data: {
                title: validatedData.title,
                content: validatedData.content,
                published: validatedData.published,
                author: {
                    connectOrCreate: {
                        where: {
                            email: validatedData.author!.email
                        },
                        create: {
                            name: validatedData.author!.name,
                            email: validatedData.author!.email
                        }
                    }
                }
            }
        })

        return {
            status: 200,
            body: post
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                status: 400,
                body: {
                    errors: error.errors
                }
            }
        }
        return {
            status: 500,
            body: {
                error: 'Internal server error'
            }
        }
    }
    
})

