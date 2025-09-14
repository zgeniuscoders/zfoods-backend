import vine from '@vinejs/vine'

export const addCategoryValidator = vine.compile(
  vine.object({
    name: vine.string(),
    photo: vine.file({
      extnames: ['jpg', 'png', 'jpeg','webp'],
      size: '10mb',
    }),
  })
)

export const updateCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    photo: vine
      .file({
        extnames: ['jpg', 'png', 'jpeg'],
        size: '10mb',
      })
      .optional(),
  })
)
