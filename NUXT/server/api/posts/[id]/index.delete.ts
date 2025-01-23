// GET: http://localhost:3000/api/posts/:id
import { PrismaClient }  from "@prisma/client"

// Create a new instance of Prisma Client
const prisma = new PrismaClient()

export default defineEventHandler(async(event) => {

    // Get id from path parameter
    const id = getRouterParam(event, 'id')

    if(!id){
        throw createError(
            {
                statusCode: 400,
                message: 'Invalid id'
            }
        )
    } else {
        // DELETE FROM post WHERE id = id
        const post = await prisma.post.delete({
            where: {
                id: parseInt(id) // แปลง id จาก string เป็น number
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