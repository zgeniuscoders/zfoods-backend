import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().exists({ table: 'users', column: 'email' }),
    password: vine.string().minLength(6),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    email: vine.string().email().unique({ table: 'users', column: 'email' }),
    fullName: vine.string().escape().minLength(3),
    password: vine.string().minLength(6),
  })
)
