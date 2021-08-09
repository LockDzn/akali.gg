import jwt from 'jsonwebtoken'

const jwtPrivateKey = process.env.JWT_PRIVATE_KEY || 'topsecret'

interface DecodedTokenProps {
  name: string
  _id: string
  iat: number
  exp: number
}

export function signToken(object: object) {
  const token = jwt.sign(object, jwtPrivateKey, { expiresIn: '24h' })
  return token
}

export function verifyToken(token: string): DecodedTokenProps {
  const decoded = jwt.verify(token, jwtPrivateKey) as DecodedTokenProps
  return decoded
}
