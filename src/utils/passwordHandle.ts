import crypto from 'node:crypto'

const sha256Password = (password: string) => {
  const hash = crypto.createHash('sha256')
  const result = hash.update(password).digest('hex')

  return result
}

export { sha256Password }
