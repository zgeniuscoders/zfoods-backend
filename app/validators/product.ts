import vine from '@vinejs/vine'

export const addProductValidator = vine.compile(
  vine.object({
    name: vine.string().escape(),
    description: vine.string().escape().minLength(10).maxLength(255),
    price: vine.number(),
    categoryId: vine.number().exists({ table: 'categories', column: 'id' }),
    companyId: vine.number().exists({ table: 'companies', column: 'id' }),
    photo: vine.file({
      extnames: ['jpg', 'png', 'jpeg', 'webp'],
      size: '10mb',
    }),
  })
)

export const updateProductValidator = vine.compile(
  vine.object({
    name: vine.string().escape().optional(),
    description: vine.string().escape().minLength(10).maxLength(255).optional(),
    price: vine.number().optional(),
    categoryId: vine.number().exists({ table: 'categories', column: 'id' }).optional(),
    companyId: vine.number().exists({ table: 'companies', column: 'id' }).optional(),
    photo: vine
      .file({
        extnames: ['jpg', 'png', 'jpeg'],
        size: '10mb',
      })
      .optional(),
  })
)
