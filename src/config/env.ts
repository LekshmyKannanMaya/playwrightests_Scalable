import 'dotenv/config'

export const env = {
  BASE_URL: process.env.BASE_URL as string,
}

export const authentication = {
  PASSWORD: process.env.PASSWORD as string,
}