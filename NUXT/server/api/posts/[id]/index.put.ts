// GET: http://localhost:3000/api/posts/:id
import { PrismaClient }  from "@prisma/client"

// Create a new instance of Prisma Client
const prisma = new PrismaClient()

// Type for Posts
type TPost = {
    title: string
    content: string
    published: boolean
}

export default defineEventHandler(async(event) => {

    // Get id from path parameter
    const id = getRouterParam(event, 'id')

    // Get the request body
    const body = await readBody<TPost>(event)

    if(!id){
        throw createError(
            {
                statusCode: 400,
                message: 'Invalid id'
            }
        )
    } else {
        // Update the post
        const post = await prisma.post.update({
            where: {
                id: parseInt(id) // แปลง id จาก string เป็น number
            },
            data: {
                title: body.title,
                content: body.content,
                published: body.published
            }
        })

        if(!post){
            throw createError(
                {
                    statusCode: 404,
                    message: 'Post not found'
                }
            )
        }
        
        return post
    }

})