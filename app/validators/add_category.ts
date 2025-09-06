import vine from '@vinejs/vine'

export const addCategoryValidator = vine.compile(
  vine.object({
    name: vine.string(),
    photo: vine.string(),
  })
)

export const updateCategoryValidator = vine.compile(
  vine.object({
    name: vine.string(),
    photo: vine.string(),
  })
)
