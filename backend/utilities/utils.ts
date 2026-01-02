import z from "zod"

export type HttpResponse = {
	status: number,
	data: object | null,
	message: string
}

export const userRequest =  z.object({
	userName: z.string().min(3).max(255),
	slogan: z.string().min(3).max(255),
	shortSummary: z.string().max(3000),
	bio: z.array(z.string().max(3000)),
	projectsDescription: z.string().max(3000)
}).partial().strict()