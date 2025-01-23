// GET: http://localhost:3000/api/posts?title=fisrt
import { PrismaClient }  from "@prisma/client"

// Create a new instance of Prisma Client
const prisma = new PrismaClient()

export default defineEventHandler(async(event) => {

    // รับ title จาก query string
    const query = getQuery(event)
    const title = query.title as string

    // ค้นหา posts ที่มี title ตรงกับที่รับมาจาก query string
    // SELECT id, title, content, published FROM post ORDER BY id DESC
    const posts = await prisma.post.findMany({
        where: {
            title: {
                contains: title, // ใช้ "contains" เพื่อค้นหาที่มีคำใน title,
                // mode: "insensitive" // ไม่สนใจตัวเล็กตัวใหญ่
            }
        },
        select: {
            id: true,
            title: true,
            content: true,
            published: true
        },
        orderBy: {
            id: "desc" // เรียงลำดับจากมากไปน้อย
        }
    })

    return posts
})